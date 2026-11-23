import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { type AuthUser, CurrentUser } from '@repo/nest-common/auth/nest'

import { CardSearchService } from './card-search.service'
import { UpdateGoalDto } from './dto/goal.dto'
import { CardSearchQueryDto, ReviewQueueQueryDto } from './dto/vocab.dto'
import { LessonsService } from './lessons.service'
import { LingoService } from './lingo.service'
import { RoadmapService } from './roadmap.service'
import { VocabService } from './vocab.service'

@UseGuards(ThrottlerGuard)
@ApiTags('lingo')
@Controller('lingo')
export class LingoController {
  constructor(
    private readonly lingo: LingoService,
    private readonly vocab: VocabService,
    private readonly cardSearch: CardSearchService,
    private readonly roadmaps: RoadmapService,
    private readonly lessons: LessonsService,
  ) {}

  @Get('exams')
  exams() {
    return this.lingo.exams()
  }

  @Get('exams/:exam')
  exam(@Param('exam') exam: string) {
    return this.lingo.exam(exam)
  }

  @Get('goals/:exam')
  goal(@CurrentUser() user: AuthUser, @Param('exam') exam: string) {
    return this.lingo.goal(user.id, exam)
  }

  @Put('goals/:exam')
  updateGoal(
    @CurrentUser() user: AuthUser,
    @Param('exam') exam: string,
    @Body() body: UpdateGoalDto,
  ) {
    return this.lingo.updateGoal(user.id, exam, body)
  }

  @Get('dashboard/:exam')
  dashboard(@CurrentUser() user: AuthUser, @Param('exam') exam: string) {
    return this.lingo.dashboard(user.id, exam)
  }

  /** Stages and tasks toward the learner's target score, progress from their activity */
  @Get('roadmap/:exam')
  roadmap(@CurrentUser() user: AuthUser, @Param('exam') exam: string) {
    return this.roadmaps.roadmap(user.id, exam)
  }

  /** The course: modules and lessons, each with progress from the learner's answers */
  @Get('lessons/:exam')
  lessonList(@CurrentUser() user: AuthUser, @Param('exam') exam: string) {
    return this.lessons.list(user.id, exam)
  }

  @Get('lessons/:exam/:id')
  lesson(
    @CurrentUser() user: AuthUser,
    @Param('exam') exam: string,
    @Param('id') id: string,
  ) {
    return this.lessons.get(user.id, exam, id)
  }

  @Get('decks')
  decks(@CurrentUser() user: AuthUser, @Query() query: ReviewQueueQueryDto) {
    return this.vocab.decks(user.id, query.exam)
  }

  /** Full-text search over the cards the user can see: term, meaning (accents optional), từ mở rộng. */
  @Get('cards/search')
  searchCards(
    @CurrentUser() user: AuthUser,
    @Query() query: CardSearchQueryDto,
  ) {
    return this.cardSearch.search(user.id, query.q, query.exam)
  }

  @Get('review')
  queue(@CurrentUser() user: AuthUser, @Query() query: ReviewQueueQueryDto) {
    return this.vocab.queue(user.id, query.exam, query.deckId)
  }
}
