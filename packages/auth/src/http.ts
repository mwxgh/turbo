import { AUTH_COOKIE } from '@repo/utils'

/** `name=value` pairs of a Cookie header (no dependency on cookie-parser). */
export function parseCookies(
  header: string | undefined,
): Record<string, string> {
  const cookies: Record<string, string> = {}
  for (const part of header?.split(';') ?? []) {
    const eq = part.indexOf('=')
    if (eq < 1) continue
    const name = part.slice(0, eq).trim()
    try {
      cookies[name] = decodeURIComponent(part.slice(eq + 1).trim())
    } catch {
      // Malformed value: ignore the cookie
    }
  }
  return cookies
}

/** Access token from `Authorization: Bearer …` (native clients) or the access cookie (browsers). */
export function accessTokenFrom(headers: {
  authorization?: string
  cookie?: string
}): string | undefined {
  const [scheme, token] = headers.authorization?.split(' ') ?? []
  if (scheme?.toLowerCase() === 'bearer' && token) return token
  return parseCookies(headers.cookie)[AUTH_COOKIE.Access] || undefined
}
