import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import { testRedisUrl } from '@repo/vitest-config/test-env'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    test: {
      env: { NODE_ENV: 'test', LOG_LEVEL: 'silent', REDIS_URL: testRedisUrl() },
    },
  }),
)
