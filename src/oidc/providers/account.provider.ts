import { Injectable } from '@nestjs/common';
import { AccountList } from './account-list';

@Injectable()
export class AccountProvider {
  /**
   * @param use - can either be "id_token" or "userinfo", depending on
   *   where the specific claims are intended to be put in.
   * @param scope - the intended scope, while oidc-provider will mask
   *   claims depending on the scope automatically you might want to skip
   *   loading some claims from external resources etc. based on this detail
   *   or not return them in id tokens but only userinfo and so on.
   */
  // async claims(use, scope) {
  //   // eslint-disable-line no-unused-vars
  //   return this.findByLogin(use) ?? { id: 0 };
  //   // if (this.profile) {
  //   //   return {
  //   //     sub: this.accountId, // it is essential to always return a sub claim
  //   //     email: this.profile.email,
  //   //     email_verified: this.profile.email_verified,
  //   //     family_name: this.profile.family_name,
  //   //     given_name: this.profile.given_name,
  //   //     locale: this.profile.locale,
  //   //     name: this.profile.name,
  //   //   };
  //   // }

  //   // return {
  //   //   sub: this.accountId, // it is essential to always return a sub claim

  //   //   address: {
  //   //     country: '000',
  //   //     formatted: '000',
  //   //     locality: '000',
  //   //     postal_code: '000',
  //   //     region: '000',
  //   //     street_address: '000',
  //   //   },
  //   //   birthdate: '1987-10-16',
  //   //   email: 'johndoe@example.com',
  //   //   email_verified: false,
  //   //   family_name: 'Doe',
  //   //   gender: 'male',
  //   //   given_name: 'John',
  //   //   locale: 'en-US',
  //   //   middle_name: 'Middle',
  //   //   name: 'John Doe',
  //   //   nickname: 'Johny',
  //   //   phone_number: '+49 000 000000',
  //   //   phone_number_verified: false,
  //   //   picture: 'http://lorempixel.com/400/200/',
  //   //   preferred_username: 'johnny',
  //   //   profile: 'https://johnswebsite.com',
  //   //   updated_at: 1454704946,
  //   //   website: 'http://example.com',
  //   //   zoneinfo: 'Europe/Berlin',
  //   // };
  // }

  // static async findByFederated(provider, claims) {
  //   const id = `${provider}.${claims.sub}`;
  //   if (!logins.get(id)) {
  //     logins.set(id, new Account(id, claims));
  //   }
  //   return logins.get(id);
  // }

  public async findByLogin(login: string, password: string) {
    const account = AccountList.find(
      (account) =>
        account.profile.email === login &&
        account.profile.password === password,
    );
    return account;
  }

  public async findAccount(ctx, id, token) {
    // eslint-disable-line no-unused-vars
    // token is a reference to the token used for which a given account is being loaded,
    //   it is undefined in scenarios where account claims are returned from authorization endpoint
    // ctx is the koa request context
    return {
      accountId: id,
      async claims(use, scope) {
        return {
          sub: 'patricio',
          ...AccountList[0],
        };
      },
    };

    // const body = ctx.req.body;
    // const account = AccountList.find(
    //   (account: Account) =>
    //     account.email === body.email && account.password === body.password,
    // );

    // if (!account) {
    //   throw new Error('not found');
    // }

    // return {
    //   sub: account.id.toString(),
    //   claims: this.claims(account.id, ''),
    // };
  }
}
