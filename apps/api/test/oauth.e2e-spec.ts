import { createHash } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { hashPassword, parseCookies } from '@repo/auth'
import type { PrismaService } from '@repo/db/nest'

import { AuthRegistration, env } from '../src/env'
import { createApp } from './create-app'

const COOKIES = env.authCookies
const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('base64url')

interface FakeAccount {
  sub: string
  email?: string
  verified: boolean
  name?: string
}

/**
 * Stands in for Google and GitHub: token endpoint + profile APIs. Other URLs go to the real fetch.
 * `tokenRequests` records the form bodies sent to the token endpoints.
 */
function stubProviders(account: () => FakeAccount) {
  const realFetch = globalThis.fetch
  const tokenRequests: URLSearchParams[] = []
  const json = (body: unknown) => Promise.resolve(Response.json(body))
  vi.spyOn(globalThis, 'fetch').mockImplementation((input, init) => {
    const url = String(input instanceof Request ? input.url : input)
    const a = account()
    if (
      url === 'https://oauth2.googleapis.com/token' ||
      url === 'https://github.com/login/oauth/access_token'
    ) {
      tokenRequests.push(init?.body as URLSearchParams)
      return json({ access_token: 'provider-access-token' })
    }
    if (url === 'https://openidconnect.googleapis.com/v1/userinfo')
      return json({
        sub: a.sub,
        email: a.email,
        email_verified: a.verified,
        name: a.name,
      })
    if (url === 'https://api.github.com/user')
      return json({ id: Number(a.sub), login: 'octo', name: a.name })
    if (url === 'https://api.github.com/user/emails')
      return json(
        a.email
          ? [{ email: a.email, primary: true, verified: a.verified }]
          : [],
      )
    return realFetch(input, init)
  })
  return tokenRequests
}

