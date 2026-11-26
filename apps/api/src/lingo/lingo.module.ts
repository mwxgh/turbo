import { Module } from '@nestjs/common'

import { FilesModule } from '../files/files.module'
import { AdminLessonsController } from './admin-lessons.controller'
import { AdminLessonsService } from './admin-lessons.service'
import { AdminTestsController } from './admin-tests.controller'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ArkModel } from './ark-model'
import { CardSearchService } from './card-search.service'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { GeneratorService } from './generator.service'
import { LessonsService } from './lessons.service'
import { LingoController } from './lingo.controller'
import { LingoService } from './lingo.service'
import { PracticeController } from './practice.controller'
import { PracticeService } from './practice.service'
import { RoadmapService } from './roadmap.service'
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
    AdminLessonsController,
  ],
  providers: [
    LingoService,
    PracticeService,
    VocabService,
    CardSearchService,
    AdminService,
    ChatService,
    TestsService,
    GeneratorService,
    ArkModel,
    RoadmapService,
    LessonsService,
    AdminLessonsService,
  ],
})
export class LingoModule {}
