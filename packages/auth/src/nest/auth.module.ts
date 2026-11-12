import { type DynamicModule, type InjectionToken, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { type RevocationStore, RevokedSessions } from '../revoked-sessions.js'
import { AccessTokens } from '../tokens.js'
import { AUTH_ACCESS_COOKIE, AuthGuard } from './auth.guard.js'

export interface AuthModuleOptions {
  /** HS256 secret shared by every app that verifies tokens (api, socket), ≥ 32 characters. */
  secret: string
  /**
   * Lifetime of tokens this app signs (only the api signs), also how long a revoked session is
   * remembered. Default 900.
   */
  accessTtlSeconds?: number
  /** Name of the access cookie in this environment: `env.authCookies.access`. */
  accessCookie: string
  /**
   * Provider of the revoked-session list, shared by every app (the Redis client: `REDIS` from
   * `@repo/redis`, same `keyPrefix` in api and socket).
   */
  revocationStore: InjectionToken
}

/**
 * `AccessTokens` and `RevokedSessions` for the whole app plus `AuthGuard` as a global guard
 * (default deny):
 *
 *   AuthModule.forRoot({
 *     secret: env.JWT_SECRET,
 *     accessTtlSeconds: env.ACCESS_TOKEN_TTL_SECONDS,
 *     accessCookie: env.authCookies.access,
 *     revocationStore: REDIS,
 *   })
 */
@Module({})
export class AuthModule {
  static forRoot({
    secret,
    accessTtlSeconds = 900,
    accessCookie,
    revocationStore,
  }: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      global: true,
      providers: [
        {
          provide: AccessTokens,
          useValue: new AccessTokens(secret, accessTtlSeconds),
        },
        { provide: AUTH_ACCESS_COOKIE, useValue: accessCookie },
        {
          provide: RevokedSessions,
          inject: [revocationStore],
          useFactory: (store: RevocationStore) =>
            new RevokedSessions(store, accessTtlSeconds),
        },
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
      exports: [AccessTokens, AUTH_ACCESS_COOKIE, RevokedSessions],
    }
  }
}
