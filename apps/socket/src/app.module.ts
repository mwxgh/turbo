import { Module } from '@nestjs/common'

import { RedisModule } from '@repo/redis'

import { ChatModule } from './chat/chat.module.js'
import { env } from './config/env.js'
import { HealthModule } from './health/health.module.js'

@Module({
  imports: [
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    HealthModule,
    ChatModule,
  ],
})
export class AppModule {}
