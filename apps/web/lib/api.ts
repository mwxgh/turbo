import { createApiFetch } from '@repo/utils'

import { redirectToLogin, refreshSession } from './auth'
import { publicEnv, serverApiUrl } from './env'

export { ApiError } from '@repo/utils'

const isServer = () => typeof window === 'undefined'

/**
 * Base URL of the NestJS API: internal URL on the server (Server Components,
 * Server Actions), public URL in the browser (TanStack Query).
 */
export const apiBaseUrl = () => (isServer() ? serverApiUrl : publicEnv.apiUrl)

let serverHeaders: (() => Promise<HeadersInit | undefined>) | undefined

/**
 * Server only: headers of the current request to forward (the browser's auth cookies). Registered
 * once by `instrumentation.ts` → `lib/api-server.ts`, which may import `next/headers`.
 */
export function setServerHeaders(get: typeof serverHeaders) {
  serverHeaders = get
}

/**
 * Typed fetch wrapper for the NestJS API (server and browser). Browser: sends the auth cookies,
 * refreshes the session once on a 401, else goes to the login page. Server: forwards the cookies
 * (`proxy.ts` already refreshed an expired access token before rendering).
 */
export const apiFetch = createApiFetch(apiBaseUrl, {
  credentials: 'include',
  headers: () => (isServer() ? serverHeaders?.() : undefined),
  onUnauthorized: async (path) => {
    // Wrong password on /auth/login is a 401 too: let the form show it
    if (isServer() || path.startsWith('/auth/')) return false
    if (await refreshSession()) return true
    redirectToLogin()
    return false
  },
})
