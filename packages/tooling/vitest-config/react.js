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
    test: {
      environment: 'jsdom',
      include: [
        'app/**/*.{spec,test}.{ts,tsx}',
        'lib/**/*.{spec,test}.{ts,tsx}',
        'src/**/*.{spec,test}.{ts,tsx}',
      ],
      coverage: {
        include: [
          'app/**/*.{ts,tsx}',
          'lib/**/*.{ts,tsx}',
          'src/**/*.{ts,tsx}',
        ],
      },
    },
  }),
)
