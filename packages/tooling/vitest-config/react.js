import { defineConfig, mergeConfig } from 'vitest/config'

import { baseConfig } from './base.js'

/**
 * React components / browser code in jsdom. The app adds its own
 * `setupFiles` (jest-dom matchers, cleanup) since those need React.
 */
export const reactConfig = mergeConfig(
  baseConfig,
  defineConfig({
    // Next's tsconfig keeps JSX as-is (`jsx: preserve`); compile it for tests
    oxc: { jsx: { runtime: 'automatic' } },
    // `paths` from the app's tsconfig.json (e.g. web's `@/*`), like Next does
    resolve: { tsconfigPaths: true },
    test: {
      environment: 'jsdom',
      // user-event flows (type, open a date picker…) take ~1s alone but can pass the 5s default
      // while turbo runs every package's tests at once (pre-push hook, a busy laptop)
      testTimeout: 15_000,
      include: [
        'app/**/*.{spec,test}.{ts,tsx}',
        'components/**/*.{spec,test}.{ts,tsx}',
        'lib/**/*.{spec,test}.{ts,tsx}',
        'src/**/*.{spec,test}.{ts,tsx}',
      ],
      coverage: {
        include: [
          'app/**/*.{ts,tsx}',
          'components/**/*.{ts,tsx}',
          'lib/**/*.{ts,tsx}',
          'src/**/*.{ts,tsx}',
        ],
      },
    },
  }),
)
