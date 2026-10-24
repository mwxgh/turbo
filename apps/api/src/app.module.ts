import { Module } from '@nestjs/common'

import { RedisModule } from '@repo/redis'

import { env } from './config/env'
import { FilesModule } from './files/files.module'
import { HealthModule } from './health/health.module'
import { HellosModule } from './hellos/hellos.module'
import { PrismaModule } from './prisma/prisma.module'

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
