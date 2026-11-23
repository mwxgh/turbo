import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import {
  testElasticsearchUrl,
  testRedisUrl,
} from '@repo/vitest-config/test-env'

export default mergeConfig(
  nestE2eConfig,
  // Real local services (pnpm infra:up): Redis logical database 15, Elasticsearch
  defineConfig({
    test: {
      env: {
        REDIS_URL: testRedisUrl(),
        ELASTICSEARCH_URL: testElasticsearchUrl(),
      },
    },
  }),
)
