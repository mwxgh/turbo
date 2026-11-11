import { describe, expect, it } from 'vitest'

import { accessTokenFrom, parseCookies } from './http.js'

describe('parseCookies', () => {
  it('reads name=value pairs and skips malformed ones', () => {
    expect(parseCookies('a=1; b=hello%20world; broken; c=%E0%A4%A')).toEqual({
      a: '1',
      b: 'hello world',
    })
    expect(parseCookies(undefined)).toEqual({})
  })

  it('only reads the cookie name of its own environment', () => {
    const cookie = 'access_token=prod; stg_access_token=stg'
    expect(accessTokenFrom({ cookie }, 'stg_access_token')).toBe('stg')
    expect(accessTokenFrom({ cookie }, 'access_token')).toBe('prod')
    expect(
      accessTokenFrom({ cookie: 'access_token=prod' }, 'stg_access_token'),
    ).toBeUndefined()
  })
})

describe('accessTokenFrom', () => {
  it('prefers the Bearer header, then the access cookie', () => {
    expect(
      accessTokenFrom(
        { authorization: 'Bearer abc', cookie: 'access_token=x' },
        'access_token',
      ),
    ).toBe('abc')
    expect(
      accessTokenFrom({ cookie: 'access_token=x; other=1' }, 'access_token'),
    ).toBe('x')
    expect(
      accessTokenFrom({ authorization: 'Basic abc' }, 'access_token'),
    ).toBeUndefined()
    expect(accessTokenFrom({}, 'access_token')).toBeUndefined()
  })
})
