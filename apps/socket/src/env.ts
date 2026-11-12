import { BaseEnv, IntField, StringField, validateEnv } from '@repo/nest-common'

/** Environment variables: shared ones in BaseEnv. Property initializers are the defaults. */
export class Env extends BaseEnv {
  @IntField({ optional: true, min: 1, max: 65535 })
  PORT = 3002

  /** Same HS256 secret as the api: verifies the access token of every connection. */
  @StringField({ minLength: 32 })
  JWT_SECRET: string
}

export const env = validateEnv(Env)
