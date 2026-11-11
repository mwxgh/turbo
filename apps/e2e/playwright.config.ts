import { defineConfig, devices } from '@playwright/test'

import { API_URL, AUTH_FILE, SOCKET_URL, WEB_URL } from './tests/support.js'

/**
 * Browser end-to-end tests for web + api + socket.
 *
 * Local targets: Playwright starts the built apps (`pnpm --filter <app> start`)
 * unless they are already running. Remote targets (E2E_WEB_URL=https://…):
 * the deployed environment is tested as-is.
 *
 * PLAYWRIGHT_CHANNEL=chrome uses the installed Google Chrome instead of the
 * downloaded Chromium (`pnpm --filter e2e install-browsers`).
 */
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(WEB_URL)
const CI = !!process.env.CI

const app = (name: string, url: string) => ({
  command: `pnpm --filter ${name} start`,
  url,
  reuseExistingServer: !CI,
  timeout: 120_000,
  stdout: 'ignore' as const,
  stderr: 'pipe' as const,
  env: {
    ...process.env,
    // Every browser and SSR request comes from localhost: lift the api rate limit
    RATE_LIMIT: '100000',
    // auth.setup.ts registers the test user; the api default is closed and CI has no .env
    AUTH_REGISTRATION: 'open',
  },
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
  },
  projects: [
    // Signs in once and saves the cookies for the other tests
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        channel: process.env.PLAYWRIGHT_CHANNEL,
        storageState: AUTH_FILE,
      },
    },
  ],
  webServer: isLocal
    ? [
        app('api', `${API_URL}/health`),
        app('socket', `${SOCKET_URL}/socket/health`),
        app('web', WEB_URL),
      ]
    : undefined,
})
