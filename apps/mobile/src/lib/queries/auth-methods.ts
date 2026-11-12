import { queryOptions } from '@tanstack/react-query'

import type { AuthMethods } from '@repo/types'

import { apiFetch } from '../api'

/** GET /auth/methods: enabled providers and whether sign-up is open. */
export const authMethodsQueryOptions = () =>
  queryOptions({
    queryKey: ['auth', 'methods'],
    queryFn: () => apiFetch<AuthMethods>('/auth/methods'),
    staleTime: 5 * 60_000,
  })
