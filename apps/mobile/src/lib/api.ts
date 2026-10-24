import { createApiFetch } from '@repo/utils'

import { env } from './env'

export { ApiError } from '@repo/utils'

/** Typed fetch wrapper for the NestJS API. */
export const apiFetch = createApiFetch(() => env.apiUrl)
