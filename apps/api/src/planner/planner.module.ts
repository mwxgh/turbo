import { Module } from '@nestjs/common'

import { PlannerController } from './planner.controller'
import { PlannerService } from './planner.service'

/** Planner: daily / monthly schedule and kanban board of the signed-in user. */
@Module({
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}
