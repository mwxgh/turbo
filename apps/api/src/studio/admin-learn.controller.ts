import {
  Body,
  Controller,
  Delete,
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
import { Roles } from '@repo/nest-common/auth/nest'

import { AdminLearnService } from './admin-learn.service'
import { LessonDto, RoadmapDto, TrackDto } from './dto/learn.dto'
import { roadmapListSpec, trackListSpec } from './learn.list-spec'

/** Studio content editing: tracks, lessons with their quiz, roadmaps. Admins only. */
@UseGuards(ThrottlerGuard)
@Roles('ADMIN')
@ApiTags('studio-admin')
@Controller('studio/admin')
export class AdminLearnController {
  constructor(private readonly admin: AdminLearnService) {}

  @Get('tracks')
  @ApiListQuery(trackListSpec)
  tracks(@Query() query: ListQueryDto) {
    return this.admin.tracks(query)
  }

  @Get('tracks/:id')
  track(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.track(id)
  }

  @Post('tracks')
  createTrack(@Body() body: TrackDto) {
    return this.admin.createTrack(body)
  }

  @Put('tracks/:id')
  updateTrack(@Param('id', ParseUUIDPipe) id: string, @Body() body: TrackDto) {
    return this.admin.updateTrack(id, body)
  }

  @Delete('tracks/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.removeTrack(id)
  }

  @Post('tracks/:id/lessons')
  createLesson(
    @Param('id', ParseUUIDPipe) trackId: string,
    @Body() body: LessonDto,
  ) {
    return this.admin.createLesson(trackId, body)
  }

  @Get('lessons/:id')
  lesson(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.lesson(id)
  }

  @Put('lessons/:id')
  updateLesson(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: LessonDto,
  ) {
    return this.admin.updateLesson(id, body)
  }

  @Delete('lessons/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeLesson(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.removeLesson(id)
  }

  @Get('roadmaps')
  @ApiListQuery(roadmapListSpec)
  roadmaps(@Query() query: ListQueryDto) {
    return this.admin.roadmaps(query)
  }

  @Get('roadmaps/:id')
  roadmap(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.roadmap(id)
  }

  @Post('roadmaps')
  createRoadmap(@Body() body: RoadmapDto) {
    return this.admin.createRoadmap(body)
  }

  @Put('roadmaps/:id')
  updateRoadmap(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: RoadmapDto,
  ) {
    return this.admin.updateRoadmap(id, body)
  }

  @Delete('roadmaps/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeRoadmap(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.removeRoadmap(id)
  }
}
