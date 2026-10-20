import { EnumField, IntField, StringField, validateEnv } from '@repo/decorators'
import { AppEnv } from '@repo/utils'

export enum NodeEnv {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

/** Environment variables. Property initializers are the defaults. */
export class Env {
  @EnumField(NodeEnv, { optional: true })
  NODE_ENV: NodeEnv = NodeEnv.Development

  /** Deployment environment: dev | stg | prod (see docs/process/environments.md). */
  @EnumField(AppEnv, { optional: true })
  APP_ENV: AppEnv = AppEnv.Dev

  @StringField({ optional: true })
  HOST = '0.0.0.0'

  @IntField({ optional: true, min: 1, max: 65535 })
  PORT = 4001

  /** Comma-separated list of allowed browser origins. */
  @StringField({ optional: true })
  CORS_ORIGINS = 'http://localhost:3000'
}

export const env = validateEnv(Env)

export const corsOrigins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
