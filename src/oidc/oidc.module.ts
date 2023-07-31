import { Logger, Module } from '@nestjs/common';
import { OidcController } from './oidc.controller';
import { oidcProviderFactory } from './providers/oidc-provider.factory';
import { AccountProvider } from './providers/account.provider';
@Module({
  controllers: [OidcController],
  providers: [oidcProviderFactory, Logger, AccountProvider],
  exports: [],
})
export class OidcModule {}
