/**
 * Service URLs for e2e tests. Tests write and delete data, so they never run against a remote
 * server by accident: the dev `.env` may point DATABASE_URL / REDIS_URL at a shared server.
 */

/** localhost, loopback, or a single-label name (Docker / CI service: `postgres`, `redis`). */
export function isLocalHost(hostname) {
  const host = hostname.replace(/^\[|\]$/g, '')
  return (
    host === 'localhost' ||
    host === '::1' ||
    /^127\./.test(host) ||
    !host.includes('.')
  )
}

/** Throws unless `url` is local, or was set explicitly through `explicitVar`. */
export function assertLocalUrl(url, name, explicitVar) {
  if (process.env[explicitVar]) return url
  const { hostname } = new URL(url)
  if (!isLocalHost(hostname))
    throw new Error(
      `e2e tests refuse to use ${name} on "${hostname}" (not local). ` +
        `Start local services (pnpm infra:up) or set ${explicitVar} explicitly.`,
    )
  return url
}

/**
 * Redis for e2e: TEST_REDIS_URL, else REDIS_URL's host when local (default 127.0.0.1:6379),
 * always on logical database 15 so tests never touch dev keys.
 */
export function testRedisUrl() {
  if (process.env.TEST_REDIS_URL) return process.env.TEST_REDIS_URL
  const base = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379'
  const url = new URL(
    isLocalHost(new URL(base).hostname) ? base : 'redis://127.0.0.1:6379',
  )
  url.pathname = '/15'
  return url.toString()
}
