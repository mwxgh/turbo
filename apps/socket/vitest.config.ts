import { defineConfig, mergeConfig } from 'vitest/config'

import { nestConfig } from '@repo/vitest-config/nest'

export default mergeConfig(
  nestConfig,
  // env.ts needs a well-formed secret; unit tests never verify real tokens against the api
  defineConfig({
    test: {
      env: { JWT_SECRET: 'test-jwt-secret-at-least-32-characters-long' },
    },
  }),
)
