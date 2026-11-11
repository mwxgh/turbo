import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { bearer, createApp } from './create-app'

describe('HTTP hardening (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    ;({ app } = await createApp())
  })

  afterAll(async () => {
    await app.close()
  })

  it('sends security headers (helmet)', async () => {
    const res = await request(app.getHttpServer()).get('/api/health/live')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  it('echoes a valid x-request-id, or generates one', async () => {
    const server = app.getHttpServer()
    const echoed = await request(server)
      .get('/api/health/live')
      .set('x-request-id', 'web-123')
    expect(echoed.headers['x-request-id']).toBe('web-123')
    const generated = await request(server)
      .get('/api/health/live')
      .set('x-request-id', 'not valid')
    expect(generated.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('rate limits controllers that opt in with ThrottlerGuard', async () => {
    // Any signed token passes the auth guard; the presign is computed locally (no S3)
    const res = await request(app.getHttpServer())
      .post('/api/files/uploads')
      .set('authorization', await bearer(app))
      .send({ fileName: 'a.pdf', contentType: 'application/pdf', size: 1 })
      .expect(201)
    expect(res.headers['x-ratelimit-limit']).toBe('100000')
    expect(Number(res.headers['x-ratelimit-remaining'])).toBeLessThan(100000)
  })

  it('leaves controllers without the guard unlimited (health probes)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/health/ready')
      .expect(200)
    expect(res.headers['x-ratelimit-limit']).toBeUndefined()
  })

  it('rejects JSON bodies over BODY_LIMIT with 413', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ name: 'x'.repeat(200 * 1024) }))
      .expect(413)
  })
})
