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
})

describe('accessTokenFrom', () => {
  it('prefers the Bearer header, then the access cookie', () => {
    expect(
      accessTokenFrom({
        authorization: 'Bearer abc',
        cookie: 'access_token=x',
      }),
    ).toBe('abc')
    expect(accessTokenFrom({ cookie: 'access_token=x; other=1' })).toBe('x')
    expect(accessTokenFrom({ authorization: 'Basic abc' })).toBeUndefined()
    expect(accessTokenFrom({})).toBeUndefined()
  })
})
