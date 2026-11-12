import { existsSync, readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

import { assertLocalUrl } from '@repo/vitest-config/test-env'

/** DATABASE_URL of .env.test, overridden by .env.test.local (never .env: it may be a server). */
function testEnvDatabaseUrl(): string | undefined {
  let url: string | undefined
  for (const file of ['.env.test', '.env.test.local'])
    if (existsSync(file))
      url = parseEnv(readFileSync(file, 'utf8')).DATABASE_URL ?? url
  return url
}

/**
 * Database for e2e tests: TEST_DATABASE_URL, else DATABASE_URL from the process environment (CI
 * sets it for its Postgres service; `.env` is never loaded), else the one of .env.test(.local) –
 * with "_test" appended to the database name (`app_e2e_test` locally: apart from Playwright's
 * `app_e2e`). Never a remote server unless TEST_DATABASE_URL says so.
 */
export function testDatabaseUrl(): string {
  if (process.env.TEST_DATABASE_URL) return process.env.TEST_DATABASE_URL
  const base = process.env.DATABASE_URL ?? testEnvDatabaseUrl()
  if (!base)
    throw new Error('Set DATABASE_URL in .env.test or TEST_DATABASE_URL')

  const url = new URL(base)
  const name = url.pathname.slice(1)
  if (!name.endsWith('_test')) url.pathname = `/${name}_test`
  return assertLocalUrl(url.toString(), 'DATABASE_URL', 'TEST_DATABASE_URL')
}
