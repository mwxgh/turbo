import type { CookieOptions, Request, Response } from 'express'

import { parseCookies } from '@repo/auth'
import { AUTH_TRANSPORT_HEADER, AUTH_TRANSPORT_TOKEN } from '@repo/utils'

import { env } from '../env'
import type { ClientMeta, IssuedSession } from './auth.service'

/** Options of every auth cookie (httpOnly, path `/` so the web server's proxy can refresh too). */
export function cookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.cookieSecure,
    domain: env.COOKIE_DOMAIN || undefined,
    path: '/',
  }
}

/** Who is signing in (stored on the session). */
export const clientMeta = (req: Request): ClientMeta => ({
  ip: req.ip,
  userAgent: req.get('user-agent'),
})

/** Browsers: both tokens as httpOnly cookies. */
export function setSessionCookies(res: Response, session: IssuedSession) {
  res.cookie(env.authCookies.access, session.accessToken, {
    ...cookieOptions(),
    maxAge: session.expiresIn * 1000,
  })
  res.cookie(env.authCookies.refresh, session.refreshToken, {
    ...cookieOptions(),
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 86_400_000,
  })
}

export function clearSessionCookies(res: Response) {
  res.clearCookie(env.authCookies.access, cookieOptions())
  res.clearCookie(env.authCookies.refresh, cookieOptions())
}

/**
 * Body shape: `AuthResponse` from @repo/types. Native clients (`x-auth-transport: token`) get the
 * tokens in the body, browsers as cookies.
 */
export function sendSession(
  req: Request,
  res: Response,
  session: IssuedSession,
) {
  const { user, accessToken, refreshToken, expiresIn } = session
  if (req.get(AUTH_TRANSPORT_HEADER) === AUTH_TRANSPORT_TOKEN)
    return { user, expiresIn, accessToken, refreshToken }
  setSessionCookies(res, session)
  return { user, expiresIn }
}

/** Refresh token from the body (native clients) or the refresh cookie (browsers). */
export const refreshTokenOf = (req: Request, bodyToken?: string) =>
  bodyToken ?? parseCookies(req.headers.cookie)[env.authCookies.refresh]
