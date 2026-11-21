import type { User } from '@repo/types'

import { apiFetch } from '@/lib/api'

/** Signed-in user (server only); null when the api cannot be reached. */
export const currentUser = () =>
  apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(() => null)

/** Only TOEIC has content for now; the other exams show on /lingo as "coming soon". */
export const DEFAULT_EXAM = 'TOEIC_LR'

/** The exam room (open attempt) and the result page (submitted). */
export const takeHref = (attemptId: string) =>
  `/lingo/attempts/${encodeURIComponent(attemptId)}/take` as const
export const resultHref = (attemptId: string) =>
  `/lingo/attempts/${encodeURIComponent(attemptId)}` as const

/** Time spent: "42 phút", "1 giờ 5 phút", "35 giây". */
export function duration(ms: number) {
  const minutes = Math.round(ms / 60_000)
  if (minutes < 1) return `${Math.max(0, Math.round(ms / 1000))} giây`
  const h = Math.floor(minutes / 60)
  return h ? `${h} giờ ${minutes % 60} phút` : `${minutes} phút`
}

export const partLabel = (code: string) => code.replace('P', 'Part ')

/** Sum of the scaled section scores (TOEIC 10–990), null outside a full test. */
export function scaledTotal(
  scores: Record<string, { scaled?: number }> | null,
): number | null {
  const scaled = Object.values(scores ?? {}).map((s) => s.scaled)
  if (!scaled.length) return null
  let total = 0
  for (const s of scaled) {
    if (s === undefined) return null
    total += s
  }
  return total
}

export const percent = (ratio: number) => `${Math.round(ratio * 100)}%`

export const LETTERS = ['A', 'B', 'C', 'D', 'E']

export const RATINGS = [
  { value: 1, label: 'Quên', hint: 'Again', key: '1' },
  { value: 2, label: 'Khó', hint: 'Hard', key: '2' },
  { value: 3, label: 'Được', hint: 'Good', key: '3' },
  { value: 4, label: 'Dễ', hint: 'Easy', key: '4' },
] as const
