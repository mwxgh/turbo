import {
  BaseEnv,
  EnumField,
  IntField,
  StringField,
  UrlField,
  validateEnv,
} from '@repo/nest-common'
import { AppEnv } from '@repo/utils'

export const AuthRegistration = { Open: 'open', Closed: 'closed' } as const
export type AuthRegistration =
  (typeof AuthRegistration)[keyof typeof AuthRegistration]

/** Environment variables: shared ones in BaseEnv. Property initializers are the defaults. */
export class Env extends BaseEnv {
  @IntField({ optional: true, min: 1, max: 65535 })
  PORT = 4000

  @UrlField({ protocols: ['postgres', 'postgresql'] })
  DATABASE_URL: string

  /**
   * S3 / MinIO servers, btp format (the "default" one is used):
   * [{"NAME":"default","CONFIG":{"ENDPOINT","PUBLIC_ENDPOINT","KEY","SECRET","REGION"}}]
   */
  @StringField()
  STORAGE_CORE_S3_SERVERS: string

  @StringField()
  STORAGE_BUCKET: string

  /** Requests per client IP and window, on every route (`@SkipThrottle()` / `@Throttle()` per route). */
  @IntField({ optional: true, min: 1 })
  RATE_LIMIT = 100

  @IntField({ optional: true, min: 1 })
  RATE_LIMIT_TTL_SECONDS = 60

  /** Max JSON / form body (`100kb`, `1mb`…); files go straight to S3, never through the API. */
  @StringField({ optional: true })
  BODY_LIMIT = '100kb'

  /** HS256 secret for access tokens, shared with the socket app (`openssl rand -base64 48`). */
  @StringField({ minLength: 32 })
  JWT_SECRET: string

  @IntField({ optional: true, min: 60 })
  ACCESS_TOKEN_TTL_SECONDS = 900

  /** Sliding: every refresh extends the session by this much. */
  @IntField({ optional: true, min: 1 })
  REFRESH_TOKEN_TTL_DAYS = 30

  /** Sign-in / register / password attempts per client IP and minute (brute-force guard). */
  @IntField({ optional: true, min: 1 })
  AUTH_RATE_LIMIT = 10

  /** `open`: anyone can POST /api/auth/register; `closed`: accounts are created by admins / seed. */
  @EnumField(AuthRegistration, { optional: true })
  AUTH_REGISTRATION: AuthRegistration = AuthRegistration.Closed

  /** Parent domain when web and api are on different subdomains (`example.com`); empty = api host. */
  @StringField({ optional: true })
  COOKIE_DOMAIN?: string

  /** Auth cookies are `Secure` (HTTPS only) everywhere but local dev. */
  get cookieSecure(): boolean {
    return this.APP_ENV !== AppEnv.Dev
  }

  /** Reverse proxies in front of the API (0 = none): client IP from X-Forwarded-For for rate limiting. */
  @IntField({ optional: true, min: 0 })
  TRUST_PROXY = 0
}

export const env = validateEnv(Env)
