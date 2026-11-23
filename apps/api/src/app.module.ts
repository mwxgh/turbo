import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { PrismaModule } from '@repo/db/nest'
import { ElasticsearchModule } from '@repo/elasticsearch'
import { AuthModule as JwtAuthModule } from '@repo/nest-common/auth/nest'
import { createLoggerModule } from '@repo/nest-common/logger'
import {
  REDIS,
  type Redis,
  RedisModule,
  RedisThrottlerStorage,
} from '@repo/redis'

import { AuthModule } from './auth/auth.module'
import { env } from './env'
import { FilesModule } from './files/files.module'
import { HealthModule } from './health/health.module'
import { HellosModule } from './hellos/hellos.module'
import { LingoModule } from './lingo/lingo.module'
import { OAuthModule } from './oauth/oauth.module'
import { StudioModule } from './studio/studio.module'

@Module({
  imports: [
    createLoggerModule({
      service: 'api',
      env: env.APP_ENV,
      level: env.LOG_LEVEL,
      format: env.LOG_FORMAT,
      quietPaths: ['/api/health'],
    }),
    PrismaModule.forRoot({ url: env.DATABASE_URL }),
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    // Optional: without it, Lingo card search runs in Postgres
    ...(env.ELASTICSEARCH_URL
      ? [
          ElasticsearchModule.forRoot({
            node: env.ELASTICSEARCH_URL,
            indexPrefix: env.elasticsearchIndexPrefix,
          }),
        ]
      : []),
    // Opt-in per controller: @UseGuards(ThrottlerGuard). Counters shared by all instances through Redis
    ThrottlerModule.forRootAsync({
      inject: [REDIS],
      useFactory: (redis: Redis) => ({
        throttlers: [
          { limit: env.RATE_LIMIT, ttl: env.RATE_LIMIT_TTL_SECONDS * 1000 },
        ],
        storage: new RedisThrottlerStorage(redis),
      }),
    }),
    // Global guard: every route needs a signed-in user unless it is @Public()
    JwtAuthModule.forRoot({
      secret: env.JWT_SECRET,
      accessTtlSeconds: env.ACCESS_TOKEN_TTL_SECONDS,
      accessCookie: env.authCookies.access,
      revocationStore: REDIS,
    }),
    AuthModule,
    OAuthModule,
    HealthModule,
    HellosModule,
    FilesModule,
    StudioModule,
    LingoModule,
  ],
})
export class AppModule {}
