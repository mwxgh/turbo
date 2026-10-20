import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { PrismaService } from '../src/prisma/prisma.service.js'
import { createApp } from './create-app.js'

/** GET /api/hellos list queries (keyword, filter, sort) against Postgres. */
describe('Hellos list queries (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  const list = (query: Record<string, string> | string) =>
    request(app.getHttpServer()).get('/api/hellos').query(query)
  const messages = (body: { items: { message: string }[] }) =>
    body.items.map((h) => h.message)

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
    await prisma.hello.deleteMany()
    // Times in UTC; Vietnam is UTC+7
    await prisma.hello.createMany({
      data: [
        { message: 'Alpha', createdAt: new Date('2026-10-19T16:30:00Z') }, // 19/10 23:30 VN
        { message: 'beta', createdAt: new Date('2026-10-19T17:30:00Z') }, // 20/10 00:30 VN
        { message: 'Gamma 100%', createdAt: new Date('2026-10-20T10:00:00Z') }, // 20/10 17:00 VN
        { message: 'delta_x', createdAt: new Date('2026-10-21T02:00:00Z') }, // 21/10 09:00 VN
      ],
    })
  })

  afterAll(async () => {
    await prisma.hello.deleteMany()
    await app.close()
  })

  it('sorts newest first by default', async () => {
    const { body } = await list({}).expect(200)
    expect(messages(body)).toEqual(['delta_x', 'Gamma 100%', 'beta', 'Alpha'])
    expect(body).toMatchObject({ total: 4, totalPages: 1 })
  })

  it('sorts by an allowed field (case-insensitive direction)', async () => {
    const { body } = await list({ sortBy: 'createdAt', sortDir: 'ASC' }).expect(
      200,
    )
    expect(messages(body)).toEqual(['Alpha', 'beta', 'Gamma 100%', 'delta_x'])
  })

  it('searches the keyword case-insensitively', async () => {
    const { body } = await list({ keyword: 'GAMMA' }).expect(200)
    expect(messages(body)).toEqual(['Gamma 100%'])
  })

  it('treats % and _ in the keyword literally (no LIKE wildcards)', async () => {
    expect(messages((await list({ keyword: '%' }).expect(200)).body)).toEqual([
      'Gamma 100%',
    ])
    expect(messages((await list({ keyword: '_' }).expect(200)).body)).toEqual([
      'delta_x',
    ])
  })

  it('filters with JSON operators', async () => {
    const filter = JSON.stringify({ message: { startsWith: 'a' } })
    expect(messages((await list({ filter }).expect(200)).body)).toEqual([
      'Alpha',
    ])

    const inList = JSON.stringify({ message: ['alpha', 'BETA'] })
    expect(
      messages((await list({ filter: inList }).expect(200)).body).sort(),
    ).toEqual(['Alpha', 'beta'])
  })

  it('filters with the bracket syntax', async () => {
    const { body } = await list(
      'filter[message][contains]=ta&sortBy=message',
    ).expect(200)
    expect(messages(body)).toEqual(['beta', 'delta_x'])
  })

  it('filters calendar days in Vietnam time', async () => {
    // 20/10 (VN) = 19/10 17:00Z → 20/10 16:59:59Z
    const day = JSON.stringify({ createdAt: '2026-10-20' })
    expect(messages((await list({ filter: day }).expect(200)).body)).toEqual([
      'Gamma 100%',
      'beta',
    ])

    const range = JSON.stringify({
      createdAt: { from: '2026-10-20', to: '2026-10-21' },
    })
    expect(messages((await list({ filter: range }).expect(200)).body)).toEqual([
      'delta_x',
      'Gamma 100%',
      'beta',
    ])
  })

  it('combines keyword, filter, sort and pagination', async () => {
    const { body } = await list({
      keyword: 'a',
      filter: JSON.stringify({ createdAt: { from: '2026-10-20' } }),
      sortBy: 'createdAt',
      sortDir: 'desc',
      page: '1',
      pageSize: '2',
    }).expect(200)
    expect(messages(body)).toEqual(['delta_x', 'Gamma 100%'])
    expect(body).toMatchObject({
      total: 3,
      page: 1,
      pageSize: 2,
      totalPages: 2,
    })
  })

  it('sorts strings by the database collation', async () => {
    // postgres:17-alpine compares bytes: uppercase before lowercase
    const { body } = await list({ sortBy: 'message' }).expect(200)
    expect(messages(body)).toEqual(['Alpha', 'Gamma 100%', 'beta', 'delta_x'])
  })

  it.each([
    [{ filter: '{"password":"x"}' }, 'Unknown filter "password"'],
    [{ filter: '{"message":{"gt":"a"}}' }, 'does not support "gt"'],
    [{ filter: '{"createdAt":"yesterday"}' }, 'expects an ISO date'],
    [{ filter: '{bad json' }, 'filter must be an object'],
    [{ sortBy: 'id' }, 'Cannot sort by "id"'],
    [{ sortDir: 'up' }, 'sortDir must be one of the following values'],
  ])('400 for %j', async (query, message) => {
    const { body } = await list(query).expect(400)
    expect(body.message).toContainEqual(expect.stringContaining(message))
  })
})
