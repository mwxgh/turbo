import { Module } from '@nestjs/common'

import { PrismaModule } from '@repo/db/nest'
import { RedisModule } from '@repo/redis'

import { env } from './env'
import { FilesModule } from './files/files.module'
import { HealthModule } from './health/health.module'
import { HellosModule } from './hellos/hellos.module'

@Module({
  imports: [
    PrismaModule.forRoot({ url: env.DATABASE_URL }),
    RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix }),
    HealthModule,
    HellosModule,
    FilesModule,
  ],
})
export class AppModule {}
