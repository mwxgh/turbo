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
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { type AuthUser, CurrentUser } from '@repo/nest-common/auth/nest'

import { SetLessonDoneDto, SubmitQuizDto } from './dto/learn.dto'
import { LearnService } from './learn.service'

/** Learner side of Studio: read published content, keep progress, take quizzes. */
@UseGuards(ThrottlerGuard)
@ApiTags('studio')
@Controller('studio')
export class LearnController {
  constructor(private readonly learn: LearnService) {}

  @Get('overview')
  overview(@CurrentUser() user: AuthUser) {
    return this.learn.overview(user.id)
  }

  @Get('garden')
  garden(@CurrentUser() user: AuthUser) {
    return this.learn.garden(user.id)
  }

  @Get('tracks')
  tracks(@CurrentUser() user: AuthUser) {
    return this.learn.tracks(user.id)
  }

  @Get('tracks/:slug')
  track(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    return this.learn.track(user.id, slug)
  }

  @Get('tracks/:slug/lessons/:lesson')
  lesson(
    @CurrentUser() user: AuthUser,
    @Param('slug') slug: string,
    @Param('lesson') lesson: string,
  ) {
    return this.learn.lesson(user.id, slug, lesson)
  }

  @Get('roadmaps')
  roadmaps(@CurrentUser() user: AuthUser) {
    return this.learn.roadmaps(user.id)
  }

  @Get('roadmaps/:slug')
  roadmap(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    return this.learn.roadmap(user.id, slug)
  }

  @Put('lessons/:id/done')
  setDone(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SetLessonDoneDto,
  ) {
    return this.learn.setDone(user.id, id, body.done)
  }

  @Post('lessons/:id/quiz')
  @HttpCode(HttpStatus.OK)
  submitQuiz(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SubmitQuizDto,
  ) {
    return this.learn.submitQuiz(user.id, id, body.answers)
  }
}
