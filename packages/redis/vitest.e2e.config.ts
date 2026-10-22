import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    // Real Redis (pnpm infra:up)
    test: {
      env: { REDIS_URL: process.env.REDIS_URL ?? 'redis://127.0.0.1:6379' },
    },
  }),
)
