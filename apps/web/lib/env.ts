import { authCookieNames, parseAppEnv, parseUrlEnv } from '@repo/utils'

// `NEXT_PUBLIC_*` must be referenced statically so Next.js can inline them in the client bundle.
// Invalid values throw while `next build` collects page data, so a bad image is never built.
const appEnv = parseAppEnv(process.env.NEXT_PUBLIC_APP_ENV)

export const publicEnv = {
  /** dev | stg | prod – baked in at build time; a typo fails the build. */
  appEnv,
  /** Required on stg/prod (CI variable PUBLIC_API_URL); dev falls back to localhost. */
  apiUrl: parseUrlEnv('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL, {
    appEnv,
    devDefault: 'http://localhost:3001/api',
  }),
  /** Required on stg/prod (CI variable PUBLIC_SOCKET_URL); dev falls back to localhost. */
  socketUrl: parseUrlEnv(
    'NEXT_PUBLIC_SOCKET_URL',
    process.env.NEXT_PUBLIC_SOCKET_URL,
    { appEnv, devDefault: 'http://localhost:3002' },
  ),
}

/** Auth cookie names the api sets in this environment (`stg_access_token`…, plain on prod). */
export const authCookies = authCookieNames(appEnv)

/** Server-only API base URL (in-cluster address, may be local); falls back to the public one. */
export const serverApiUrl = process.env.API_URL
  ? parseUrlEnv('API_URL', process.env.API_URL, {
      appEnv,
      allowLocalhost: true,
    })
  : publicEnv.apiUrl
