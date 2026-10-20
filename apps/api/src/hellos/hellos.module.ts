import { Module } from '@nestjs/common'

import { HellosController } from './hellos.controller.js'
import { HellosService } from './hellos.service.js'

@Module({
  controllers: [HellosController],
  providers: [HellosService],
})
export class HellosModule {}
