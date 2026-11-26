import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { PrismaService } from '@repo/db/nest'
import { AccessTokens } from '@repo/nest-common/auth'

import { bearer, createApp } from './create-app'

describe('Studio learn (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let learner: string
  let admin: string
  const slug = `ts-${randomUUID().slice(0, 8)}`
  const http = () => request(app.getHttpServer())

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
    const user = await prisma.user.create({
      data: { email: `studio-${randomUUID()}@test.local` },
    })
    const token = await app
      .get(AccessTokens)
      .sign({ id: user.id, sessionId: randomUUID(), role: 'USER' })
    learner = `Bearer ${token}`
    admin = await bearer(app, 'ADMIN')
  })

  afterAll(async () => {
    await app.close()
  })

  it('lets an admin write content that learners then read, quiz and finish', async () => {
    const track = await http()
      .post('/api/studio/admin/tracks')
      .set('authorization', admin)
      .send({
        slug,
        category: 'LANGUAGE',
        title: 'TypeScript',
        status: 'PUBLISHED',
      })
      .expect(201)
    const trackId = (track.body as { id: string }).id

    const lesson = await http()
      .post(`/api/studio/admin/tracks/${trackId}/lessons`)
      .set('authorization', admin)
      .send({
        slug: 'intro',
        title: 'Intro',
        content: '# Hi\n\n```ts\nconst a = 1\n```',
        status: 'PUBLISHED',
        questions: [
          {
            prompt: 'One?',
            choices: ['1', '2'],
            answer: 0,
            explanation: 'One.',
          },
          { prompt: 'Two?', choices: ['1', '2'], answer: 1 },
        ],
      })
      .expect(201)
    const lessonId = (lesson.body as { id: string }).id
    await http()
      .post(`/api/studio/admin/tracks/${trackId}/lessons`)
      .set('authorization', admin)
      .send({ slug: 'draft', title: 'Not yet' })
      .expect(201)

    const read = await http()
      .get(`/api/studio/tracks/${slug}/lessons/intro`)
      .set('authorization', learner)
      .expect(200)
    expect(read.body).toMatchObject({ title: 'Intro', done: false, next: null })
    // Answers stay on the server until the quiz is submitted
    expect(JSON.stringify(read.body)).not.toMatch(/"answer"|One\./)
    await http()
      .get(`/api/studio/tracks/${slug}/lessons/draft`)
      .set('authorization', learner)
      .expect(404)

    const quiz = await http()
      .post(`/api/studio/lessons/${lessonId}/quiz`)
      .set('authorization', learner)
      .send({ answers: [0, 1] })
      .expect(200)
    expect(quiz.body).toMatchObject({
      score: 2,
      total: 2,
      passed: true,
      done: true,
    })

    const tracks = await http()
      .get('/api/studio/tracks')
      .set('authorization', learner)
      .expect(200)
    expect(tracks.body).toContainEqual(
      expect.objectContaining({ slug, lessons: 1, done: 1 }),
    )
  })

  it('keeps the admin area and drafts away from learners', async () => {
    await http()
      .get('/api/studio/admin/tracks')
      .set('authorization', learner)
      .expect(403)
    await http()
      .post('/api/studio/admin/tracks')
      .set('authorization', admin)
      .send({ slug: 'Bad Slug', category: 'LANGUAGE', title: 'x' })
      .expect(400)
    await http()
      .post('/api/studio/admin/tracks')
      .set('authorization', admin)
      .send({ slug, category: 'LANGUAGE', title: 'Again' })
      .expect(409)
  })
})
