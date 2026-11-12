import { defineConfig, devices } from '@playwright/test'

import { API_URL, AUTH_FILE, SOCKET_URL, WEB_URL } from './tests/support.js'

/**
 * Browser end-to-end tests for web + api + socket.
 *
 * Local targets: Playwright starts the built apps itself – api / socket with
 * `start:e2e` (apps/<app>/.env.test, never .env) – on free ports 3000 / 3001 /
 * 3002 (stop `pnpm dev` first). Remote targets (E2E_WEB_URL=https://…):
 * the deployed environment is tested as-is.
 *
 * PLAYWRIGHT_CHANNEL=chrome uses the installed Google Chrome instead of the
 * downloaded Chromium (`pnpm --filter e2e install-browsers`).
 */
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(WEB_URL)
const CI = !!process.env.CI

/** Never handed to the apps under test: they read .env.test(.local) instead (see global-setup.ts). */
const SERVICE_VARS = new Set([
  'DATABASE_URL',
  'REDIS_URL',
  'JWT_SECRET',
  'STORAGE_CORE_S3_SERVERS',
  'STORAGE_BUCKET',
  'API_URL',
])

const app = (
  name: string,
  url: string,
  command = `pnpm --filter ${name} start`,
) => ({
  command,
  url,
  // A server already listening may be your dev api on .env (a shared database): refuse to reuse
  // it; stop it first. Ports in use → Playwright fails instead of testing against it.
  reuseExistingServer: false,
  timeout: 120_000,
  stdout: 'ignore' as const,
  stderr: 'pipe' as const,
  env: Object.fromEntries(
    Object.entries(process.env).filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined && !SERVICE_VARS.has(entry[0]),
    ),
  ),
})

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: WEB_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // PLAYWRIGHT_CHANNEL=chrome: installed Chrome instead of Playwright's download (setup project too)
    channel: process.env.PLAYWRIGHT_CHANNEL,
  },
  projects: [
    // Signs in once and saves the cookies for the other tests
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
  ],
  webServer: isLocal
    ? [
        // `start:e2e`: .env.test + .env.test.local, never .env
        // The api first gets its own database, created and migrated (prepare-db.ts, local only)
        app(
          'api',
          `${API_URL}/health`,
          'node prepare-db.ts && pnpm --filter api start:e2e',
        ),
        app(
          'socket',
          `${SOCKET_URL}/socket/health`,
          'pnpm --filter socket start:e2e',
        ),
        app('web', WEB_URL),
      ]
    : undefined,
})
