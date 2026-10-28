import { createApiFetch } from '@repo/utils'

import { env } from './env'

/** Typed fetch wrapper for the NestJS API. */
export const apiFetch = createApiFetch(() => env.apiUrl)
