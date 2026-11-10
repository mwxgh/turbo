import { createApiFetch } from '@repo/utils'

import { env } from './env'
import { accessToken, refreshSession } from './session'

/**
 * Typed fetch wrapper for the NestJS API: `Authorization: Bearer` from the session; on a 401 the
 * tokens are refreshed once and the request retried (a failed refresh signs out → login screen).
 */
export const apiFetch = createApiFetch(() => env.apiUrl, {
  headers: () => {
    const token = accessToken()
    return token ? { authorization: `Bearer ${token}` } : undefined
  },
  onUnauthorized: (path) =>
    path.startsWith('/auth/') ? Promise.resolve(false) : refreshSession(),
})
