import { Controller, Get, Logger, Req } from '@nestjs/common';

@Controller({
  path: '/client',
  version: '1',
})
export class Oauth2ClientController {
  constructor(private readonly logger: Logger) {}

  @Get('/callback')
  public async callBack(@Req() req): Promise<any> {
    const { params, query, body, headers, originalUrl } = req;
    this.logger.log({ path: originalUrl, params, query, body });
    return { callback: { params, query, body, headers, originalUrl } };
  }
}
