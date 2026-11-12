import { createHash } from 'node:crypto'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { env } from './env'
import { OAuthSignInError, signInWithProvider } from './oauth'
import { accessToken } from './session'

const openAuthSessionAsync = vi.fn()

vi.mock('expo-web-browser', () => ({
  openAuthSessionAsync: (...args: unknown[]) =>
    openAuthSessionAsync(...args) as unknown,
}))
vi.mock('expo-linking', () => ({
  createURL: (path: string) => `turbobase://${path}`,
  parse: (url: string) => ({
    queryParams: Object.fromEntries(new URL(url).searchParams),
  }),
}))
vi.mock('expo-crypto', async () => {
  const crypto = await import('node:crypto')
  return {
    randomUUID: () => crypto.randomUUID(),
    CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
    CryptoEncoding: { BASE64: 'base64' },
    digestStringAsync: (_: string, data: string) =>
      Promise.resolve(
        crypto.createHash('sha256').update(data).digest('base64'),
      ),
  }
})

describe('signInWithProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    openAuthSessionAsync.mockReset()
  })

  it('opens the api in the browser with a PKCE challenge and redeems the code with the verifier', async () => {
    openAuthSessionAsync.mockResolvedValue({
      type: 'success',
      url: 'turbobase://oauth?code=one-time',
    })
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json({
        user: { id: 'u1' },
        expiresIn: 900,
        accessToken: 'access-oauth',
        refreshToken: 'refresh-oauth',
      }),
    )

    await expect(signInWithProvider('google')).resolves.toBe(true)

    const [url, redirect] = openAuthSessionAsync.mock.calls[0] as [
      string,
      string,
    ]
    const start = new URL(url)
    expect(start.origin + start.pathname).toBe(
      `${env.apiUrl}/auth/oauth/google`,
    )
    expect(start.searchParams.get('client')).toBe('mobile')
    expect(start.searchParams.get('redirectUri')).toBe('turbobase://oauth')
    expect(redirect).toBe('turbobase://oauth')

    const [path, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(path).toBe(`${env.apiUrl}/auth/oauth/exchange`)
    const body = JSON.parse(init.body as string) as {
      code: string
      codeVerifier: string
    }
    expect(body.code).toBe('one-time')
    expect(body.codeVerifier).toMatch(/^[0-9a-f]{64}$/)
    expect(
      createHash('sha256').update(body.codeVerifier).digest('base64url'),
    ).toBe(start.searchParams.get('codeChallenge'))
    expect(accessToken()).toBe('access-oauth')
  })

  it('resolves false when the user closes the browser', async () => {
    openAuthSessionAsync.mockResolvedValue({ type: 'cancel' })
    await expect(signInWithProvider('github')).resolves.toBe(false)
  })

  it('rejects with the api error code', async () => {
    openAuthSessionAsync.mockResolvedValue({
      type: 'success',
      url: 'turbobase://oauth?error=registration_closed',
    })
    await expect(signInWithProvider('github')).rejects.toEqual(
      new OAuthSignInError('registration_closed'),
    )
  })
})
