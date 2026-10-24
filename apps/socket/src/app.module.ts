import { Module } from '@nestjs/common'

import { RedisModule } from '@repo/redis'

import { ChatModule } from './chat/chat.module'
import { env } from './config/env'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    HealthModule,
    ChatModule,
  ],
})
export class AppModule {}
