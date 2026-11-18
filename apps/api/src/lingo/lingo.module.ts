import { Module } from '@nestjs/common'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { LingoController } from './lingo.controller'
import { LingoService } from './lingo.service'
import { PracticeController } from './practice.controller'
import { PracticeService } from './practice.service'
import { VocabService } from './vocab.service'

/** Lingo: language learning and exam prep (docs/product/lingo.md). */
@Module({
  controllers: [LingoController, PracticeController, AdminController],
  providers: [LingoService, PracticeService, VocabService, AdminService],
})
export class LingoModule {}
