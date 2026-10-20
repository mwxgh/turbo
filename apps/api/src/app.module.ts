import { Module } from '@nestjs/common'

import { HealthModule } from './health/health.module.js'
import { HellosModule } from './hellos/hellos.module.js'
import { PrismaModule } from './prisma/prisma.module.js'

@Module({
  imports: [PrismaModule, HealthModule, HellosModule],
})
export class AppModule {}
