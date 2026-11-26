import { Module } from '@nestjs/common'

import { AdminLearnController } from './admin-learn.controller'
import { AdminLearnService } from './admin-learn.service'
import { LearnController } from './learn.controller'
import { LearnService } from './learn.service'
import { StudioController } from './studio.controller'
import { StudioService } from './studio.service'

/** Studio: learn programming (docs/product/studio.md) and generate a project (ADR 0018). */
@Module({
  controllers: [StudioController, LearnController, AdminLearnController],
  providers: [StudioService, LearnService, AdminLearnService],
})
export class StudioModule {}
