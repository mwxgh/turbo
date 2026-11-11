import { type NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIE } from '@repo/utils'

import { serverApiUrl } from '@/lib/env'

/** Pages anyone may open. */
const PUBLIC_PATHS = ['/login']

/**
 * Optimistic auth check before rendering (the api decides for real on every call):
 * - no session → /login?next=…
 * - access token expired but refresh cookie present → refresh now, so Server Components and
 *   Server Actions of this request already send a valid token, and the browser gets new cookies.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasAccess = request.cookies.has(AUTH_COOKIE.Access)
  const hasRefresh = request.cookies.has(AUTH_COOKIE.Refresh)

  if (PUBLIC_PATHS.includes(pathname) || hasAccess) return NextResponse.next()

  const res = hasRefresh
    ? await fetch(`${serverApiUrl}/auth/refresh`, {
        method: 'POST',
        headers: { cookie: request.headers.get('cookie') ?? '' },
        cache: 'no-store',
      }).catch(() => null)
    : null
  const setCookies = res?.headers.getSetCookie() ?? []
  if (res?.ok) return continueWith(request, setCookies)

  const login = new URL('/login', request.url)
  login.searchParams.set('next', `${pathname}${search}`)
  const response = NextResponse.redirect(login)
  // The api cleared the dead cookies (with its own Domain): pass that on
  for (const header of setCookies) response.headers.append('set-cookie', header)
  return response
}

function continueWith(request: NextRequest, setCookies: string[]) {
  // This request continues with the new cookies…
  const cookies = new Map(
    request.cookies.getAll().map((c) => [c.name, c.value]),
  )
  for (const header of setCookies) {
    const [pair = ''] = header.split(';')
    const eq = pair.indexOf('=')
    cookies.set(pair.slice(0, eq), pair.slice(eq + 1))
  }
  const headers = new Headers(request.headers)
  headers.set(
    'cookie',
    [...cookies].map(([name, value]) => `${name}=${value}`).join('; '),
  )
  const response = NextResponse.next({ request: { headers } })
  // …and the browser stores them
  for (const header of setCookies) response.headers.append('set-cookie', header)
  return response
}

export const config = {
  // Pages only: not Next's assets, files with an extension, or prefetch metadata
  matcher: ['/((?!_next/|favicon.ico|.*\\.[\\w]+$).*)'],
}
