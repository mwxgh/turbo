import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import { testElasticsearchUrl } from '@repo/vitest-config/test-env'

export default mergeConfig(
  nestE2eConfig,
  // Real local Elasticsearch (pnpm infra:up)
  defineConfig({
    test: { env: { ELASTICSEARCH_URL: testElasticsearchUrl() } },
  }),
)
