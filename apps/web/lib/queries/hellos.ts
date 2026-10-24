import { queryOptions } from '@tanstack/react-query'

import type { Hello } from '@repo/types'
import {
  type ListQuery,
  type Paginated,
  listQueryToSearchParams,
} from '@repo/utils'

import { apiFetch } from '../api'

/** Query keys: invalidate `hellosKeys.all` after any hello mutation. */
export const hellosKeys = {
  all: ['hellos'] as const,
  lists: () => [...hellosKeys.all, 'list'] as const,
}

/** One page of GET /hellos – the table (`useListTable`) and the page prefetch share it. */
export const hellosListQueryOptions = (query: ListQuery) =>
  queryOptions({
    queryKey: [...hellosKeys.lists(), query],
    queryFn: () =>
      apiFetch<Paginated<Hello>>(`/hellos?${listQueryToSearchParams(query)}`, {
        cache: 'no-store',
      }),
  })
