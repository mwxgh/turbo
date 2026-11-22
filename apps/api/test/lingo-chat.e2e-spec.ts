import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { AccessTokens } from '@repo/auth'
import type { PrismaService } from '@repo/db/nest'

import { ArkModel } from '../src/lingo/ark-model'
import { createApp } from './create-app'

/** The model is faked: no BytePlus calls (and no key) in tests. */
const model = {
  enabled: true,
  fail: false,
  async *stream() {
    if (model.fail) throw new Error('model down')
    for (const piece of ['Xin ', 'chào']) yield await Promise.resolve(piece)
  },
}

describe('Lingo AI tutor chat (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let learner: string
  let other: string

  async function userToken() {
    const user = await prisma.user.create({
      data: { email: `chat-${randomUUID()}@test.local` },
    })
    const token = await app
      .get(AccessTokens)
      .sign({ id: user.id, sessionId: randomUUID(), role: 'USER' })
    return `Bearer ${token}`
  }

  const http = () => request(app.getHttpServer())

  beforeAll(async () => {
    ;({ app, prisma } = await createApp((builder) =>
      builder.overrideProvider(ArkModel).useValue(model),
    ))
    learner = await userToken()
    other = await userToken()
  })

  beforeEach(() => {
    model.enabled = true
    model.fail = false
  })

  afterAll(async () => {
    await app.close()
  })

  const newChat = async () =>
    (
      await http()
        .post('/api/lingo/chats')
        .set('authorization', learner)
        .expect(201)
    ).body as { id: string; title: string }

  it('streams the answer as text and keeps the conversation', async () => {
    const chat = await newChat()

    const res = await http()
      .post(`/api/lingo/chats/${chat.id}/messages`)
      .set('authorization', learner)
      .send({ text: 'Hello tutor' })
      .expect(200)
    expect(res.headers['content-type']).toMatch(/^text\/plain/)
    expect(res.text).toBe('Xin chào')

    const view = await http()
      .get(`/api/lingo/chats/${chat.id}`)
      .set('authorization', learner)
      .expect(200)
    expect(view.body).toMatchObject({
      title: 'Hello tutor',
      messages: [
        { role: 'USER', content: 'Hello tutor' },
        { role: 'ASSISTANT', content: 'Xin chào' },
      ],
    })

    const list = await http()
      .get('/api/lingo/chats')
      .set('authorization', learner)
      .expect(200)
    expect(list.body.items[0]).toMatchObject({ id: chat.id })
  })

  it('validates the question', async () => {
    const chat = await newChat()
    await http()
      .post(`/api/lingo/chats/${chat.id}/messages`)
      .set('authorization', learner)
      .send({ text: '' })
      .expect(400)
  })

  it('is 503 without a model and 502 when the model fails before answering', async () => {
    const chat = await newChat()
    model.enabled = false
    await http()
      .post(`/api/lingo/chats/${chat.id}/messages`)
      .set('authorization', learner)
      .send({ text: 'Hi' })
      .expect(503)

    model.enabled = true
    model.fail = true
    await http()
      .post(`/api/lingo/chats/${chat.id}/messages`)
      .set('authorization', learner)
      .send({ text: 'Hi' })
      .expect(502)
  })

  it('hides other learners’ chats', async () => {
    const chat = await newChat()
    await http()
      .get(`/api/lingo/chats/${chat.id}`)
      .set('authorization', other)
      .expect(404)
    await http()
      .post(`/api/lingo/chats/${chat.id}/messages`)
      .set('authorization', other)
      .send({ text: 'Hi' })
      .expect(404)
    await http()
      .delete(`/api/lingo/chats/${chat.id}`)
      .set('authorization', other)
      .expect(404)
    await http()
      .delete(`/api/lingo/chats/${chat.id}`)
      .set('authorization', learner)
      .expect(204)
  })

  it('needs a signed-in user', async () => {
    await http().get('/api/lingo/chats').expect(401)
  })
})
