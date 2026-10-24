import { BaseEnv, IntField, validateEnv } from '@repo/decorators'

/** Environment variables: shared ones in BaseEnv. Property initializers are the defaults. */
export class Env extends BaseEnv {
  @IntField({ optional: true, min: 1, max: 65535 })
  PORT = 4001
}

export const env = validateEnv(Env)
