import { queryOptions } from '@tanstack/react-query'

import type {
  LingoAttempt,
  LingoBatch,
  LingoCard,
  LingoChat,
  LingoChatMessage,
  LingoDeck,
  LingoItem,
  LingoQuestion,
  LingoTest,
} from '@repo/types'
import {
  type ListQuery,
  type Paginated,
  listQueryToSearchParams,
} from '@repo/utils'

import { apiFetch } from '@/lib/api'

/** Shapes of the Lingo API (apps/api/src/lingo); models come from @repo/types. */
export interface ExamSummary {
  code: string
  name: string
  language: string
  available: boolean
}

export interface PartInfo {
  code: string
  name: string
  nameVi: string
  count: number
  options: number
  media: ('text' | 'audio' | 'image')[]
  /** Question and options are heard, not printed (TOEIC Part 1, 2) */
  spokenOptions: boolean
  questionsPerItem: [number, number]
  available: boolean
  published: number
}

export interface ExamDetail extends ExamSummary {
  skillTags: Record<string, string>
  difficulties: Record<'EASY' | 'MEDIUM' | 'HARD', string>
  sections: {
    code: string
    name: string
    minutes: number
    scoreMin: number
    scoreMax: number
    parts: PartInfo[]
  }[]
}

export interface Accuracy {
  correct: number
  total: number
  accuracy: number
}

export interface Dashboard {
  goal: {
    targetScore: number | null
    examDate: string | null
    newCardsPerDay: number
  }
  review: { due: number; new: number }
  totals: { attempts: number; answered: number; accuracy: number }
  parts: (Accuracy & { part: string })[]
  weakTags: (Accuracy & { tag: string; label: string })[]
  streak: number
  recentAttempts: {
    id: string
    mode: string
    parts: string[]
    total: number
    correct: number | null
    submittedAt: string
  }[]
}

/** One line of a listening script. */
export interface ScriptLine {
  speaker: 'M' | 'W' | 'M2' | 'W2' | 'N'
  accent?: 'US' | 'GB' | 'AU' | 'CA'
  text: string
}

export interface AttemptQuestion {
  id: string
  order: number
  type: string
  itemId: string
  section: string
  part: string
  passage: string | null
  /** Read aloud by the browser; shown only on the result page */
  transcript: ScriptLine[] | null
  accent: ScriptLine['accent'] | null
  imageUrl: string | null
  text: string | null
  options: string[]
  response: { choice: number } | null
  flagged: boolean
  // Once submitted
  correct?: boolean | null
  answer?: number
  explanationVi?: string
  translationVi?: string | null
  skillTags?: string[]
  difficulty?: string
  topic?: string | null
  scene?: string | null
}

export interface Attempt {
  id: string
  exam: string
  mode: 'QUICK' | 'PRACTICE' | 'FULL_TEST'
  test: { id: string; title: string; kind: 'FULL' | 'MINI' } | null
  timeLimitSec: number | null
  /** startedAt + timeLimitSec; answers after it are refused */
  deadline: string | null
  parts: string[]
  total: number
  correct: number | null
  scores: Record<
    string,
    { correct: number; total: number; scaled?: number }
  > | null
  startedAt: string
  submittedAt: string | null
  questions: AttemptQuestion[]
}

export interface TestPart {
  code: string
  name: string
  nameVi: string
  section: string
  questions: number
  target: number
}

export type TestSummary = Omit<LingoTest, 'items' | 'attempts'> & {
  parts: TestPart[]
  questions: number
  timeLimitSec: number
  /** The learner's submitted attempts */
  attempts: number
  /** Everyone's submitted attempts */
  takers: number
}

export type TestDetail = Omit<TestSummary, 'attempts' | 'takers'> & {
  attempts: Pick<
    Attempt,
    'id' | 'mode' | 'parts' | 'correct' | 'total' | 'scores' | 'submittedAt'
  >[]
}

/** GET /lingo/attempts: one row of the learner's history. */
export type AttemptListItem = Omit<LingoAttempt, 'scores' | 'test'> & {
  scores: Attempt['scores']
  test: Attempt['test']
}

export type AdminTest = Omit<LingoTest, 'items' | 'batch'> & {
  items: AdminItem[]
  batch: Pick<LingoBatch, 'id' | 'status' | 'message'> | null
}

export type DeckWithStats = LingoDeck & {
  cards: number
  started: number
  due: number
  learned: number
}

export type ReviewCard = LingoCard & { isNew: boolean; state: number }

export type AdminItem = LingoItem & { questions: LingoQuestion[] }

export interface ImportResult {
  batchId?: string
  succeeded: number
  duplicates: number
  failed: number
  errors: { line: number; issues: string[] }[]
}

