import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'

import { testDatabaseUrl } from './test/database-url.js'
import { testStorageEnv } from './test/storage-env.js'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    test: {
      env: {
        DATABASE_URL: testDatabaseUrl(),
        NODE_ENV: 'test',
        // All requests share one IP; security.e2e-spec.ts checks the headers, not 429s
        RATE_LIMIT: '100000',
        ...testStorageEnv,
      },
      globalSetup: ['./test/global-setup.ts'],
    },
  }),
)
