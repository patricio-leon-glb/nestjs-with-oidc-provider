import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty.js';
import * as querystring from 'node:querystring';
import { inspect } from 'node:util';
import { AccountProvider } from './providers/account.provider';
import { OIDC_INSTANCE } from './providers/oidc-provider.factory';

const DEFAULT_INTERNAL_ERROR = 'Internal Server Error';

const debug = (obj) => {
  const keys = new Set();
  querystring.stringify(
    Object.entries(obj).reduce((acc, [key, value]) => {
      keys.add(key);
      if (isEmpty(value)) return acc;
      acc[key] = inspect(value, { depth: null });
      return acc;
    }, {}),
    '<br/>',
    ': ',
    {
      encodeURIComponent(value) {
        return keys.has(value) ? `<strong>${value}</strong>` : value;
      },
    },
  );
};

@Controller({ path: '/oidc' })
export class OidcController {
  private oidcCallback: (req: Request, res: Response, ...params: any) => void;

  constructor(
    @Inject(OIDC_INSTANCE) private readonly provider: any,
    private readonly accountProvider: AccountProvider,
    private readonly logger: Logger,
  ) {
    this.oidcCallback = this.provider.callback();
  }

  // @All('/*')
  // public async All(@Req() req: Request, @Res() res: Response) {
  //   this.logger.log('All', {
  //     body: req.body,
  //     params: req.params,
  //     path: req.originalUrl,
  //   });
  //   req.url = req.originalUrl.replace('/oidc', '');
  //   return this.oidcCallback(req, res);
  // }

  @Get('/auth')
  public async auth(@Req() req, @Res() res) {
    req.url = req.originalUrl.replace('/oidc', '');

    return this.oidcCallback(req, res);
  }

  @Get('/auth/:uid')
  public async authWithUid(@Req() req, @Res() res) {
    req.url = req.originalUrl.replace('/oidc', '');

    return this.oidcCallback(req, res);
  }

  @Get('/interaction/:uid')
  public async getInteraction(@Req() req, @Res() res) {
    try {
      const { uid, prompt, params, session } =
        await this.provider.interactionDetails(req, res);

      const client = await this.provider.Client.find(params.client_id);

      switch (prompt.name) {
        case 'login': {
          return res.render('login', {
            layout: '_layout',
            client,
            uid,
            details: prompt.details,
            params,
            title: 'Sign-in',
            session: session ? debug(session) : undefined,
            dbg: {
              params: debug(params),
              prompt: debug(prompt),
            },
            error_message: undefined,
          });
        }
        case 'consent': {
          return res.render('interaction', {
            client,
            uid,
            details: prompt.details,
            params,
            title: 'Authorize',
            session: session ? debug(session) : undefined,
            dbg: {
              params: debug(params),
              prompt: debug(prompt),
            },
          });
        }
        default:
          return undefined;
      }
    } catch (err) {
      return new InternalServerErrorException(
        err.message ?? DEFAULT_INTERNAL_ERROR,
      );
    }
  }

  @Post('/interaction/:uid/login')
  public async interactionLogin(
    @Req() req,
    @Res() res,
    @Param('uid') uid: string,
  ) {
    try {
      const { login, password } = req.body;

      const account = await this.accountProvider.findByLogin(login, password);

      if (!account) {
        const { uid, prompt, params, session } =
          await this.provider.interactionDetails(req, res);

        const client = await this.provider.Client.find(params.client_id);
        return res.render('login', {
          error_message: 'User or password error',
          layout: '_layout',
          client,
          uid,
          details: prompt.details,
          params,
          title: 'Sign-in',
          session: session ? debug(session) : undefined,
          dbg: {
            params: debug(params),
            prompt: debug(prompt),
          },
        });
      }

      const {
        prompt: { name },
      } = await this.provider.interactionDetails(req, res);
      const result = {
        login: {
          accountId: account.accountId,
        },
      };
      await this.provider.interactionFinished(req, res, result, {
        mergeWithLastSubmission: false,
      });
    } catch (err) {
      return new InternalServerErrorException(
        err.message ?? DEFAULT_INTERNAL_ERROR,
      );
    }
  }

  @Post('/interaction/:uid/confirm')
  public async interactionConfirm(@Req() req, @Res() res) {
    try {
      const interactionDetails = await this.provider.interactionDetails(
        req,
        res,
      );
      const {
        prompt: { name, details },
        params,
        session: { accountId },
      } = interactionDetails;
      //assert.equal(name, 'consent');

      let { grantId } = interactionDetails;
      let grant;

      if (grantId) {
        // we'll be modifying existing grant in existing session
        grant = await this.provider.Grant.find(grantId);
      } else {
        // we're establishing a new grant
        grant = new this.provider.Grant({
          accountId,
          clientId: params.client_id,
        });
      }

      if (details.missingOIDCScope) {
        grant.addOIDCScope(details.missingOIDCScope.join(' '));
      }
      if (details.missingOIDCClaims) {
        grant.addOIDCClaims(details.missingOIDCClaims);
      }
      if (details.missingResourceScopes) {
        for (const [indicator, scopes] of Object.entries(
          details.missingResourceScopes,
        )) {
          grant.addResourceScope(
            indicator,
            (scopes as Array<string>).join(' '),
          );
        }
      }

      grantId = await grant.save();

      const consent = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent['grantId'] = grantId;
      }

      const result = { consent };
      await this.provider.interactionFinished(req, res, result, {
        mergeWithLastSubmission: true,
      });
    } catch (err) {
      return new InternalServerErrorException(
        err.message ?? DEFAULT_INTERNAL_ERROR,
      );
    }
  }

  @Get('/interaction/:uid/abort')
  public async interactionAbort(@Req() req, @Res() res) {
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await this.provider.interactionFinished(req, res, result, {
        mergeWithLastSubmission: false,
      });
    } catch (err) {
      return new InternalServerErrorException(
        err.message ?? DEFAULT_INTERNAL_ERROR,
      );
    }
  }
}
