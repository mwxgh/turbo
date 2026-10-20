import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({ test: { env: { NODE_ENV: 'test' } } }),
)