export const lingoKeys = {
  all: ['lingo'] as const,
  exam: (code: string) => [...lingoKeys.all, 'exam', code] as const,
  dashboard: (code: string) => [...lingoKeys.all, 'dashboard', code] as const,
  review: (exam?: string) =>
    [...lingoKeys.all, 'review', exam ?? 'all'] as const,
  decks: (exam?: string) => [...lingoKeys.all, 'decks', exam ?? 'all'] as const,
  mistakes: (code: string) => [...lingoKeys.all, 'mistakes', code] as const,
  attempts: (query: ListQuery) =>
    [...lingoKeys.all, 'attempts', query] as const,
  adminItems: (query: ListQuery) =>
    [...lingoKeys.all, 'admin', 'items', query] as const,
  batches: () => [...lingoKeys.all, 'admin', 'batches'] as const,
  tests: (exam: string, query: ListQuery) =>
    [...lingoKeys.all, 'tests', exam, query] as const,
  test: (id: string) => [...lingoKeys.all, 'test', id] as const,
  adminTests: (query: ListQuery) =>
    [...lingoKeys.all, 'admin', 'tests', query] as const,
  adminTest: (id: string) => [...lingoKeys.all, 'admin', 'test', id] as const,
  chats: () => [...lingoKeys.all, 'chats'] as const,
  chat: (id: string) => [...lingoKeys.all, 'chats', id] as const,
}

const get = <T>(path: string) => apiFetch<T>(path, { cache: 'no-store' })

export const examsQueryOptions = () =>
  queryOptions({
    queryKey: [...lingoKeys.all, 'exams'],
    queryFn: () => get<ExamSummary[]>('/lingo/exams'),
  })

export const examQueryOptions = (code: string) =>
  queryOptions({
    queryKey: lingoKeys.exam(code),
    queryFn: () => get<ExamDetail>(`/lingo/exams/${encodeURIComponent(code)}`),
  })

export const dashboardQueryOptions = (code: string) =>
  queryOptions({
    queryKey: lingoKeys.dashboard(code),
    queryFn: () =>
      get<Dashboard>(`/lingo/dashboard/${encodeURIComponent(code)}`),
  })

export const reviewQueryOptions = (exam?: string) =>
  queryOptions({
    queryKey: lingoKeys.review(exam),
    queryFn: () =>
      get<{ cards: ReviewCard[] }>(
        `/lingo/review${exam ? `?exam=${encodeURIComponent(exam)}` : ''}`,
      ),
    // A session works on a snapshot: refetching mid-session would reshuffle it
    staleTime: Infinity,
  })

export const decksQueryOptions = (exam?: string) =>
  queryOptions({
    queryKey: lingoKeys.decks(exam),
    queryFn: () =>
      get<DeckWithStats[]>(
        `/lingo/decks${exam ? `?exam=${encodeURIComponent(exam)}` : ''}`,
      ),
  })

export const mistakesQueryOptions = (code: string) =>
  queryOptions({
    queryKey: lingoKeys.mistakes(code),
    queryFn: () =>
      get<(AttemptQuestion & { answeredAt: string })[]>(
        `/lingo/mistakes/${encodeURIComponent(code)}`,
      ),
  })

/** The learner's attempts, newest first. */
export const attemptsQueryOptions = (query: ListQuery) =>
  queryOptions({
    queryKey: lingoKeys.attempts(query),
    queryFn: () =>
      get<Paginated<AttemptListItem>>(
        `/lingo/attempts?${listQueryToSearchParams(query).toString()}`,
      ),
  })

export const adminItemsQueryOptions = (query: ListQuery) =>
  queryOptions({
    queryKey: lingoKeys.adminItems(query),
    queryFn: () =>
      get<Paginated<AdminItem>>(
        `/lingo/admin/items?${listQueryToSearchParams(query)}`,
      ),
  })

export const batchesQueryOptions = () =>
  queryOptions({
    queryKey: lingoKeys.batches(),
    queryFn: () =>
      get<
        (LingoBatch & {
          createdBy: { name: string | null; email: string | null }
        })[]
      >('/lingo/admin/batches'),
  })

// ─── Tests ──────────────────────────────────────────────────────────────────

export const testsQueryOptions = (exam: string, query: ListQuery) =>
  queryOptions({
    queryKey: lingoKeys.tests(exam, query),
    queryFn: () =>
      get<Paginated<TestSummary>>(
        `/lingo/exams/${encodeURIComponent(exam)}/tests?${listQueryToSearchParams(query).toString()}`,
      ),
  })

export const testQueryOptions = (id: string) =>
  queryOptions({
    queryKey: lingoKeys.test(id),
    queryFn: () => get<TestDetail>(`/lingo/tests/${encodeURIComponent(id)}`),
  })

export const adminTestsQueryOptions = (query: ListQuery) =>
  queryOptions({
    queryKey: lingoKeys.adminTests(query),
    queryFn: () =>
      get<Paginated<Omit<TestSummary, 'attempts'> & { attempts: number }>>(
        `/lingo/admin/tests?${listQueryToSearchParams(query).toString()}`,
      ),
  })

export const adminTestQueryOptions = (id: string) =>
  queryOptions({
    queryKey: lingoKeys.adminTest(id),
    queryFn: () =>
      get<AdminTest>(`/lingo/admin/tests/${encodeURIComponent(id)}`),
  })

// ─── AI tutor chat ──────────────────────────────────────────────────────────

export type ChatDetail = LingoChat & { messages: LingoChatMessage[] }

/** Newest conversations first (the API default sort). */
export const chatsQueryOptions = () =>
  queryOptions({
    queryKey: lingoKeys.chats(),
    queryFn: () =>
      get<Paginated<LingoChat>>(
        `/lingo/chats?${listQueryToSearchParams({ pageSize: 50 }).toString()}`,
      ),
  })

export const chatQueryOptions = (id: string) =>
  queryOptions({
    queryKey: lingoKeys.chat(id),
    queryFn: () => get<ChatDetail>(`/lingo/chats/${encodeURIComponent(id)}`),
  })
