import { existsSync } from 'node:fs'

/**
 * Database for e2e tests: TEST_DATABASE_URL, or DATABASE_URL (env or .env)
 * with "_test" appended to the database name – never the dev database itself.
 */
export function testDatabaseUrl(): string {
  if (process.env.TEST_DATABASE_URL) return process.env.TEST_DATABASE_URL
  if (!process.env.DATABASE_URL && existsSync('.env'))
    process.loadEnvFile('.env')
  const base = process.env.DATABASE_URL
  if (!base)
    throw new Error('Set DATABASE_URL or TEST_DATABASE_URL for e2e tests')

  const url = new URL(base)
  const name = url.pathname.slice(1)
  if (!name.endsWith('_test')) url.pathname = `/${name}_test`
  return url.toString()
}
