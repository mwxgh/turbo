import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { AuthModule as JwtAuthModule } from '@repo/auth/nest'
import { PrismaModule } from '@repo/db/nest'
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
import { OAuthModule } from './oauth/oauth.module'

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
  ],
})
export class AppModule {}
