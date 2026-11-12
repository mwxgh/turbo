import { describe, expect, it } from 'vitest'

import { AppEnv } from './app-env.js'
import { parseUrlEnv } from './url-env.js'

const DEV_DEFAULT = 'http://localhost:3001/api'

describe('parseUrlEnv', () => {
  it('falls back to the dev default only in dev', () => {
    expect(
      parseUrlEnv('API', undefined, {
        appEnv: AppEnv.Dev,
        devDefault: DEV_DEFAULT,
      }),
    ).toBe(DEV_DEFAULT)
    expect(
      parseUrlEnv('API', '  ', { appEnv: AppEnv.Dev, devDefault: DEV_DEFAULT }),
    ).toBe(DEV_DEFAULT)
    expect(() => parseUrlEnv('API', undefined, { appEnv: AppEnv.Dev })).toThrow(
      'API is required for APP_ENV "dev"',
    )
  })

  it.each([AppEnv.Stg, AppEnv.Prod])(
    'requires the variable on %s',
    (appEnv) => {
      expect(() =>
        parseUrlEnv('API', undefined, { appEnv, devDefault: DEV_DEFAULT }),
      ).toThrow(`API is required for APP_ENV "${appEnv}"`)
    },
  )

  it('rejects relative and non-http URLs', () => {
    expect(() => parseUrlEnv('API', '/api', { appEnv: AppEnv.Dev })).toThrow(
      'API must be an absolute URL, got "/api".',
    )
    expect(() =>
      parseUrlEnv('API', 'ftp://example.com', { appEnv: AppEnv.Dev }),
    ).toThrow('API must use http or https, got "ftp:".')
  })

  it.each([
    'http://localhost:3001/api',
    'http://127.0.0.1:3001',
    'http://[::1]:3001',
  ])('rejects local host %s on prod unless allowed', (value) => {
    expect(() => parseUrlEnv('API', value, { appEnv: AppEnv.Prod })).toThrow(
      'but APP_ENV is "prod": set the deployed URL.',
    )
    expect(
      parseUrlEnv('API', value, { appEnv: AppEnv.Prod, allowLocalhost: true }),
    ).toBe(value)
  })

  it('accepts deployed URLs and drops a trailing slash', () => {
    expect(
      parseUrlEnv('API', 'https://api.example.com/api/', {
        appEnv: AppEnv.Prod,
      }),
    ).toBe('https://api.example.com/api')
    expect(
      parseUrlEnv('API', 'http://localhost:3001/api', { appEnv: AppEnv.Dev }),
    ).toBe('http://localhost:3001/api')
  })
})
