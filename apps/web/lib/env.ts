import { parseAppEnv } from '@repo/utils'

// `NEXT_PUBLIC_*` must be referenced statically so Next.js can inline them in the client bundle.
export const publicEnv = {
  /** dev | stg | prod – baked in at build time; a typo fails the build. */
  appEnv: parseAppEnv(process.env.NEXT_PUBLIC_APP_ENV),
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4001',
}

/** Server-only API base URL; falls back to the public one. */
export const serverApiUrl = process.env.API_URL ?? publicEnv.apiUrl
