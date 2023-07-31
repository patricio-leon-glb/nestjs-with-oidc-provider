import { Logger, Module } from '@nestjs/common';
import { Oauth2ClientController } from './oauth2-client.controller';
@Module({
  controllers: [Oauth2ClientController],
  providers: [Logger],
})
export class OAuth2ClientModule {}
