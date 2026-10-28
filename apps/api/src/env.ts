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
}

export const env = validateEnv(Env)
