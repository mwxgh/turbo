import { queryOptions } from '@tanstack/react-query'

import { type Paginated, listQueryToSearchParams } from '@repo/utils'

import { apiFetch } from '../api'
import type { Hello } from '../types'

/** Query keys: invalidate `hellosKeys.all` after any hello mutation. */
export const hellosKeys = {
  all: ['hellos'] as const,
  list: () => [...hellosKeys.all, 'list'] as const,
}

/** Up to MAX_PAGE_SIZE newest hellos; the table sorts/filters them client-side. */
export const hellosListQuery = {
  pageSize: 100,
  sortBy: 'createdAt',
  sortDir: 'desc',
} as const

export const hellosListQueryOptions = () =>
  queryOptions({
    queryKey: hellosKeys.list(),
    queryFn: () =>
      apiFetch<Paginated<Hello>>(
        `/hellos?${listQueryToSearchParams(hellosListQuery)}`,
        { cache: 'no-store' },
      ),
  })
