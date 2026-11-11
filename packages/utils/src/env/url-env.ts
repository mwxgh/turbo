import { AppEnv } from './app-env.js'

/** Hosts that only make sense on a developer machine. */
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]'])

export interface UrlEnvOptions {
  /** Environment the value is used in (stg/prod are strict). */
  appEnv: AppEnv
  /** Used when the variable is missing in dev; omit to make it required everywhere. */
  devDefault?: string
  /** Allow localhost on stg/prod (server-internal URLs such as a sidecar). */
  allowLocalhost?: boolean
}

/**
 * Parses a URL env var, failing fast on mistakes that otherwise only show up as
 * broken requests in the deployed app:
 *
 * - dev: missing → `devDefault`
 * - stg / prod: required, and not a local host (a forgotten CI variable must fail the
 *   build instead of baking `http://localhost…` into the client bundle)
 * - always: absolute http(s) URL; a trailing slash is dropped (callers append paths)
 */
export function parseUrlEnv(
  name: string,
  value: string | undefined,
  { appEnv, devDefault, allowLocalhost = false }: UrlEnvOptions,
): string {
  const raw = value?.trim()
  if (!raw) {
    if (appEnv === AppEnv.Dev && devDefault !== undefined) return devDefault
    throw new Error(
      `${name} is required for APP_ENV "${appEnv}" (set it where the app is built or started).`,
    )
  }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new Error(`${name} must be an absolute URL, got "${raw}".`)
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`${name} must use http or https, got "${url.protocol}".`)
  }
  if (
    appEnv !== AppEnv.Dev &&
    !allowLocalhost &&
    LOCAL_HOSTS.has(url.hostname)
  ) {
    throw new Error(
      `${name} points to ${url.hostname} but APP_ENV is "${appEnv}": set the deployed URL.`,
    )
  }
  return raw.replace(/\/+$/, '')
}
