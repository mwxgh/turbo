import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { type AuthUser, CurrentUser } from '@repo/nest-common/auth/nest'

import {
  CreatePlannerTaskDto,
  PlannerRangeQueryDto,
  PlannerTaskDto,
  UpdatePlannerTaskDto,
} from './dto/planner-task.dto'
import { PlannerService } from './planner.service'

/** The signed-in user's own planner tasks. */
@UseGuards(ThrottlerGuard)
@ApiTags('planner')
@Controller('planner/tasks')
export class PlannerController {
  constructor(private readonly planner: PlannerService) {}

  @Get()
  @ApiOkResponse({ type: [PlannerTaskDto] })
  findRange(
    @CurrentUser() user: AuthUser,
    @Query() query: PlannerRangeQueryDto,
  ) {
    return this.planner.findRange(user.id, query)
  }

  @Post()
  @ApiCreatedResponse({ type: PlannerTaskDto })
  create(@CurrentUser() user: AuthUser, @Body() body: CreatePlannerTaskDto) {
    return this.planner.create(user.id, body)
  }

  @Patch(':id')
  @ApiOkResponse({ type: PlannerTaskDto })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePlannerTaskDto,
  ) {
    return this.planner.update(user.id, id, body)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.planner.remove(user.id, id)
  }
}
