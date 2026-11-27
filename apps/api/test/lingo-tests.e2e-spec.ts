import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import type { PrismaService } from '@repo/db/nest'
import { AccessTokens } from '@repo/nest-common/auth'

import { AdminService } from '../src/lingo/admin.service'
import { type ArkMessage, ArkModel } from '../src/lingo/ark-model'
import { lingoContentSchema } from '../src/lingo/content-file'
import { createApp } from './create-app'
import { toeicTestContent } from './lingo-content'

const options = (n: number) =>
  Array.from({ length: n }, (_, i) => `option ${i} ${randomUUID()}`)
const q = (n: number, text = true) => ({
  ...(text && { text: `Question ${randomUUID()}` }),
  options: options(n),
  answer: 0,
  explanationVi: 'Giải thích',
  skillTags: [],
})
let p7Size = 2

/** Valid, unique items of a part, as a model would write them. */
function fakeItem(part: string) {
  const id = randomUUID()
  const base = { difficulty: 'MEDIUM', topic: 'Office' }
  switch (part) {
    case 'P1':
      return {
        ...base,
        scene: `A person at a desk ${id}`,
        questions: [q(4, false)],
      }
    case 'P2':
      return { ...base, accent: 'US', questions: [q(3)] }
    case 'P3':
    case 'P4':
      return {
        ...base,
        transcript: [{ speaker: 'W', accent: 'US', text: `Line ${id}` }],
        questions: [q(4), q(4), q(4)],
      }
    case 'P6':
      return {
        ...base,
        passage: `Text ${id} [1] [2] [3] [4]`,
        questions: [q(4, false), q(4, false), q(4, false), q(4, false)],
      }
    case 'P7':
      p7Size = p7Size === 2 ? 3 : 2
      return {
        ...base,
        passage: `Notice ${id}`,
        questions: Array.from({ length: p7Size }, () => q(4)),
      }
    default:
      return { ...base, questions: [q(4)] }
  }
}

/** Fake BytePlus: items / self-check answers / cards depending on the prompt. */
const model = {
  enabled: true,
  /** Self-check answers 1 instead of 0 for the first item it sees */
  disagree: false,
  calls: 0,
  async *stream() {},
  complete(messages: ArkMessage[]): Promise<string> {
    model.calls++
    const prompt = messages.at(-1)!.content
    if (prompt.startsWith('Solve these')) {
      const tasks = JSON.parse(prompt.split('\n').at(-1)!) as {
        questions: unknown[]
      }[]
      const items = tasks.map((task, i) => ({
        answers: task.questions.map(() => (model.disagree && i === 0 ? 1 : 0)),
      }))
      return Promise.resolve(JSON.stringify({ items }))
    }
    if (prompt.startsWith('Make one card per term')) {
      const terms = JSON.parse(prompt.split('Terms: ')[1]!) as string[]
      return Promise.resolve(
        `<think>easy</think>${JSON.stringify({
          cards: terms.map((term) => ({ term, meaningVi: `nghĩa ${term}` })),
        })}`,
      )
    }
    const [, count, part] = /^Write (\d+) new, different items for (P\d)/.exec(
      prompt,
    )!
    const items = Array.from({ length: Number(count) }, () => fakeItem(part!))
    return Promise.resolve('```json\n' + JSON.stringify({ items }) + '\n```')
  },
}

interface Batch {
  id: string
  status: string
  succeeded: number
  failed: number
}
interface TestSummary {
  id: string
  title: string
  status: string
  questions: number
  parts: { code: string; questions: number }[]
  timeLimitSec: number
}
interface Question {
  id: string
  part: string
  imageUrl: string | null
  transcript: unknown[] | null
}
interface Attempt {
  id: string
  mode: string
  total: number
  timeLimitSec: number | null
  deadline: string | null
  scores: Record<string, { correct: number; total: number; scaled?: number }>
  questions: Question[]
}

