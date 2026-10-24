import { Module } from '@nestjs/common'

import { HellosController } from './hellos.controller'
import { HellosService } from './hellos.service'

@Module({
  controllers: [HellosController],
  providers: [HellosService],
})
export class HellosModule {}
