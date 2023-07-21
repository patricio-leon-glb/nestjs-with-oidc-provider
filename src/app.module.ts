import { ConsoleLogger, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OidcModule } from './oidc/oidc.module';
import { OAuth2ClientModule } from './oauth2-client/oauth2-client.module';

@Module({
  imports: [OidcModule, OAuth2ClientModule],
  controllers: [AppController],
  providers: [AppService, { provide: Logger, useClass: ConsoleLogger }],
})
export class AppModule {}
