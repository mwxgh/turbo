import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import { testDatabaseUrl } from './database-url.js'

/** Create the test database if needed and apply all migrations (once per run). */
export default function setup() {
  const dbDir = fileURLToPath(new URL('../../../packages/db', import.meta.url))
  execFileSync('node_modules/.bin/prisma', ['migrate', 'deploy'], {
    cwd: dbDir,
    stdio: 'pipe',
    env: {
      ...process.env,
      DATABASE_URL: testDatabaseUrl(),
      PRISMA_HIDE_UPDATE_MESSAGE: '1',
    },
  })
}
