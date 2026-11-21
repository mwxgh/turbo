import { Module } from '@nestjs/common'

import { FilesModule } from '../files/files.module'
import { AdminTestsController } from './admin-tests.controller'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ArkModel } from './ark-model'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { GeneratorService } from './generator.service'
import { LingoController } from './lingo.controller'
import { LingoService } from './lingo.service'
import { PracticeController } from './practice.controller'
import { PracticeService } from './practice.service'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'
import { VocabService } from './vocab.service'

/** Lingo: language learning and exam prep (docs/product/lingo.md). */
@Module({
  imports: [FilesModule],
  controllers: [
    LingoController,
    PracticeController,
    AdminController,
    ChatController,
    TestsController,
    AdminTestsController,
  ],
  providers: [
    LingoService,
    PracticeService,
    VocabService,
    AdminService,
    ChatService,
    TestsService,
    GeneratorService,
    ArkModel,
  ],
})
export class LingoModule {}
