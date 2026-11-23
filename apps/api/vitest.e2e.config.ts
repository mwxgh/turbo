import { defineConfig, mergeConfig } from 'vitest/config'

import { nestE2eConfig } from '@repo/vitest-config/nest'
import {
  testElasticsearchUrl,
  testRedisUrl,
} from '@repo/vitest-config/test-env'

import { testAuthEnv } from './test/auth-env.js'
import { testDatabaseUrl } from './test/database-url.js'
import { testStorageEnv } from './test/storage-env.js'

export default mergeConfig(
  nestE2eConfig,
  defineConfig({
    test: {
      env: {
        DATABASE_URL: testDatabaseUrl(),
        REDIS_URL: testRedisUrl(),
        // Real local Elasticsearch; own index prefix (the api rebuilds it at start)
        ELASTICSEARCH_URL: testElasticsearchUrl(),
        ELASTICSEARCH_INDEX_PREFIX: 'e2e-',
        NODE_ENV: 'test',
        LOG_LEVEL: 'silent',
        // All requests share one IP; security.e2e-spec.ts checks the headers, not 429s
        RATE_LIMIT: '100000',
        ...testStorageEnv,
        ...testAuthEnv,
      },
      globalSetup: ['./test/global-setup.ts'],
    },
  }),
)
