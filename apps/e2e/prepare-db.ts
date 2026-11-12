import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseEnv } from 'node:util'

import { assertLocalUrl } from '@repo/vitest-config/test-env'

const apiDir = fileURLToPath(new URL('../api/', import.meta.url))
const dbDir = fileURLToPath(new URL('../../packages/db/', import.meta.url))

/** apps/api/.env.test, overridden by .env.test.local – exactly what `start:e2e` loads. */
function apiTestEnv(): Record<string, string | undefined> {
  return ['.env.test', '.env.test.local']
    .map((file) => apiDir + file)
    .filter((path) => existsSync(path))
    .reduce<Record<string, string | undefined>>(
      (env, path) => ({ ...env, ...parseEnv(readFileSync(path, 'utf8')) }),
      {},
    )
}

/**
 * Creates (if needed) and migrates the e2e database. Refuses anything but a local server:
 * the tests register users and write data. E2E_DATABASE_URL_OK=1 accepts a remote one on purpose.
 *
 * Run by Playwright before it starts the api (`node prepare-db.ts && …`, see playwright.config.ts):
 * webServer starts before globalSetup, and the api's health check needs the database.
 */
function prepareDatabase() {
  const url = apiTestEnv().DATABASE_URL
  if (!url) throw new Error('DATABASE_URL missing in apps/api/.env.test')
  assertLocalUrl(
    url,
    'DATABASE_URL (apps/api/.env.test)',
    'E2E_DATABASE_URL_OK',
  )
  execFileSync('node_modules/.bin/prisma', ['migrate', 'deploy'], {
    cwd: dbDir,
    stdio: 'pipe',
    env: {
      ...process.env,
      DATABASE_URL: url,
      PRISMA_HIDE_UPDATE_MESSAGE: '1',
    },
  })
}

prepareDatabase()
