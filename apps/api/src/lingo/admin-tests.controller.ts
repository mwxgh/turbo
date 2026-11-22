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
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'

import { type AuthUser, CurrentUser, Roles } from '@repo/auth/nest'
import { ApiListQuery, ListQueryDto } from '@repo/nest-common'

import { AdminService } from './admin.service'
import {
  AssembleTestDto,
  GenerateCardsDto,
  GenerateItemsDto,
  GenerateTestDto,
  SetItemImageDto,
  SetTestStatusDto,
} from './dto/admin.dto'
import { GeneratorService } from './generator.service'
import { testListSpec } from './lingo.list-spec'
import { TestsService } from './tests.service'

/** AI runs per admin IP and minute: each one costs many model calls. */
const GENERATE_LIMIT = { default: { limit: 5, ttl: 60_000 } }

/** Tests (build, review, publish) and AI generation for admins. */
@UseGuards(ThrottlerGuard)
@Roles('ADMIN')
@ApiTags('lingo-admin')
@Controller('lingo/admin')
export class AdminTestsController {
  constructor(
    private readonly tests: TestsService,
    private readonly generator: GeneratorService,
    private readonly admin: AdminService,
  ) {}

  @Get('tests')
  @ApiListQuery(testListSpec)
  list(@Query() query: ListQueryDto) {
    return this.tests.adminList(query)
  }

  @Get('tests/:id')
  view(@Param('id', ParseUUIDPipe) id: string) {
    return this.tests.adminView(id)
  }

  /** A DRAFT test from published items, each part filled to its target. */
  @Post('tests')
  assemble(@CurrentUser() user: AuthUser, @Body() body: AssembleTestDto) {
    return this.tests.assemble(user.id, body)
  }

  @Post('tests/:id/status')
  @HttpCode(HttpStatus.OK)
  setStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SetTestStatusDto,
  ) {
    return this.tests.setStatus(id, body.status)
  }

  @Delete('tests/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tests.remove(id)
  }

  @Put('items/:id/image')
  setImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SetItemImageDto,
  ) {
    return this.admin.setImage(id, body.key)
  }

  /** Starts an AI run; follow it in GET /lingo/admin/batches. */
  @Post('generate/items')
  @HttpCode(HttpStatus.ACCEPTED)
  @Throttle(GENERATE_LIMIT)
  generateItems(@CurrentUser() user: AuthUser, @Body() body: GenerateItemsDto) {
    return this.generator.generateItems(user.id, body)
  }

  /** Starts an AI run that ends with a DRAFT test. */
  @Post('generate/test')
  @HttpCode(HttpStatus.ACCEPTED)
  @Throttle(GENERATE_LIMIT)
  generateTest(@CurrentUser() user: AuthUser, @Body() body: GenerateTestDto) {
    return this.generator.generateTest(user.id, body)
  }

  /** Cards filled by AI from bare terms (waits for the model). */
  @Post('decks/:id/generate')
  @HttpCode(HttpStatus.OK)
  @Throttle(GENERATE_LIMIT)
  generateCards(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: GenerateCardsDto,
  ) {
    return this.generator.generateCards(id, body.terms)
  }
}
