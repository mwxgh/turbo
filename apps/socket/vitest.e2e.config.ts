import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import { testRedisUrl } from '@repo/vitest-config/test-env'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    test: {
      env: {
        NODE_ENV: 'test',
        LOG_LEVEL: 'silent',
        REDIS_URL: testRedisUrl(),
        // Same secret as the api tests (apps/api/test/auth-env.ts)
        JWT_SECRET: 'test-jwt-secret-at-least-32-characters-long',
      },
    },
  }),
)