describe('Lingo tests and AI generation (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let admin: string
  let learner: string

  async function userToken(role: 'USER' | 'ADMIN') {
    const user = await prisma.user.create({
      data: { email: `tests-${randomUUID()}@test.local`, role },
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

  /** Waits for an AI run to leave RUNNING. */
  async function settled(id: string): Promise<Batch> {
    for (let i = 0; i < 100; i++) {
      const batches = (await as(admin).get('/admin/batches').expect(200))
        .body as Batch[]
      const batch = batches.find((b) => b.id === id)!
      if (batch.status !== 'RUNNING') return batch
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    throw new Error('AI run did not finish')
  }

  beforeAll(async () => {
    ;({ app, prisma } = await createApp((builder) =>
      builder.overrideProvider(ArkModel).useValue(model),
    ))
    await prisma.lingoTest.deleteMany()
    await prisma.lingoAttempt.deleteMany()
    await prisma.lingoItem.deleteMany()
    await prisma.lingoBatch.deleteMany()
    admin = await userToken('ADMIN')
    learner = await userToken('USER')
    const { id: adminId } = await prisma.user.findFirstOrThrow({
      where: { role: 'ADMIN' },
      orderBy: { createdAt: 'desc' },
    })
    await app
      .get(AdminService)
      .importContent(adminId, lingoContentSchema.parse(toeicTestContent()))
  })

  beforeEach(() => {
    model.enabled = true
    model.disagree = false
  })

  afterAll(async () => {
    await app.close()
  })

  it('assembles a test from published items and reports short parts', async () => {
    const res = await as(admin)
      .post('/admin/tests', {
        exam: 'TOEIC_LR',
        kind: 'MINI',
        title: 'Samples mini',
      })
      .expect(201)
    const { test, shortfall } = res.body as {
      test: { id: string; status: string }
      shortfall: Record<string, number>
    }
    expect(test.status).toBe('DRAFT')
    // Test content covers Parts 2–7; Part 1 needs real photos
    expect(shortfall).toEqual({ P1: 3 })

    const detail = (await as(admin).get(`/admin/tests/${test.id}`).expect(200))
      .body as { items: { part: string }[] }
    expect(detail.items.map((i) => i.part)).toEqual(
      [...detail.items.map((i) => i.part)].sort(),
    )
    await as(learner).get(`/tests/${test.id}`).expect(404)
  })

  it('generates items of a part in the background, self-check sends disagreements to review', async () => {
    model.disagree = true
    const started = await as(admin)
      .post('/admin/generate/items', {
        exam: 'TOEIC_LR',
        part: 'P5',
        count: 12,
        difficulty: 'HARD',
        selfCheck: true,
      })
      .expect(202)
    const batch = await settled((started.body as Batch).id)
    expect(batch).toMatchObject({ status: 'DONE', succeeded: 12, failed: 0 })

    const items = await prisma.lingoItem.findMany({
      where: { batchId: batch.id },
    })
    // 2 calls of 10 + 2 items; the first item of each call disagrees
    expect(items.filter((i) => i.status === 'NEEDS_REVIEW')).toHaveLength(2)
    expect(items.filter((i) => i.status === 'DRAFT')).toHaveLength(10)
  })

  it('is unavailable without a model', async () => {
    model.enabled = false
    await as(admin)
      .post('/admin/generate/items', {
        exam: 'TOEIC_LR',
        part: 'P5',
        count: 1,
        difficulty: 'EASY',
      })
      .expect(503)
    await as(learner)
      .post('/admin/generate/test', {
        exam: 'TOEIC_LR',
        kind: 'MINI',
        difficulty: 'EASY',
        title: 'x',
      })
      .expect(403)
  })

  it('generates a whole test, publishes it after review, and runs a timed full test', async () => {
    const started = await as(admin)
      .post('/admin/generate/test', {
        exam: 'TOEIC_LR',
        kind: 'MINI',
        difficulty: 'MEDIUM',
        title: 'AI mini 01',
      })
      .expect(202)
    const batch = await settled((started.body as Batch).id)
    expect(batch.status).toBe('DONE')

    const tests = (
      await as(admin).get('/admin/tests?keyword=AI%20mini%2001').expect(200)
    ).body as { items: TestSummary[] }
    const test = tests.items[0]!
    expect(test.status).toBe('DRAFT')
    expect(test.questions).toBe(3 + 12 + 18 + 15 + 15 + 8 + 25)
    // 48% of each section: 21.6 + 36 min, rounded up
    expect(test.timeLimitSec).toBe(58 * 60)

    // Items are drafts: publishing the test waits for their review
    await as(admin)
      .post(`/admin/tests/${test.id}/status`, { status: 'PUBLISHED' })
      .expect(400)
    const detail = (await as(admin).get(`/admin/tests/${test.id}`).expect(200))
      .body as { items: { id: string; part: string }[] }
    const ids = detail.items.map((i) => i.id)
    // Part 1 needs its photo first
    await as(admin)
      .post('/admin/items/status', { ids, status: 'PUBLISHED' })
      .expect(400)
    for (const item of detail.items.filter((i) => i.part === 'P1'))
      await as(admin)
        .put(`/admin/items/${item.id}/image`, {
          key: 'uploads/2026/11/test/photo.png',
        })
        .expect(200)
    await as(admin)
      .put(`/admin/items/${ids[0]}/image`, { key: '../secret' })
      .expect(400)
    await as(admin)
      .post('/admin/items/status', { ids, status: 'PUBLISHED' })
      .expect(200)
    await as(admin)
      .post(`/admin/tests/${test.id}/status`, { status: 'PUBLISHED' })
      .expect(200)

    const library = (await as(learner).get('/exams/TOEIC_LR/tests').expect(200))
      .body as { items: TestSummary[] }
    expect(library.items.map((t) => t.id)).toContain(test.id)

    const full = (
      await as(learner)
        .post('/attempts', {
          exam: 'TOEIC_LR',
          testId: test.id,
          mode: 'FULL_TEST',
        })
        .expect(201)
    ).body as Attempt
    expect(full).toMatchObject({
      mode: 'FULL_TEST',
      total: 96,
      timeLimitSec: 58 * 60,
    })
    expect(full.deadline).not.toBeNull()
    const photo = full.questions.find((x) => x.part === 'P1')!
    expect(photo.imageUrl).toContain('uploads/2026/11/test/photo.png')
    expect(
      full.questions.find((x) => x.part === 'P3')!.transcript,
    ).toHaveLength(1)

    for (const question of full.questions.slice(0, 20))
      await as(learner)
        .put(`/attempts/${full.id}/answers/${question.id}`, { choice: 0 })
        .expect(204)
    const graded = (
      await as(learner).post(`/attempts/${full.id}/submit`).expect(200)
    ).body as Attempt
    expect(graded.scores.L).toMatchObject({ correct: 20, total: 48 })
    expect(graded.scores.L!.scaled).toBeGreaterThan(5)
    expect(graded.scores.R).toMatchObject({ correct: 0, total: 48, scaled: 5 })

    // Practice: chosen parts, own timer; answers after the deadline are refused
    const practice = (
      await as(learner)
        .post('/attempts', {
          exam: 'TOEIC_LR',
          testId: test.id,
          mode: 'PRACTICE',
          parts: ['P5'],
          timeLimitSec: 60,
        })
        .expect(201)
    ).body as Attempt
    expect(practice).toMatchObject({
      mode: 'PRACTICE',
      total: 15,
      timeLimitSec: 60,
    })
    await prisma.lingoAttempt.update({
      where: { id: practice.id },
      data: { startedAt: new Date(Date.now() - 10 * 60_000) },
    })
    await as(learner)
      .put(`/attempts/${practice.id}/answers/${practice.questions[0]!.id}`, {
        choice: 0,
      })
      .expect(409)

    const view = (await as(learner).get(`/tests/${test.id}`).expect(200))
      .body as TestSummary & { attempts: { id: string }[] }
    expect(view.attempts.map((a) => a.id)).toEqual([full.id])

    // Library counts: the learner's own and everyone's submitted attempts
    const after = (await as(learner).get('/exams/TOEIC_LR/tests').expect(200))
      .body as { items: (TestSummary & { attempts: number; takers: number })[] }
    expect(after.items.find((t) => t.id === test.id)).toMatchObject({
      attempts: 1,
      takers: 1,
    })
    // History names the test
    const history = (
      await as(learner)
        .get(
          `/attempts?filter=${encodeURIComponent(JSON.stringify({ mode: 'FULL_TEST' }))}`,
        )
        .expect(200)
    ).body as { items: { id: string; test: { id: string } | null }[] }
    expect(history.items.find((a) => a.id === full.id)?.test?.id).toBe(test.id)
  })

  it('fills vocabulary cards from terms', async () => {
    const deck = (
      await as(admin)
        .post('/admin/decks', {
          title: `AI deck ${randomUUID()}`,
          language: 'en',
        })
        .expect(201)
    ).body as { id: string }
    const res = await as(admin)
      .post(`/admin/decks/${deck.id}/generate`, {
        terms: ['deadline', 'invoice'],
      })
      .expect(200)
    expect(res.body).toMatchObject({ succeeded: 2, failed: 0 })
  })
})
