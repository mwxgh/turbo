import { queryOptions } from '@tanstack/react-query'

import type { HealthResponse } from '@repo/types'

import { apiFetch } from '../api'

export const HEALTH_POLL_MS = 10_000

/** API health, polled from the browser so the status stays live. */
export const healthQueryOptions = () =>
  queryOptions({
    queryKey: ['health'],
    queryFn: () => apiFetch<HealthResponse>('/health', { cache: 'no-store' }),
    refetchInterval: HEALTH_POLL_MS,
    retry: false,
  })
