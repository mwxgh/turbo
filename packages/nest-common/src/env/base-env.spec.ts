import { describe, expect, it } from 'vitest'

import { AppEnv } from '@repo/utils'

import { BaseEnv, IntField, validateEnv } from '../index.js'

class AppEnvVars extends BaseEnv {
  @IntField({ optional: true, min: 1 })
  PORT = 4000
}

describe('BaseEnv', () => {
  it('applies the shared defaults to subclasses', () => {
    const env = validateEnv(AppEnvVars, {})
    expect(env).toMatchObject({
      APP_ENV: AppEnv.Dev,
      HOST: '0.0.0.0',
      PORT: 4000,
    })
    expect(env.corsOrigins).toEqual(['http://localhost:3000'])
    expect(env.REDIS_URL).toBe('redis://127.0.0.1:6379')
    expect(env.redisKeyPrefix).toBe('dev:')
  })

  it('accepts redis:// and rediss:// URLs only', () => {
    const url = 'rediss://user:pass@cache.example.com:6380/2'
    expect(validateEnv(AppEnvVars, { REDIS_URL: url }).REDIS_URL).toBe(url)
    expect(() =>
      validateEnv(AppEnvVars, { REDIS_URL: 'http://cache:6379' }),
    ).toThrow(/REDIS_URL/)
  })

  it('splits CORS_ORIGINS and validates APP_ENV', () => {
    const env = validateEnv(AppEnvVars, {
      APP_ENV: 'stg',
      CORS_ORIGINS: ' https://a.example.com, ,https://b.example.com ',
    })
    expect(env.APP_ENV).toBe(AppEnv.Stg)
    expect(env.corsOrigins).toEqual([
      'https://a.example.com',
      'https://b.example.com',
    ])
    expect(() => validateEnv(AppEnvVars, { APP_ENV: 'staging' })).toThrow(
      /APP_ENV/,
    )
  })
})
