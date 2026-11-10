import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import { testRedisUrl } from '@repo/vitest-config/test-env'

export default mergeConfig(
  nestE2eConfig,
  // Real local Redis (pnpm infra:up), logical database 15
  defineConfig({ test: { env: { REDIS_URL: testRedisUrl() } } }),
)
