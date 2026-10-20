import { defineConfig, mergeConfig } from 'vitest/config'

import { nestConfig } from '@repo/vitest-config/nest'

export default mergeConfig(
  nestConfig,
  defineConfig({
    test: {
      // Unit tests never connect; env.ts only needs a syntactically valid URL.
      env: { DATABASE_URL: 'postgresql://unit:unit@localhost:5432/unit' },
    },
  }),
)
