import { Module } from '@nestjs/common'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { LingoController } from './lingo.controller'
import { LingoService } from './lingo.service'
import { PracticeController } from './practice.controller'
import { PracticeService } from './practice.service'
import { TutorModel } from './tutor-model'
import { VocabService } from './vocab.service'

/** Lingo: language learning and exam prep (docs/product/lingo.md). */
@Module({
  controllers: [
    LingoController,
    PracticeController,
    AdminController,
    ChatController,
  ],
  providers: [
    LingoService,
    PracticeService,
    VocabService,
    AdminService,
    ChatService,
    TutorModel,
  ],
})
export class LingoModule {}
