import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { AccessTokens } from '@repo/auth'
import type { PrismaService } from '@repo/db/nest'

import { createApp } from './create-app'

interface Question {
  id: string
  options: string[]
  answer?: number
  correct?: boolean | null
  explanationVi?: string
}
interface Attempt {
  id: string
  total: number
  correct: number | null
  submittedAt: string | null
  scores: Record<string, { correct: number; total: number }> | null
  questions: Question[]
}

interface Roadmap {
  target: number
  estimate: number | null
  stages: {
    id: string
    status: string
    tasks: { kind: string; done: boolean }[]
  }[]
}

describe('Lingo (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let admin: string
  let learner: string
  let other: string

  /** Lingo rows reference the user: sign in as a real (throwaway) user row. */
  async function userToken(role: 'USER' | 'ADMIN') {
    const user = await prisma.user.create({
      data: { email: `lingo-${randomUUID()}@test.local`, role },
    })
    const token = await app
      .get(AccessTokens)
      .sign({ id: user.id, sessionId: randomUUID(), role })
    return `Bearer ${token}`
  }

  const as = (auth: string) => ({
    get: (path: string) =>
      request(app.getHttpServer())
        .get(`/api/lingo${path}`)
        .set('authorization', auth),
    post: (path: string, body?: object) =>
      request(app.getHttpServer())
        .post(`/api/lingo${path}`)
        .set('authorization', auth)
        .send(body),
    put: (path: string, body: object) =>
      request(app.getHttpServer())
        .put(`/api/lingo${path}`)
        .set('authorization', auth)
        .send(body),
  })

  beforeAll(async () => {
    ;({ app, prisma } = await createApp())
    // Lingo content is shared: start from an empty bank
    await prisma.lingoTest.deleteMany()
    await prisma.lingoAttempt.deleteMany()
    await prisma.lingoItem.deleteMany()
    await prisma.lingoBatch.deleteMany()
    await prisma.lingoDeck.deleteMany()
    admin = await userToken('ADMIN')
    learner = await userToken('USER')
    other = await userToken('USER')
  })

  afterAll(async () => {
    await app.close()
  })

  it('lists exams, only TOEIC open', async () => {
    const res = await as(learner).get('/exams').expect(200)
    expect(res.body).toContainEqual(
      expect.objectContaining({ code: 'TOEIC_LR', available: true }),
    )
    await as(learner).get('/exams/HSK').expect(404)
  })

  it('keeps admin routes for admins', async () => {
    await as(learner).post('/admin/samples').expect(403)
    await as(learner).get('/admin/items').expect(403)
  })

  it('loads the samples once', async () => {
    const first = await as(admin).post('/admin/samples').expect(200)
    expect(first.body).toMatchObject({
      items: { succeeded: 121, failed: 0 },
      // Starter deck 30 + fifteen topic decks of 40
      cards: { succeeded: 630, failed: 0, decks: 16 },
    })
    const library = (await as(learner).get('/exams/TOEIC_LR/tests').expect(200))
      .body as { items: { id: string; title: string; questions: number }[] }
    // …and the published sample tests, each made once
    expect(library.items.map((t) => [t.title, t.questions]).sort()).toEqual([
      ['Lingo Mini Test 01', 93],
      ['Lingo Mini Test 02', 93],
      ['Đề mẫu Lingo 01', 40],
    ])
    const again = await as(admin).post('/admin/samples').expect(200)
    expect(again.body).toMatchObject({
      items: { succeeded: 0, duplicates: 121 },
      cards: { succeeded: 0, duplicates: 630 },
    })
    const exam = await as(learner).get('/exams/TOEIC_LR').expect(200)
    const parts = (
      exam.body as {
        sections: { parts: { code: string; published: number }[] }[]
      }
    ).sections.flatMap((s) => s.parts)
    expect(parts.find((p) => p.code === 'P5')?.published).toBe(42)
  })

  it('imports valid items as drafts and reports invalid rows', async () => {
    const res = await as(admin)
      .post('/admin/items/import', {
        exam: 'TOEIC_LR',
        part: 'P5',
        fileName: 'batch.json',
        items: [
          {
            difficulty: 'EASY',
            questions: [
              {
                text: 'The office ------- at 9 a.m.',
                options: ['open', 'opens', 'opening', 'to open'],
                answer: 1,
              },
            ],
          },
          {
            difficulty: 'EASY',
            questions: [{ text: 'x', options: ['a'], answer: 0 }],
          },
        ],
      })
      .expect(200)
    expect(res.body).toMatchObject({
      succeeded: 1,
      failed: 1,
      errors: [{ line: 2 }],
    })

    const drafts = await as(admin)
      .get('/admin/items?filter[status]=DRAFT')
      .expect(200)
    const items = (drafts.body as { items: { id: string }[] }).items
    expect(items).toHaveLength(1)
    await as(admin)
      .post('/admin/items/status', { ids: [items[0]!.id], status: 'REJECTED' })
      .expect(200)
  })

  it('runs a practice attempt: no answers before submit, graded after', async () => {
    const started = await as(learner)
      .post('/attempts', { exam: 'TOEIC_LR', part: 'P5', count: 3 })
      .expect(201)
    const attempt = started.body as Attempt
    expect(attempt.questions).toHaveLength(3)
    expect(attempt.questions[0]).not.toHaveProperty('answer')
    expect(attempt.questions[0]).not.toHaveProperty('explanationVi')

    const [first, second] = attempt.questions
    await as(learner)
      .put(`/attempts/${attempt.id}/answers/${first!.id}`, { choice: 9 })
      .expect(400)
    await as(learner)
      .put(`/attempts/${attempt.id}/answers/${first!.id}`, {
        choice: 0,
        timeMs: 1200,
      })
      .expect(204)
    await as(learner)
      .put(`/attempts/${attempt.id}/answers/${second!.id}`, { choice: 1 })
      .expect(204)
    // Someone else's attempt does not exist for them
    await as(other).get(`/attempts/${attempt.id}`).expect(404)

    const submitted = (
      await as(learner).post(`/attempts/${attempt.id}/submit`).expect(200)
    ).body as Attempt
    const expected = submitted.questions.filter(
      (q, i) => (i === 0 && q.answer === 0) || (i === 1 && q.answer === 1),
    ).length
    expect(submitted.submittedAt).not.toBeNull()
    expect(submitted.correct).toBe(expected)
    expect(submitted.scores).toEqual({ R: { correct: expected, total: 3 } })
    expect(submitted.questions[2]).toMatchObject({ correct: false })
    expect(submitted.questions[0]).toHaveProperty('explanationVi')

    await as(learner)
      .put(`/attempts/${attempt.id}/answers/${first!.id}`, { choice: 1 })
      .expect(409)

    const mistakes = (await as(learner).get('/mistakes/TOEIC_LR').expect(200))
      .body as Question[]
    expect(mistakes).toHaveLength(3 - expected)

    const retry = await as(learner)
      .post('/attempts', { exam: 'TOEIC_LR', part: 'P5', source: 'MISTAKES' })
      .expect(201)
    expect((retry.body as Attempt).total).toBe(3 - expected)
  })

  it('places a learner with a short test of every part and starts the roadmap', async () => {
    const before = (await as(other).get('/roadmap/TOEIC_LR').expect(200))
      .body as Roadmap
    expect(before).toMatchObject({ target: 650, estimate: null })
    expect(before.stages[0]).toMatchObject({
      id: 'foundation',
      status: 'current',
    })

    const placement = (
      await as(other)
        .post('/attempts', { exam: 'TOEIC_LR', placement: true })
        .expect(201)
    ).body as Attempt & { mode: string; parts: string[]; timeLimitSec: number }
    expect(placement.mode).toBe('PLACEMENT')
    // No Part 1 sample: every other part, a few questions each
    expect(placement.parts).toEqual(['P2', 'P3', 'P4', 'P5', 'P6', 'P7'])
    expect(placement.total).toBeGreaterThanOrEqual(20)
    expect(placement.timeLimitSec).toBeGreaterThan(0)

    for (const q of placement.questions)
      await as(other)
        .put(`/attempts/${placement.id}/answers/${q.id}`, { choice: 0 })
        .expect(204)
    const graded = (
      await as(other).post(`/attempts/${placement.id}/submit`).expect(200)
    ).body as { scores: Record<string, { scaled?: number }> }
    expect(graded.scores.L?.scaled).toBeGreaterThanOrEqual(5)
    expect(graded.scores.R?.scaled).toBeGreaterThanOrEqual(5)

    const after = (await as(other).get('/roadmap/TOEIC_LR').expect(200))
      .body as Roadmap
    expect(after.estimate).toBe(
      graded.scores.L!.scaled! + graded.scores.R!.scaled!,
    )
    expect(after.stages[0]!.tasks[0]).toMatchObject({
      kind: 'placement',
      done: true,
    })
  })

  it('reviews vocabulary with FSRS and counts it on the dashboard', async () => {
    await as(learner)
      .put('/goals/TOEIC_LR', { newCardsPerDay: 5, targetScore: 650 })
      .expect(200)
    const queue = (await as(learner).get('/review?exam=TOEIC_LR').expect(200))
      .body as {
      cards: { id: string; isNew: boolean }[]
    }
    expect(queue.cards).toHaveLength(5)
    expect(queue.cards.every((c) => c.isNew)).toBe(true)

    const reviewed = await as(learner)
      .post(`/cards/${queue.cards[0]!.id}/review`, { rating: 3 })
      .expect(200)
    expect(reviewed.body).toMatchObject({ reps: 1 })
    await as(learner)
      .post(`/cards/${queue.cards[1]!.id}/review`, { rating: 5 })
      .expect(400)

    const dashboard = (await as(learner).get('/dashboard/TOEIC_LR').expect(200))
      .body as {
      goal: { targetScore: number }
      review: { new: number }
      totals: { attempts: number; answered: number }
      streak: number
    }
    expect(dashboard).toMatchObject({
      goal: { targetScore: 650 },
      review: { new: 4 },
      totals: { attempts: 1, answered: 3 },
      streak: 1,
    })
  })
})