describe('OAuth sign-in (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let account: FakeAccount
  let tokenRequests: URLSearchParams[]
  const http = () => request(app.getHttpServer())

  /** Starts a flow like a browser: provider URL + the state cookie. */
  async function start(provider: string, query: Record<string, string> = {}) {
    const res = await http()
      .get(`/api/auth/oauth/${provider}`)
      .query(query)
      .expect(302)
    const location = new URL(res.headers.location as string)
    const cookie = ([] as string[])
      .concat(res.headers['set-cookie'] ?? [])
      .map((c) => c.split(';')[0])
      .join('; ')
    return {
      location,
      state: location.searchParams.get('state')!,
      cookie,
    }
  }

  /** The provider redirecting the browser back. */
  const callback = (
    provider: string,
    query: Record<string, string>,
    cookie = '',
  ) =>
    http()
      .get(`/api/auth/oauth/${provider}/callback`)
      .query(query)
      .set('cookie', cookie)
      .expect(302)

  const sessionCookies = (res: request.Response) =>
    ([] as string[])
      .concat(res.headers['set-cookie'] ?? [])
      .map((c) => c.split(';')[0] ?? '')
      .filter((c) => !c.endsWith('='))
      .join('; ')

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany() // identities and sessions cascade
    account = {
      sub: '1001',
      email: 'ann@example.com',
      verified: true,
      name: 'Ann',
    }
    tokenRequests = stubProviders(() => account)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    env.AUTH_REGISTRATION = AuthRegistration.Open
  })

  it('lists the enabled providers and whether registration is open', async () => {
    const res = await http().get('/api/auth/methods').expect(200)
    expect(res.body).toEqual({
      providers: ['google', 'github'],
      registration: true,
    })
    await http().get('/api/auth/oauth/facebook').expect(404)
    await http().get('/api/auth/oauth/myspace').expect(404)
  })

  it('signs a browser in with Google (PKCE, state cookie) and lands on `next`', async () => {
    const { location, state, cookie } = await start('google', {
      next: '/hellos?page=2',
    })
    expect(location.origin + location.pathname).toBe(
      'https://accounts.google.com/o/oauth2/v2/auth',
    )
    expect(Object.fromEntries(location.searchParams)).toMatchObject({
      client_id: 'google-client',
      redirect_uri: 'http://localhost:3001/api/auth/oauth/google/callback',
      response_type: 'code',
      code_challenge_method: 'S256',
    })
    expect(parseCookies(cookie).oauth_state).toBe(state)

    const res = await callback('google', { code: 'c1', state }, cookie)
    expect(res.headers.location).toBe('http://localhost:3000/hellos?page=2')
    // The verifier sent to Google matches the challenge of the authorize URL
    expect(sha256(tokenRequests[0]!.get('code_verifier')!)).toBe(
      location.searchParams.get('code_challenge'),
    )

    const me = await http()
      .get('/api/auth/me')
      .set('cookie', sessionCookies(res))
      .expect(200)
    expect(me.body).toMatchObject({ email: 'ann@example.com', name: 'Ann' })
    expect(parseCookies(sessionCookies(res))).toHaveProperty(COOKIES.refresh)

    // Same provider account again: same user, no duplicate
    const again = await start('google')
    await callback('google', { code: 'c2', state: again.state }, again.cookie)
    expect(await prisma.user.count()).toBe(1)
  })

  it('refuses a reused state, a state from another browser and cancellations', async () => {
    const { state, cookie } = await start('google', { next: '/x' })
    await callback('google', { code: 'c', state }, cookie)
    const replay = await callback('google', { code: 'c', state }, cookie)
    expect(replay.headers.location).toBe(
      'http://localhost:3000/login?error=invalid_state',
    )

    const foreign = await start('google', { next: '/x' })
    const csrf = await callback('google', { code: 'c', state: foreign.state })
    expect(csrf.headers.location).toBe(
      'http://localhost:3000/login?error=invalid_state&next=%2Fx',
    )

    const cancel = await start('google')
    const cancelled = await callback(
      'google',
      { error: 'access_denied', state: cancel.state },
      cancel.cookie,
    )
    expect(cancelled.headers.location).toBe(
      'http://localhost:3000/login?error=cancelled',
    )
  })

  it('ignores an off-site `next`', async () => {
    const { state, cookie } = await start('google', { next: '//evil.com' })
    const res = await callback('google', { code: 'c', state }, cookie)
    expect(res.headers.location).toBe('http://localhost:3000/')
  })

  it('links an existing account only by a verified email', async () => {
    const jane = await prisma.user.create({
      data: {
        email: 'jane@example.com',
        passwordHash: await hashPassword('correct horse battery'),
      },
    })

    account = { sub: '2002', email: 'jane@example.com', verified: false }
    let flow = await start('github')
    let res = await callback(
      'github',
      { code: 'c', state: flow.state },
      flow.cookie,
    )
    expect(res.headers.location).toBe(
      'http://localhost:3000/login?error=email_not_verified',
    )

    account = { ...account, verified: true }
    flow = await start('github')
    res = await callback(
      'github',
      { code: 'c', state: flow.state },
      flow.cookie,
    )
    expect(res.headers.location).toBe('http://localhost:3000/')
    expect(
      await prisma.userIdentity.findMany({ select: { userId: true } }),
    ).toEqual([{ userId: jane.id }])
  })

  it('creates an account without an unverified email, unless registration is closed', async () => {
    account = { sub: '3003', email: 'new@example.com', verified: false }
    const flow = await start('github')
    await callback('github', { code: 'c', state: flow.state }, flow.cookie)
    expect(
      await prisma.user.findMany({ select: { email: true, name: true } }),
    ).toEqual([{ email: null, name: 'octo' }])

    env.AUTH_REGISTRATION = AuthRegistration.Closed
    account = { sub: '4004', email: 'other@example.com', verified: true }
    const closed = await start('google')
    const res = await callback(
      'google',
      { code: 'c', state: closed.state },
      closed.cookie,
    )
    expect(res.headers.location).toBe(
      'http://localhost:3000/login?error=registration_closed',
    )
  })

  it('returns to the mobile app with a one-time code redeemed by its verifier', async () => {
    const verifier = 'v'.repeat(43)
    await http()
      .get('/api/auth/oauth/google')
      .query({
        client: 'mobile',
        redirectUri: 'evil://steal',
        codeChallenge: sha256(verifier),
      })
      .expect(400)

    const { state, cookie } = await start('google', {
      client: 'mobile',
      redirectUri: 'turbobase://oauth',
      codeChallenge: sha256(verifier),
    })
    const res = await callback('google', { code: 'c', state }, cookie)
    const back = new URL(res.headers.location as string)
    expect(back.protocol + back.host + back.pathname).toBe('turbobase:oauth')
    const code = back.searchParams.get('code')!

    const exchange = (codeVerifier: string) =>
      http().post('/api/auth/oauth/exchange').send({ code, codeVerifier })
    const tokens = await exchange(verifier).expect(200)
    expect(tokens.body).toMatchObject({
      user: { email: 'ann@example.com' },
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    })
    await exchange(verifier).expect(401) // one-time
  })

  it('refuses an exchange code with the wrong verifier', async () => {
    const verifier = 'w'.repeat(43)
    const { state, cookie } = await start('google', {
      client: 'mobile',
      redirectUri: 'turbobase://oauth',
      codeChallenge: sha256(verifier),
    })
    const res = await callback('google', { code: 'c', state }, cookie)
    const code = new URL(res.headers.location as string).searchParams.get(
      'code',
    )
    await http()
      .post('/api/auth/oauth/exchange')
      .send({ code, codeVerifier: 'x'.repeat(43) })
      .expect(401)
  })
})
