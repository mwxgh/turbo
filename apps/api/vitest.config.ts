import { defineConfig, mergeConfig } from 'vitest/config'

import { nestConfig } from '@repo/vitest-config/nest'

import { testStorageEnv } from './test/storage-env.js'

export default mergeConfig(
  nestConfig,
  defineConfig({
    test: {
      // Unit tests never connect; env.ts only needs well-formed values.
      env: {
        DATABASE_URL: 'postgresql://unit:unit@localhost:5432/unit',
        ...testStorageEnv,
      },
    },
  }),
)
