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

import { type AuthUser, CurrentUser } from '@repo/auth/nest'

import { UpdateGoalDto } from './dto/goal.dto'
import { ReviewQueueQueryDto } from './dto/vocab.dto'
import { LingoService } from './lingo.service'
import { VocabService } from './vocab.service'

@UseGuards(ThrottlerGuard)
@ApiTags('lingo')
@Controller('lingo')
export class LingoController {
  constructor(
    private readonly lingo: LingoService,
    private readonly vocab: VocabService,
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

  @Get('decks')
  decks(@CurrentUser() user: AuthUser, @Query() query: ReviewQueueQueryDto) {
    return this.vocab.decks(user.id, query.exam)
  }

  @Get('review')
  queue(@CurrentUser() user: AuthUser, @Query() query: ReviewQueueQueryDto) {
    return this.vocab.queue(user.id, query.exam, query.deckId)
  }
}
