import { defineConfig, devices } from '@playwright/test'

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
const WEB_URL = process.env.E2E_WEB_URL ?? 'http://localhost:3000'
const API_URL = process.env.E2E_API_URL ?? 'http://localhost:4000/api'
const SOCKET_URL = process.env.E2E_SOCKET_URL ?? 'http://localhost:4001'
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(WEB_URL)
const CI = !!process.env.CI

const app = (name: string, url: string) => ({
  command: `pnpm --filter ${name} start`,
  url,
  reuseExistingServer: !CI,
  timeout: 120_000,
  stdout: 'ignore' as const,
  stderr: 'pipe' as const,
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
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: process.env.PLAYWRIGHT_CHANNEL,
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
