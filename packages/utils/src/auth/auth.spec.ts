import { describe, expect, it } from 'vitest'

import { AppEnv } from '../env/app-env.js'
import { authCookieNames } from './auth.js'

describe('authCookieNames', () => {
  it('keeps the plain names on prod', () => {
    expect(authCookieNames(AppEnv.Prod)).toEqual({
      access: 'access_token',
      refresh: 'refresh_token',
    })
  })

  it('prefixes every other environment', () => {
    expect(authCookieNames(AppEnv.Stg)).toEqual({
      access: 'stg_access_token',
      refresh: 'stg_refresh_token',
    })
    expect(authCookieNames(AppEnv.Dev).access).toBe('dev_access_token')
  })
})
