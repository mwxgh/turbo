import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { PrismaModule } from '@repo/db/nest'
import {
  REDIS,
  type Redis,
  RedisModule,
  RedisThrottlerStorage,
} from '@repo/redis'

import { env } from './env'
import { FilesModule } from './files/files.module'
import { HealthModule } from './health/health.module'
import { HellosModule } from './hellos/hellos.module'

@Module({
  imports: [
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
    HealthModule,
    HellosModule,
    FilesModule,
  ],
})
export class AppModule {}
