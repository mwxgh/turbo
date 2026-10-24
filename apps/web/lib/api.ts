import { createApiFetch } from '@repo/utils'

import { publicEnv, serverApiUrl } from './env'

export { ApiError } from '@repo/utils'

/**
 * Base URL of the NestJS API: internal URL on the server (Server Components,
 * Server Actions), public URL in the browser (TanStack Query).
 */
export const apiBaseUrl = () =>
  typeof window === 'undefined' ? serverApiUrl : publicEnv.apiUrl

/** Typed fetch wrapper for the NestJS API (server and browser). */
export const apiFetch = createApiFetch(apiBaseUrl)
