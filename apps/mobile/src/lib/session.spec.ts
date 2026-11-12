import * as SecureStore from 'expo-secure-store'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiFetch } from './api'
import { env } from './env'
import {
  accessToken,
  loadSession,
  refreshSession,
  signIn,
  signOut,
  signUp,
} from './session'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status })
const issued = (n: number) => ({
  user: { id: 'u1' },
  expiresIn: 900,
  accessToken: `access-${n}`,
  refreshToken: `refresh-${n}`,
})

describe('mobile session', () => {
  afterEach(() => vi.restoreAllMocks())

  it('signs in in token mode and keeps the tokens in the secure store', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(json(issued(1)))
    await signIn('jane', 'secret')

    expect(fetchMock).toHaveBeenCalledWith(`${env.apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ login: 'jane', password: 'secret' }),
      headers: {
        'content-type': 'application/json',
        'x-auth-transport': 'token',
      },
    })
    expect(accessToken()).toBe('access-1')
    expect(
      JSON.parse((await SecureStore.getItemAsync('auth.tokens'))!),
    ).toEqual({
      accessToken: 'access-1',
      refreshToken: 'refresh-1',
    })
  })

  it('sends the access token, refreshes once on 401 and retries', async () => {
    const calls: string[] = []
    vi.spyOn(globalThis, 'fetch').mockImplementation((input, init) => {
      const path = (input as string).replace(env.apiUrl, '')
      const auth = new Headers(init?.headers).get('authorization')
      calls.push(`${path} ${auth ?? ''}`)
      if (path === '/auth/refresh') return Promise.resolve(json(issued(2)))
      return Promise.resolve(
        auth === 'Bearer access-2' ? json({ ok: true }) : json({}, 401),
      )
    })

    await expect(apiFetch('/hellos')).resolves.toEqual({ ok: true })
    expect(calls).toEqual([
      '/hellos Bearer access-1',
      '/auth/refresh ',
      '/hellos Bearer access-2',
    ])
  })

  it('signs out when the refresh is refused, and after a restart stays signed out', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json({}, 401))
    expect(await refreshSession()).toBe(false)
    expect(accessToken()).toBeUndefined()
    await loadSession()
    expect(accessToken()).toBeUndefined()
  })

  it('restores saved tokens at startup and forgets them on sign-out', async () => {
    await SecureStore.setItemAsync(
      'auth.tokens',
      JSON.stringify({ accessToken: 'a', refreshToken: 'r' }),
    )
    await loadSession()
    expect(accessToken()).toBe('a')

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 204 }))
    await signOut()
    expect(fetchMock).toHaveBeenCalledWith(
      `${env.apiUrl}/auth/logout`,
      expect.objectContaining({ body: JSON.stringify({ refreshToken: 'r' }) }),
    )
    expect(accessToken()).toBeUndefined()
    expect(await SecureStore.getItemAsync('auth.tokens')).toBeNull()
  })

  it('signs up in token mode and keeps the tokens', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(json(issued(7)))
    await signUp({ email: 'jane@example.com', password: 'secret 123' })
    expect(fetchMock).toHaveBeenCalledWith(`${env.apiUrl}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'jane@example.com',
        password: 'secret 123',
      }),
      headers: {
        'content-type': 'application/json',
        'x-auth-transport': 'token',
      },
    })
    expect(accessToken()).toBe('access-7')
  })
})
