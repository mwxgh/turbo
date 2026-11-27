import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { StudioCategory } from '@repo/db'
import type { PrismaService } from '@repo/db/nest'
import { AccessTokens } from '@repo/nest-common/auth'

import { AdminLearnService } from '../src/studio/admin-learn.service'
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

  it('imports a content file by slug, twice without duplicates', async () => {
    const service = app.get(AdminLearnService)
    const track = `imp-${randomUUID().slice(0, 8)}`
    const outline = `out-${randomUUID().slice(0, 8)}`
    const roadmap = `rm-${randomUUID().slice(0, 8)}`
    const content = {
      tracks: [
        {
          slug: track,
          category: StudioCategory.LANGUAGE,
          title: 'Imported',
          lessons: [
            {
              slug: 'one',
              title: 'One',
              content: '## One',
              questions: [{ prompt: 'Q?', choices: ['a', 'b'], answer: 1 }],
            },
          ],
        },
        { slug: outline, category: StudioCategory.TOOL, title: 'Outline' },
      ],
      roadmaps: [
        {
          slug: roadmap,
          title: 'Path',
          steps: [{ title: 'Learn it', track }, { title: 'Later' }],
        },
      ],
    }
    expect(await service.importContent(content)).toEqual({
      tracks: 2,
      lessons: 1,
      roadmaps: 1,
    })
    // Second run with a fixed lesson: updated in place, quiz replaced
    content.tracks[0]!.lessons![0]!.title = 'One, fixed'
    await service.importContent(content)

    const stored = await prisma.studioTrack.findMany({
      where: { slug: { in: [track, outline] } },
      include: { lessons: { include: { questions: true } } },
      orderBy: { slug: 'asc' },
    })
    expect(
      stored.map((t) => [t.slug, t.status, t.lessons.length]).sort(),
    ).toEqual(
      [
        [track, 'PUBLISHED', 1],
        [outline, 'DRAFT', 0],
      ].sort(),
    )
    const lesson = stored.find((t) => t.slug === track)!.lessons[0]!
    expect(lesson).toMatchObject({ title: 'One, fixed', status: 'PUBLISHED' })
    expect(lesson.questions).toHaveLength(1)
    const path = await prisma.studioRoadmap.findUniqueOrThrow({
      where: { slug: roadmap },
      include: { steps: { orderBy: { order: 'asc' } } },
    })
    expect(path.status).toBe('PUBLISHED')
    expect(path.steps.map((s) => [s.title, s.trackId !== null])).toEqual([
      ['Learn it', true],
      ['Later', false],
    ])

    await expect(
      service.importContent({
        roadmaps: [
          {
            slug: roadmap,
            title: 'Path',
            steps: [{ title: 'x', track: 'nope-x' }],
          },
        ],
      }),
    ).rejects.toThrow('unknown tracks: nope-x')
  })
})
