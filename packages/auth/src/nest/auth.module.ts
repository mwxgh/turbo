import { type DynamicModule, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AccessTokens } from '../tokens.js'
import { AuthGuard } from './auth.guard.js'

export interface AuthModuleOptions {
  /** HS256 secret shared by every app that verifies tokens (api, socket), ≥ 32 characters. */
  secret: string
  /** Lifetime of tokens this app signs (only the api signs). Default 900. */
  accessTtlSeconds?: number
}

/**
 * `AccessTokens` for the whole app plus `AuthGuard` as a global guard (default deny):
 *
 *   AuthModule.forRoot({ secret: env.JWT_SECRET, accessTtlSeconds: env.ACCESS_TOKEN_TTL_SECONDS })
 */
@Module({})
export class AuthModule {
  static forRoot({
    secret,
    accessTtlSeconds = 900,
  }: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      global: true,
      providers: [
        {
          provide: AccessTokens,
          useValue: new AccessTokens(secret, accessTtlSeconds),
        },
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
      exports: [AccessTokens],
    }
  }
}
