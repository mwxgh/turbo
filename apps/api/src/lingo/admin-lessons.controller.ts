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
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { Roles } from '@repo/nest-common/auth/nest'

import { AdminLessonsService } from './admin-lessons.service'
import { LessonDto, LessonModuleDto } from './dto/lessons.dto'

/** Lingo course editing: modules and their lessons. Admins only. */
@UseGuards(ThrottlerGuard)
@Roles('ADMIN')
@ApiTags('lingo-admin')
@Controller('lingo/admin')
export class AdminLessonsController {
  constructor(private readonly admin: AdminLessonsService) {}

  /** Every module of the exam with all its lessons, drafts included */
  @Get('courses/:exam')
  course(@Param('exam') exam: string) {
    return this.admin.course(exam)
  }

  @Post('lesson-modules')
  createModule(@Body() body: LessonModuleDto) {
    return this.admin.createModule(body)
  }

  @Put('lesson-modules/:id')
  updateModule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: LessonModuleDto,
  ) {
    return this.admin.updateModule(id, body)
  }

  /** Deletes the module with its lessons */
  @Delete('lesson-modules/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeModule(@Param('id', ParseUUIDPipe) id: string) {
    return this.admin.removeModule(id)
  }

  @Post('lessons')
  createLesson(@Body() body: LessonDto) {
    return this.admin.createLesson(body)
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
}
