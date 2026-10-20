import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'

import { testDatabaseUrl } from './test/database-url.js'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    test: {
      env: { DATABASE_URL: testDatabaseUrl(), NODE_ENV: 'test' },
      globalSetup: ['./test/global-setup.ts'],
    },
  }),
)
