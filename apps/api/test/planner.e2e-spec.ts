import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { PrismaService } from '@repo/db/nest'
import { AccessTokens } from '@repo/nest-common/auth'

import { createApp } from './create-app'

interface Task {
  id: string
  title: string
  status: string
  date: string | null
  startMinute: number | null
  position: number
}

describe('Planner (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let owner: string
  let other: string

  async function userToken() {
    const user = await prisma.user.create({
      data: { email: `planner-${randomUUID()}@test.local` },
    })
    const token = await app
      .get(AccessTokens)
      .sign({ id: user.id, sessionId: randomUUID(), role: 'USER' })
    return `Bearer ${token}`
  }

  const http = () => request(app.getHttpServer())
  const tasks = '/api/planner/tasks'

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
    owner = await userToken()
    other = await userToken()
  })

  afterAll(async () => {
    await app.close()
  })

  it('needs a signed-in user', async () => {
    await http().get(`${tasks}?from=2026-11-01&to=2026-11-30`).expect(401)
  })

  it('creates, moves and deletes a task of the owner only', async () => {
    const created = await http()
      .post(tasks)
      .set('authorization', owner)
      .send({ title: 'Standup', date: '2026-11-24', startMinute: 540 })
      .expect(201)
    const task = created.body as Task
    expect(task).toMatchObject({
      title: 'Standup',
      status: 'TODO',
      date: '2026-11-24T00:00:00.000Z',
      startMinute: 540,
      position: 1,
    })
    const backlog = await http()
      .post(tasks)
      .set('authorization', owner)
      .send({ title: 'Someday' })
      .expect(201)

    const range = await http()
      .get(`${tasks}?from=2026-11-01&to=2026-11-30`)
      .set('authorization', owner)
      .expect(200)
    expect((range.body as Task[]).map((t) => t.title)).toEqual([
      'Standup',
      'Someday',
    ])
    const outside = await http()
      .get(`${tasks}?from=2026-12-01&to=2026-12-31`)
      .set('authorization', owner)
      .expect(200)
    expect((outside.body as Task[]).map((t) => t.id)).toEqual([
      (backlog.body as Task).id,
    ])

    await http()
      .patch(`${tasks}/${task.id}`)
      .set('authorization', other)
      .send({ status: 'DONE' })
      .expect(404)
    const moved = await http()
      .patch(`${tasks}/${task.id}`)
      .set('authorization', owner)
      .send({ status: 'DOING', date: null, position: 0.5 })
      .expect(200)
    expect(moved.body).toMatchObject({
      status: 'DOING',
      date: null,
      position: 0.5,
    })

    await http()
      .delete(`${tasks}/${task.id}`)
      .set('authorization', other)
      .expect(404)
    await http()
      .delete(`${tasks}/${task.id}`)
      .set('authorization', owner)
      .expect(204)
  })

  it('rejects bad input', async () => {
    await http()
      .post(tasks)
      .set('authorization', owner)
      .send({ title: 'x', startMinute: 2000 })
      .expect(400)
    await http()
      .get(`${tasks}?from=2026-01-01&to=2026-12-31`)
      .set('authorization', owner)
      .expect(400)
  })
})
