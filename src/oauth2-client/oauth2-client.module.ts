import { Module } from '@nestjs/common';
import { Oauth2ClientController } from './oauth2-client.controller';
@Module({
  controllers: [Oauth2ClientController],
})
export class OAuth2ClientModule {}
