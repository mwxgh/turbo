import { infiniteQueryOptions } from '@tanstack/react-query'

import type { Hello } from '@repo/types'
import { type Paginated, listQueryToSearchParams } from '@repo/utils'

import { apiFetch } from '../api'

/** Query keys: invalidate `hellosKeys.all` after any hello mutation. */
export const hellosKeys = {
  all: ['hellos'] as const,
  lists: () => [...hellosKeys.all, 'list'] as const,
}

const HELLOS_PAGE_SIZE = 20

/** GET /hellos page by page, newest first – the list loads more on scroll. */
export const hellosInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: hellosKeys.lists(),
    queryFn: ({ pageParam }) =>
      apiFetch<Paginated<Hello>>(
        `/hellos?${listQueryToSearchParams({ page: pageParam, pageSize: HELLOS_PAGE_SIZE })}`,
      ),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
  })
