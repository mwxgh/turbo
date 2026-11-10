import { publicEnv } from './env'

let refreshing: Promise<boolean> | undefined

/**
 * Browser: rotate the session with the refresh cookie (new cookies come back). Concurrent callers
 * (api calls, the socket) share one request. `false` means the session is over.
 */
export function refreshSession(): Promise<boolean> {
  refreshing ??= fetch(`${publicEnv.apiUrl}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = undefined
    })
  return refreshing
}

/** Only same-site paths (`/x`, never `//evil.com` or `https://…`): no open redirect. */
export function safeNext(next: unknown, fallback = '/'): string {
  return typeof next === 'string' && /^\/(?![/\\])/.test(next) ? next : fallback
}

/** Full page load to the login page, back to the current page afterwards. */
export function redirectToLogin() {
  const next = `${window.location.pathname}${window.location.search}`
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full load drops every cache of the old session
  window.location.assign(`/login?next=${encodeURIComponent(next)}`)
}
