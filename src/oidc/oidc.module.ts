import { Logger, Module } from '@nestjs/common';
import { OidcController } from './oidc.controller';
import { oidcProviderFactory } from './providers/oidc-provider.factory';
@Module({
  controllers: [OidcController],
  providers: [oidcProviderFactory, Logger],
  exports: [],
})
export class OidcModule {}
