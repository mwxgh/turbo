import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { PrismaService } from '@repo/db/nest'
import { AccessTokens } from '@repo/nest-common/auth'

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
  plan: {
    start: string | null
    currentWeek: number | null
    weeks: { week: number; status: string }[]
  }
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
    // A system deck of an earlier release: its card moves into the curriculum (same id)
    const legacy = await prisma.lingoDeck.create({
      data: {
        exam: 'TOEIC_LR',
        title: 'TOEIC 01 · Văn phòng & cuộc họp',
        language: 'en',
        cards: { create: { term: 'attend', meaningVi: 'tham dự' } },
      },
      include: { cards: true },
    })
    const first = await as(admin).post('/admin/samples').expect(200)
    expect(first.body).toMatchObject({
      items: { succeeded: 606, failed: 0 },
      // One card per term in 48 topic decks
      cards: { succeeded: 1425, duplicates: 1, failed: 0, decks: 48 },
    })
    const moved = await prisma.lingoCard.findUniqueOrThrow({
      where: { id: legacy.cards[0]!.id },
      include: { deck: true },
    })
    expect(moved.deck.title).toMatch(/^Bài \d\d · /)
    expect(
      await prisma.lingoDeck.findUnique({ where: { id: legacy.id } }),
    ).toBeNull()
    const library = (await as(learner).get('/exams/TOEIC_LR/tests').expect(200))
      .body as { items: { id: string; title: string; questions: number }[] }
    // …and the published sample tests, each made once
    expect(library.items.map((t) => [t.title, t.questions]).sort()).toEqual([
      ['Lingo Full Test 01', 194],
      ['Lingo Full Test 02', 194],
      ['Lingo Full Test 03', 194],
      ['Lingo Full Test 04', 194],
      ['Lingo Full Test 05', 194],
      ['Lingo Mini Test 01', 93],
      ['Lingo Mini Test 02', 93],
      ['Đề mẫu Lingo 01', 40],
    ])
    const again = await as(admin).post('/admin/samples').expect(200)
    expect(again.body).toMatchObject({
      items: { succeeded: 0, duplicates: 606 },
      cards: { succeeded: 0, duplicates: 1426 },
    })
    const exam = await as(learner).get('/exams/TOEIC_LR').expect(200)
    const parts = (
      exam.body as {
        sections: { parts: { code: string; published: number }[] }[]
      }
    ).sections.flatMap((s) => s.parts)
    expect(parts.find((p) => p.code === 'P5')?.published).toBe(192)
  })

  it('serves the course and practises one lesson’s skill', async () => {
    const course = (await as(learner).get('/lessons/TOEIC_LR').expect(200))
      .body as { modules: { id: string; lessons: { id: string }[] }[] }
    expect(course.modules.map((m) => m.id)).toEqual([
      'grammar',
      'vocab',
      'listening',
      'reading',
      'strategy',
    ])
    expect(course.modules.flatMap((m) => m.lessons)).toHaveLength(26)

    const lesson = (
      await as(learner).get('/lessons/TOEIC_LR/word-form').expect(200)
    ).body as {
      sections: unknown[]
      practice: { part: string; skillTag: string }
      progress: { answered: number } | null
      previous: unknown
      next: { id: string }
    }
    expect(lesson.sections.length).toBeGreaterThan(1)
    expect(lesson.practice).toEqual({
      part: 'P5',
      skillTag: 'grammar.word-form',
    })
    expect(lesson).toMatchObject({ previous: null, next: { id: 'verb-tense' } })
    await as(learner).get('/lessons/TOEIC_LR/nope').expect(404)

    const quick = (
      await as(learner)
        .post('/attempts', {
          exam: 'TOEIC_LR',
          part: 'P5',
          skillTag: 'grammar.word-form',
          count: 5,
        })
        .expect(201)
    ).body as Attempt
    expect(quick.total).toBeGreaterThan(0)
    const tagged = await prisma.lingoQuestion.findMany({
      where: { id: { in: quick.questions.map((q) => q.id) } },
      select: { skillTags: true, item: { select: { questions: true } } },
    })
    // Every item drawn has a word-form question
    expect(
      tagged.every((q) =>
        q.item.questions.some((x) => x.skillTags.includes('grammar.word-form')),
      ),
    ).toBe(true)
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
    // The 12-week plan starts with the placement test
    expect(before.plan).toMatchObject({ start: null, currentWeek: null })
    expect(before.plan.weeks).toHaveLength(12)

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
    expect(after.plan.currentWeek).toBe(1)
    expect(after.plan.weeks[0]).toMatchObject({ week: 1, status: 'current' })
    expect(Date.parse(after.plan.start!)).toBeLessThanOrEqual(Date.now())
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

  it('learns the "từ mở rộng" of a card in the learner\'s own deck', async () => {
    const card = await prisma.lingoCard.findFirstOrThrow({
      where: { term: 'accept', deck: { ownerId: null } },
    })
    // Book and handout extensions of "accept", merged
    const words = (card.extensions as { term?: string }[]).filter(
      (e) => e.term,
    ).length
    expect(words).toBeGreaterThan(2)
    const first = await as(learner)
      .post(`/cards/${card.id}/extensions`)
      .expect(200)
    expect(first.body).toMatchObject({ added: words, known: 0 })
    const again = await as(learner)
      .post(`/cards/${card.id}/extensions`)
      .expect(200)
    expect(again.body).toMatchObject({ added: 0, known: words })

    const decks = (await as(learner).get('/decks?exam=TOEIC_LR').expect(200))
      .body as { title: string; ownerId: string | null; cards: number }[]
    expect(decks).toContainEqual(
      expect.objectContaining({ title: 'Từ mở rộng của tôi', cards: words }),
    )
    // Only the learner sees it
    const others = (await as(other).get('/decks?exam=TOEIC_LR').expect(200))
      .body as { title: string }[]
    expect(others.map((d) => d.title)).not.toContain('Từ mở rộng của tôi')
  })

  it('searches cards in Elasticsearch: accents optional, typos, own decks private', async () => {
    const search = async (auth: string, q: string) =>
      (
        await as(auth)
          .get(`/cards/search?exam=TOEIC_LR&q=${encodeURIComponent(q)}`)
          .expect(200)
      ).body as {
        engine: string
        items: { term: string; meaningVi: string; deckTitle: string }[]
      }

    const exact = await search(learner, 'contract')
    expect(exact.engine).toBe('elasticsearch')
    expect(exact.items[0]).toMatchObject({ term: 'contract' })
    // Vietnamese without accents: cards meaning "hợp đồng" come first
    const vi = (await search(learner, 'hop dong')).items
    expect(vi[0]?.meaningVi).toContain('hợp đồng')
    expect(vi.slice(0, 5).map((i) => i.term)).toContain('contract')
    // A typo
    const typo = (await search(learner, 'contrct')).items
    expect(typo.slice(0, 3).map((i) => i.term)).toContain('contract')
    // "accept responsibilities for" is in the learner's own deck (từ mở rộng above)
    const own = (await search(learner, 'accept responsibilities')).items
    expect(own).toContainEqual(
      expect.objectContaining({ deckTitle: 'Từ mở rộng của tôi' }),
    )
    const others = (await search(other, 'accept responsibilities')).items
    expect(others.map((i) => i.deckTitle)).not.toContain('Từ mở rộng của tôi')

    await as(learner).get('/cards/search?q=').expect(400)
  })

  it('"Đã biết" takes a card out of the review list for good', async () => {
    const queue = (await as(other).get('/review?exam=TOEIC_LR').expect(200))
      .body as { newPerDay: number; cards: { id: string; isNew: boolean }[] }
    expect(queue.newPerDay).toBe(20)
    const card = queue.cards.find((c) => c.isNew)!

    await as(other).post(`/cards/${card.id}/known`).expect(200)

    const after = (await as(other).get('/review?exam=TOEIC_LR').expect(200))
      .body as { cards: { id: string }[] }
    expect(after.cards.map((c) => c.id)).not.toContain(card.id)
    // Only "other" has seen this card since the first queue
    const states = await prisma.lingoCardState.findMany({
      where: { cardId: card.id },
      orderBy: { createdAt: 'desc' },
    })
    const state = states[0]!
    expect(state.state).toBe(2) // Review: counts as learned
    expect(state.due.getTime()).toBeGreaterThan(Date.now() + 3_650 * 86_400_000)

    await as(other).post(`/cards/${randomUUID()}/known`).expect(404)
  })
})
