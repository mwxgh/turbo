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

  it('serves the OpenAPI document outside prod (APP_ENV dev/stg)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/api/docs-json')
      .expect(200)
    expect(Object.keys(body.paths)).toEqual(
      expect.arrayContaining([
        '/api/health',
        '/api/hellos',
        '/api/hellos/{id}',
      ]),
    )
  })
})
