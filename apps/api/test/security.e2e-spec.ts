import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createApp } from './create-app'

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

  it('rate limits routes through the global guard', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/hellos')
      .expect(200)
    expect(res.headers['x-ratelimit-limit']).toBe('100000')
    expect(Number(res.headers['x-ratelimit-remaining'])).toBeLessThan(100000)
  })

  it('never rate limits health probes', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/health/ready')
      .expect(200)
    expect(res.headers['x-ratelimit-limit']).toBeUndefined()
  })

  it('rejects JSON bodies over BODY_LIMIT with 413', async () => {
    await request(app.getHttpServer())
      .post('/api/hellos')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ name: 'x'.repeat(200 * 1024) }))
      .expect(413)
  })
})
