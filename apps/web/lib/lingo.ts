import type { User } from '@repo/types'

import { apiFetch } from '@/lib/api'

/** Signed-in user (server only); null when the api cannot be reached. */
export const currentUser = () =>
  apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(() => null)

/** Only TOEIC has content for now; the other exams show on /lingo as "coming soon". */
export const DEFAULT_EXAM = 'TOEIC_LR'

export const percent = (ratio: number) => `${Math.round(ratio * 100)}%`

export const LETTERS = ['A', 'B', 'C', 'D', 'E']

export const RATINGS = [
  { value: 1, label: 'Quên', hint: 'Again', key: '1' },
  { value: 2, label: 'Khó', hint: 'Hard', key: '2' },
  { value: 3, label: 'Được', hint: 'Good', key: '3' },
  { value: 4, label: 'Dễ', hint: 'Easy', key: '4' },
] as const
