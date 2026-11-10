import {
  BaseEnv,
  IntField,
  StringField,
  UrlField,
  validateEnv,
} from '@repo/nest-common'

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

  /** Reverse proxies in front of the API (0 = none): client IP from X-Forwarded-For for rate limiting. */
  @IntField({ optional: true, min: 0 })
  TRUST_PROXY = 0
}

export const env = validateEnv(Env)
