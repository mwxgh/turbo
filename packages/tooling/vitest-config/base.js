import { defineConfig } from 'vitest/config'

/**
 * Unit tests: `*.spec.ts` / `*.test.ts` next to the code, Node environment.
 *
 * @type {import('vitest/config').UserConfig}
 */
export const baseConfig = defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{spec,test}.{ts,tsx}', 'src/**/generated/**'],
    },
  },
})
