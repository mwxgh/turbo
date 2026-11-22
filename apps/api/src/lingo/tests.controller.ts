import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { type AuthUser, CurrentUser } from '@repo/auth/nest'
import { ApiListQuery, ListQueryDto } from '@repo/nest-common'

import { testListSpec } from './lingo.list-spec'
import { TestsService } from './tests.service'

/** Test library of learners: published tests only. */
@UseGuards(ThrottlerGuard)
@ApiTags('lingo')
@Controller('lingo')
export class TestsController {
  constructor(private readonly tests: TestsService) {}

  @Get('exams/:exam/tests')
  @ApiListQuery(testListSpec)
  list(
    @CurrentUser() user: AuthUser,
    @Param('exam') exam: string,
    @Query() query: ListQueryDto,
  ) {
    return this.tests.list(user.id, exam, query)
  }

  @Get('tests/:id')
  view(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: string) {
    return this.tests.view(user.id, id)
  }
}
