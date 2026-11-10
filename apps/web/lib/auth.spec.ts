import { afterEach, describe, expect, it, vi } from 'vitest'

import { publicEnv } from './env'

const { refreshSession, safeNext } = await import('./auth')

describe('safeNext', () => {
  it('keeps same-site paths only', () => {
    expect(safeNext('/hellos?page=2')).toBe('/hellos?page=2')
    for (const bad of [
      '//evil.com',
      '/\\evil.com',
      'https://evil.com',
      '',
      undefined,
      ['/x'],
    ])
      expect(safeNext(bad)).toBe('/')
  })
})

describe('refreshSession', () => {
  afterEach(() => vi.restoreAllMocks())

  it('posts to /auth/refresh with the cookies, one request for concurrent callers', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }))
    await expect(
      Promise.all([refreshSession(), refreshSession()]),
    ).resolves.toEqual([true, true])
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(`${publicEnv.apiUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
  })

  it('is false when the session is over or the api is unreachable', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 401 }),
    )
    expect(await refreshSession()).toBe(false)
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new TypeError('offline'),
    )
    expect(await refreshSession()).toBe(false)
  })
})
