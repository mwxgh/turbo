import { Module } from '@nestjs/common'

import { RedisModule } from '@repo/redis'

import { env } from './config/env.js'
import { FilesModule } from './files/files.module.js'
import { HealthModule } from './health/health.module.js'
import { HellosModule } from './hellos/hellos.module.js'
import { PrismaModule } from './prisma/prisma.module.js'

@Module({
  imports: [
    PrismaModule,
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    HealthModule,
    HellosModule,
    FilesModule,
  ],
})
export class AppModule {}
