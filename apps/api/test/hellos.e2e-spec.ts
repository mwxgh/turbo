import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import type { PrismaService } from '@repo/db/nest'

import { createApp } from './create-app'

describe('Hellos (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  const http = () => request(app.getHttpServer())

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await prisma.hello.deleteMany()
  })

  it('runs the full CRUD flow', async () => {
    const created = await http()
      .post('/api/hellos')
      .send({ message: '  Xin chào  ' })
      .expect(201)
    expect(created.body).toMatchObject({ message: 'Xin chào' })
    const { id } = created.body as { id: string }

    await http()
      .get(`/api/hellos/${id}`)
      .expect(200)
      .expect(({ body }) => expect(body.message).toBe('Xin chào'))

    await http()
      .patch(`/api/hellos/${id}`)
      .send({ message: 'Updated' })
      .expect(200)
      .expect(({ body }) => expect(body.message).toBe('Updated'))

    await http().delete(`/api/hellos/${id}`).expect(204)
    await http().get(`/api/hellos/${id}`).expect(404)
  })

  it('paginates newest first', async () => {
    for (const message of ['a', 'b', 'c']) {
      await http().post('/api/hellos').send({ message }).expect(201)
    }

    const { body } = await http()
      .get('/api/hellos')
      .query({ page: 1, pageSize: 2 })
      .expect(200)

    expect(body).toMatchObject({
      total: 3,
      page: 1,
      pageSize: 2,
      totalPages: 2,
    })
    expect(body.items.map((h: { message: string }) => h.message)).toEqual([
      'c',
      'b',
    ])
  })

  it.each([
    [{}, 'message should not be null or undefined'],
    [{ message: '   ' }, 'message should not be empty'],
    [
      { message: 'x'.repeat(256) },
      'message must be shorter than or equal to 255 characters',
    ],
    [{ message: 'ok', extra: 1 }, 'property extra should not exist'],
  ])('rejects invalid body %j', async (body, error) => {
    const res = await http().post('/api/hellos').send(body).expect(400)
    expect(res.body.message).toContain(error)
  })

  it('rejects invalid query and id', async () => {
    await http().get('/api/hellos').query({ page: 0 }).expect(400)
    await http().get('/api/hellos/not-a-uuid').expect(400)
  })

  it('maps missing records to 404 via PrismaExceptionFilter', async () => {
    const missing = '00000000-0000-4000-8000-000000000000'
    await http()
      .patch(`/api/hellos/${missing}`)
      .send({ message: 'x' })
      .expect(404)
      .expect(({ body }) => expect(body.message).toBe('Record not found'))
  })
})
