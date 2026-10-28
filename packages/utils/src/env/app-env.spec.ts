import { describe, expect, it } from 'vitest'

import { APP_ENVS, AppEnv, isAppEnv, parseAppEnv } from './app-env.js'

describe('AppEnv', () => {
  it('lists the three deployment environments', () => {
    expect(APP_ENVS).toEqual(['dev', 'stg', 'prod'])
  })

  it('recognises valid values only', () => {
    expect(isAppEnv('stg')).toBe(true)
    expect(isAppEnv('staging')).toBe(false)
    expect(isAppEnv(undefined)).toBe(false)
  })

  it('parses env vars with a fallback and fails fast on typos', () => {
    expect(parseAppEnv(undefined)).toBe(AppEnv.Dev)
    expect(parseAppEnv('', AppEnv.Prod)).toBe(AppEnv.Prod)
    expect(parseAppEnv('prod')).toBe(AppEnv.Prod)
    expect(() => parseAppEnv('production')).toThrow(
      'Invalid app environment "production". Expected one of: dev, stg, prod',
    )
  })
})
