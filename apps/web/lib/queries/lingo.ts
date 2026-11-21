import { queryOptions } from '@tanstack/react-query'

import type {
  LingoBatch,
  LingoCard,
  LingoChat,
  LingoChatMessage,
  LingoDeck,
  LingoItem,
  LingoQuestion,
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

export interface AttemptQuestion {
  id: string
  order: number
  type: string
  part: string
  passage: string | null
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
}

export interface Attempt {
  id: string
  exam: string
  mode: string
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
  adminItems: (query: ListQuery) =>
    [...lingoKeys.all, 'admin', 'items', query] as const,
  batches: () => [...lingoKeys.all, 'admin', 'batches'] as const,
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
