import { queryOptions } from '@tanstack/react-query'

import type { PlannerTask } from '@repo/types'

import { apiFetch } from '@/lib/api'

/** Query keys: invalidate `plannerKeys.all` after any planner mutation. */
export const plannerKeys = {
  all: ['planner'] as const,
  range: (range: { from: string; to: string }) =>
    [...plannerKeys.all, 'range', range.from, range.to] as const,
}

/** Tasks dated in [from, to] plus the backlog – every planner view and the page prefetch share it. */
export const plannerTasksQueryOptions = (range: { from: string; to: string }) =>
  queryOptions({
    queryKey: plannerKeys.range(range),
    queryFn: () =>
      apiFetch<PlannerTask[]>(`/planner/tasks?${new URLSearchParams(range)}`, {
        cache: 'no-store',
      }),
  })
