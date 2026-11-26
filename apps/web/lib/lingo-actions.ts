'use server'

// Writes of Lingo. Callers toast the outcome and invalidate `lingoKeys` (see use-lingo-actions).
import type {
  LingoBatch,
  LingoChat,
  LingoLesson,
  LingoLessonModule,
  LingoTest,
} from '@repo/types'

import { run } from '@/lib/action-result'
import { apiFetch } from '@/lib/api'
import type { Attempt, ImportResult } from '@/lib/queries/lingo'

const post = <T>(path: string, body?: unknown, method = 'POST') =>
  apiFetch<T>(path, {
    method,
    ...(body !== undefined && { body: JSON.stringify(body) }),
  })

export async function startAttempt(input: {
  exam: string
  /** Quick practice of one part */
  part?: string
  count?: number
  difficulty?: string
  source?: 'NEW' | 'MISTAKES'
  /** Quick practice: only questions of this skill (a lesson's practice) */
  skillTag?: string
  /** (Parts of) a published test */
  testId?: string
  mode?: 'PRACTICE' | 'FULL_TEST'
  parts?: string[]
  timeLimitSec?: number
  /** The placement test (every part, a few questions each) */
  placement?: boolean
}) {
  return run(() => post<Attempt>('/lingo/attempts', input))
}

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  input: { choice?: number | null; timeMs?: number; flagged?: boolean },
) {
  return run(() =>
    post<null>(
      `/lingo/attempts/${encodeURIComponent(attemptId)}/answers/${encodeURIComponent(questionId)}`,
      input,
      'PUT',
    ),
  )
}

export async function submitAttempt(attemptId: string) {
  return run(() =>
    post<Attempt>(`/lingo/attempts/${encodeURIComponent(attemptId)}/submit`),
  )
}

/** "Học từ mở rộng": a card's related words become cards of the learner's own deck */
export async function learnExtensions(cardId: string) {
  return run(() =>
    post<{ deckId: string; added: number; known: number }>(
      `/lingo/cards/${encodeURIComponent(cardId)}/extensions`,
    ),
  )
}

export async function reviewCard(cardId: string, rating: 1 | 2 | 3 | 4) {
  return run(() =>
    post<unknown>(`/lingo/cards/${encodeURIComponent(cardId)}/review`, {
      rating,
    }),
  )
}

/** "Đã biết": the card leaves the learner's review list */
export async function markCardKnown(cardId: string) {
  return run(() =>
    post<unknown>(`/lingo/cards/${encodeURIComponent(cardId)}/known`),
  )
}

export async function updateGoal(
  exam: string,
  input: {
    targetScore?: number | null
    examDate?: string | null
    newCardsPerDay?: number
  },
) {
  return run(() =>
    post<unknown>(`/lingo/goals/${encodeURIComponent(exam)}`, input, 'PUT'),
  )
}

// ─── Admin ──────────────────────────────────────────────────────────────────

export async function importItems(input: {
  exam: string
  part: string
  items: unknown[]
  fileName?: string
}) {
  return run(() => post<ImportResult>('/lingo/admin/items/import', input))
}

export async function setItemStatus(ids: string[], status: string) {
  return run(() =>
    post<{ updated: number }>('/lingo/admin/items/status', { ids, status }),
  )
}

export async function createDeck(input: {
  exam?: string
  title: string
  language: string
}) {
  return run(() => post<{ id: string }>('/lingo/admin/decks', input))
}

export async function importCards(
  deckId: string,
  csv: string,
  fileName?: string,
) {
  return run(() =>
    post<ImportResult>(
      `/lingo/admin/decks/${encodeURIComponent(deckId)}/import`,
      { csv, fileName },
    ),
  )
}

export async function loadSamples() {
  return run(() =>
    post<{ items: ImportResult; cards: ImportResult }>('/lingo/admin/samples'),
  )
}

// ─── Admin: tests and AI ────────────────────────────────────────────────────

type Kind = 'FULL' | 'MINI'
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export async function assembleTest(input: {
  exam: string
  kind: Kind
  title: string
  description?: string
}) {
  return run(() =>
    post<{ test: LingoTest; shortfall: Record<string, number> }>(
      '/lingo/admin/tests',
      input,
    ),
  )
}

export async function setTestStatus(id: string, status: string) {
  return run(() =>
    post<LingoTest>(`/lingo/admin/tests/${encodeURIComponent(id)}/status`, {
      status,
    }),
  )
}

export async function deleteTest(id: string) {
  return run(() =>
    post<null>(
      `/lingo/admin/tests/${encodeURIComponent(id)}`,
      undefined,
      'DELETE',
    ),
  )
}

export async function setItemImage(id: string, key: string) {
  return run(() =>
    post<unknown>(
      `/lingo/admin/items/${encodeURIComponent(id)}/image`,
      { key },
      'PUT',
    ),
  )
}

export async function generateItems(input: {
  exam: string
  part: string
  count: number
  difficulty: Difficulty
  topic?: string
  selfCheck?: boolean
}) {
  return run(() => post<LingoBatch>('/lingo/admin/generate/items', input))
}

export async function generateTest(input: {
  exam: string
  kind: Kind
  difficulty: Difficulty
  title: string
  topic?: string
  selfCheck?: boolean
}) {
  return run(() => post<LingoBatch>('/lingo/admin/generate/test', input))
}

export async function generateCards(deckId: string, terms: string[]) {
  return run(() =>
    post<ImportResult>(
      `/lingo/admin/decks/${encodeURIComponent(deckId)}/generate`,
      {
        terms,
      },
    ),
  )
}

// ─── AI tutor chat (questions stream from the browser: lib/lingo-chat.ts) ───

export async function createChat() {
  return run(() => post<LingoChat>('/lingo/chats'))
}

export async function deleteChat(id: string) {
  return run(() =>
    post<null>(`/lingo/chats/${encodeURIComponent(id)}`, undefined, 'DELETE'),
  )
}

// ─── Admin: course (lesson modules and lessons) ─────────────────────────────

export interface LessonModuleInput {
  exam: string
  slug: string
  title: string
  description?: string
  order?: number
}

export interface LessonInput {
  moduleId: string
  slug: string
  title: string
  summary?: string
  /** Markdown (GFM) */
  content?: string
  keyPoints?: string[]
  parts?: string[]
  minutes?: number
  practicePart?: string | null
  practiceSkillTag?: string | null
  order?: number
  status?: 'DRAFT' | 'PUBLISHED'
}

export async function saveLessonModule(
  id: string | null,
  input: LessonModuleInput,
) {
  return run(() =>
    id
      ? post<LingoLessonModule>(
          `/lingo/admin/lesson-modules/${encodeURIComponent(id)}`,
          input,
          'PUT',
        )
      : post<LingoLessonModule>('/lingo/admin/lesson-modules', input),
  )
}

export async function deleteLessonModule(id: string) {
  return run(() =>
    post<null>(
      `/lingo/admin/lesson-modules/${encodeURIComponent(id)}`,
      undefined,
      'DELETE',
    ),
  )
}

export async function saveLesson(id: string | null, input: LessonInput) {
  return run(() =>
    id
      ? post<LingoLesson>(
          `/lingo/admin/lessons/${encodeURIComponent(id)}`,
          input,
          'PUT',
        )
      : post<LingoLesson>('/lingo/admin/lessons', input),
  )
}

export async function deleteLesson(id: string) {
  return run(() =>
    post<null>(
      `/lingo/admin/lessons/${encodeURIComponent(id)}`,
      undefined,
      'DELETE',
    ),
  )
}
