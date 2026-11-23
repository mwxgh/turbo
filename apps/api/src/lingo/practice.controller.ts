import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { ApiListQuery, ListQueryDto } from '@repo/nest-common'
import { type AuthUser, CurrentUser } from '@repo/nest-common/auth/nest'

import { SaveAnswerDto, StartAttemptDto } from './dto/attempt.dto'
import { ReviewCardDto } from './dto/vocab.dto'
import { attemptListSpec } from './lingo.list-spec'
import { PracticeService } from './practice.service'
import { VocabService } from './vocab.service'

@UseGuards(ThrottlerGuard)
@ApiTags('lingo')
@Controller('lingo')
export class PracticeController {
  constructor(
    private readonly practice: PracticeService,
    private readonly vocab: VocabService,
  ) {}

  @Post('attempts')
  start(@CurrentUser() user: AuthUser, @Body() body: StartAttemptDto) {
    return this.practice.start(user.id, body)
  }

  @Get('attempts')
  @ApiListQuery(attemptListSpec)
  list(@CurrentUser() user: AuthUser, @Query() query: ListQueryDto) {
    return this.practice.list(user.id, query)
  }

  @Get('attempts/:id')
  view(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: string) {
    return this.practice.view(user.id, id)
  }

  @Put('attempts/:id/answers/:questionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  saveAnswer(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('questionId', ParseUUIDPipe) questionId: string,
    @Body() body: SaveAnswerDto,
  ) {
    return this.practice.saveAnswer(user.id, id, questionId, body)
  }

  @Post('attempts/:id/submit')
  @HttpCode(HttpStatus.OK)
  submit(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.practice.submit(user.id, id)
  }

  @Get('mistakes/:exam')
  mistakes(@CurrentUser() user: AuthUser, @Param('exam') exam: string) {
    return this.practice.mistakes(user.id, exam)
  }

  @Post('cards/:id/extensions')
  @HttpCode(HttpStatus.OK)
  learnExtensions(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.vocab.learnExtensions(user.id, id)
  }

  /** "Đã biết": the card leaves the learner's review list. */
  @Post('cards/:id/known')
  @HttpCode(HttpStatus.OK)
  markKnown(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.vocab.markKnown(user.id, id)
  }

  @Post('cards/:id/review')
  @HttpCode(HttpStatus.OK)
  review(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReviewCardDto,
  ) {
    return this.vocab.review(user.id, id, body.rating)
  }
}
