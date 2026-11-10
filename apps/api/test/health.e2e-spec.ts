import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createApp } from './create-app'

describe('Health & docs (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    ;({ app } = await createApp())
  })

  afterAll(async () => {
    await app.close()
  })

  it('reports the database as up', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
    expect(body).toMatchObject({
      status: 'ok',
      service: 'api',
      env: 'dev',
      checks: { database: 'up', redis: 'up' },
    })
  })

  it('serves readiness on /api/health/ready and liveness on /api/health/live', async () => {
    const server = app.getHttpServer()
    const ready = await request(server).get('/api/health/ready').expect(200)
    expect(ready.body).toMatchObject({
      checks: { database: 'up', redis: 'up' },
    })
    const live = await request(server).get('/api/health/live').expect(200)
    expect(live.body).toMatchObject({ status: 'ok', service: 'api' })
    expect(live.body).not.toHaveProperty('checks')
  })

  it('serves the OpenAPI document outside prod (APP_ENV dev/stg)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/api/docs-json')
      .expect(200)
    expect(Object.keys(body.paths)).toEqual(
      expect.arrayContaining([
        '/api/health',
        '/api/health/live',
        '/api/health/ready',
        '/api/hellos',
        '/api/hellos/{id}',
      ]),
    )
  })
})
