/** Cookies the api sets for browsers (httpOnly): short-lived access JWT, rotating refresh token. */
export const AUTH_COOKIE = {
  Access: 'access_token',
  Refresh: 'refresh_token',
} as const

/**
 * Native clients (mobile) send `x-auth-transport: token` to get the tokens in the response body
 * (and send them back as `Authorization: Bearer` / `{ refreshToken }`); browsers use the cookies.
 */
export const AUTH_TRANSPORT_HEADER = 'x-auth-transport'
export const AUTH_TRANSPORT_TOKEN = 'token'
