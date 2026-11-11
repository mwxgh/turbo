import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { parseCookies } from '@repo/auth'
import type { PrismaService } from '@repo/db/nest'

import { createApp } from './create-app'

const PASSWORD = 'correct horse battery'
const TOKEN_MODE = { 'x-auth-transport': 'token' }

/** `name=value` of every Set-Cookie header, plus the raw attributes. */
function setCookies(res: request.Response) {
  const raw = ([] as string[]).concat(res.headers['set-cookie'] ?? [])
  const cookies = parseCookies(raw.map((c) => c.split(';')[0]).join('; '))
  return { cookies, raw, header: raw.map((c) => c.split(';')[0]).join('; ') }
}

describe('Auth (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  const http = () => request(app.getHttpServer())

  const register = (email = 'jane@example.com', username = 'jane') =>
    http()
      .post('/api/auth/register')
      .set(TOKEN_MODE)
      .send({ email, username, name: 'Jane', password: PASSWORD })
      .expect(201)

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany() // sessions cascade
  })

  it('keeps every route closed without a token, except @Public() ones', async () => {
    await http().get('/api/auth/me').expect(401)
    await http().get('/api/health/live').expect(200)
    await http()
      .get('/api/auth/me')
      .set('authorization', 'Bearer forged.token.value')
      .expect(401)
  })

  it('registers and signs in with cookies (browsers)', async () => {
    const res = await http()
      .post('/api/auth/register')
      .send({ email: 'Jane@Example.com', password: PASSWORD })
      .expect(201)
    expect(res.body).toMatchObject({
      user: { email: 'jane@example.com', role: 'USER' },
      expiresIn: 900,
    })
    expect(res.body.user).not.toHaveProperty('passwordHash')
    expect(res.body).not.toHaveProperty('accessToken')

    const { cookies, raw, header } = setCookies(res)
    expect(Object.keys(cookies).sort()).toEqual([
      'access_token',
      'refresh_token',
    ])
    for (const cookie of raw) expect(cookie).toMatch(/HttpOnly.*SameSite=Lax/i)

    const me = await http()
      .get('/api/auth/me')
      .set('cookie', header)
      .expect(200)
    expect(me.body).toMatchObject({ email: 'jane@example.com' })
  })

  it('signs in with email or username and returns tokens to native clients', async () => {
    await register()
    for (const login of ['jane@example.com', 'JANE']) {
      const res = await http()
        .post('/api/auth/login')
        .set(TOKEN_MODE)
        .send({ login, password: PASSWORD })
        .expect(200)
      expect(res.body).toMatchObject({
        user: { username: 'jane' },
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
      expect(res.headers['set-cookie']).toBeUndefined()
      await http()
        .get('/api/auth/me')
        .set('authorization', `Bearer ${res.body.accessToken}`)
        .expect(200)
    }
  })

  it('refuses wrong passwords, unknown and disabled accounts alike', async () => {
    await register()
    const login = (body: object) =>
      http().post('/api/auth/login').send(body).expect(401)
    await login({ login: 'jane', password: 'wrong password' })
    await login({ login: 'nobody', password: PASSWORD })
    await prisma.user.updateMany({ data: { disabledAt: new Date() } })
    await login({ login: 'jane', password: PASSWORD })
  })

  it('rejects a duplicate email with 409', async () => {
    await register()
    await http()
      .post('/api/auth/register')
      .send({ email: 'jane@example.com', password: PASSWORD })
      .expect(409)
  })

  it('rotates the refresh token, tolerates a concurrent reuse, revokes on theft', async () => {
    const { body } = await register()
    const refresh = (refreshToken: string) =>
      http().post('/api/auth/refresh').set(TOKEN_MODE).send({ refreshToken })

    const first = await refresh(body.refreshToken).expect(200)
    expect(first.body.refreshToken).not.toBe(body.refreshToken)
    // Another tab refreshing with the same (just replaced) token: still fine
    const second = await refresh(body.refreshToken).expect(200)

    // Long after the rotation, the old token is a stolen copy: the session ends
    await prisma.session.updateMany({
      data: { rotatedAt: new Date(Date.now() - 3_600_000) },
    })
    await refresh(first.body.refreshToken).expect(401)
    await refresh(second.body.refreshToken).expect(401)
  })

  it('refreshes from the cookie and logs out (session revoked, cookies cleared)', async () => {
    await register()
    const res = await http()
      .post('/api/auth/login')
      .send({ login: 'jane@example.com', password: PASSWORD })
      .expect(200)
    const login = setCookies(res)

    const refreshed = await http()
      .post('/api/auth/refresh')
      .set('cookie', login.header)
      .expect(200)
    const cookies = setCookies(refreshed)
    expect(cookies.cookies.refresh_token).not.toBe(login.cookies.refresh_token)

    const out = await http()
      .post('/api/auth/logout')
      .set('cookie', cookies.header)
      .expect(204)
    expect(setCookies(out).raw.join()).toMatch(
      /access_token=;.*Expires=Thu, 01 Jan 1970/,
    )
    await http()
      .post('/api/auth/refresh')
      .set('cookie', cookies.header)
      .expect(401)
  })

  it('changes the password and signs out the other devices', async () => {
    const phone = (await register()).body
    const laptop = (
      await http()
        .post('/api/auth/login')
        .set(TOKEN_MODE)
        .send({ login: 'jane', password: PASSWORD })
    ).body

    await http()
      .post('/api/auth/password')
      .set('authorization', `Bearer ${laptop.accessToken}`)
      .send({ currentPassword: 'wrong', newPassword: 'new password 123' })
      .expect(400)
    await http()
      .post('/api/auth/password')
      .set('authorization', `Bearer ${laptop.accessToken}`)
      .send({ currentPassword: PASSWORD, newPassword: 'new password 123' })
      .expect(204)

    const refresh = (refreshToken: string) =>
      http().post('/api/auth/refresh').set(TOKEN_MODE).send({ refreshToken })
    await refresh(phone.refreshToken).expect(401)
    await refresh(laptop.refreshToken).expect(200)
    await http()
      .post('/api/auth/login')
      .send({ login: 'jane', password: 'new password 123' })
      .expect(200)
  })
})
