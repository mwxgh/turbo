import { AppEnv } from '@repo/utils'

import { EnumField } from '../fields/other.js'
import { StringField, UrlField } from '../fields/string.js'
import { LogFormat, LogLevel } from '../logger/log-level.js'

/**
 * Variables every backend app reads (branch on APP_ENV, never NODE_ENV). Apps extend it with their own fields and
 * pass the subclass to `validateEnv`; property initializers are the defaults.
 */
export class BaseEnv {
  /** Deployment environment: dev | stg | prod (see docs/process/environments.md). */
  @EnumField(AppEnv, { optional: true })
  APP_ENV: AppEnv = AppEnv.Dev

  @StringField({ optional: true })
  HOST = '0.0.0.0'

  /** Shared Redis (`@repo/redis`), `redis://` or `rediss://` (TLS). */
  @UrlField({ optional: true, protocols: ['redis', 'rediss'] })
  REDIS_URL = 'redis://127.0.0.1:6379'

  @EnumField(LogLevel, { optional: true })
  LOG_LEVEL: LogLevel = LogLevel.Info

  /** `json` on servers (default), `pretty` for local development. */
  @EnumField(LogFormat, { optional: true })
  LOG_FORMAT: LogFormat = LogFormat.Json

  /** Comma-separated list of allowed browser origins. */
  @StringField({ optional: true })
  CORS_ORIGINS = 'http://localhost:3000'

  /** Redis key prefix: environments sharing one Redis never see each other's keys. */
  get redisKeyPrefix(): string {
    return `${this.APP_ENV}:`
  }

  /** `CORS_ORIGINS` as a list (for `enableCors` / gateways). */
  get corsOrigins(): string[] {
    return this.CORS_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  }
}
