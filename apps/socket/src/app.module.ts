import { Module } from '@nestjs/common'

import { AuthModule } from '@repo/auth/nest'
import { createLoggerModule } from '@repo/nest-common/logger'
import { RedisModule } from '@repo/redis'

import { ChatModule } from './chat/chat.module'
import { env } from './env'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    createLoggerModule({
      service: 'socket',
      env: env.APP_ENV,
      level: env.LOG_LEVEL,
      format: env.LOG_FORMAT,
      quietPaths: ['/socket/health'],
    }),
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    // HTTP routes need a token unless @Public(); socket connections: see ChatGateway.afterInit
    AuthModule.forRoot({ secret: env.JWT_SECRET }),
    HealthModule,
    ChatModule,
  ],
})
export class AppModule {}
