import { Controller, Get, Req } from '@nestjs/common';

@Controller({
  path: '/client',
  version: '1',
})
export class Oauth2ClientController {
  @Get('/callback')
  public async callBack(@Req() req): Promise<any> {
    const { query } = req;
    return { query };
  }
}
