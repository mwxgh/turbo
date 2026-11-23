import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { ApiListQuery, ListQueryDto } from '@repo/nest-common'
import { type AuthUser, CurrentUser, Roles } from '@repo/nest-common/auth/nest'

import { AdminService } from './admin.service'
import {
  CreateDeckDto,
  CreateItemDto,
  ImportCardsDto,
  ImportItemsDto,
  SetItemStatusDto,
} from './dto/admin.dto'
import { itemListSpec } from './lingo.list-spec'

@UseGuards(ThrottlerGuard)
@Roles('ADMIN')
@ApiTags('lingo-admin')
@Controller('lingo/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('items')
  @ApiListQuery(itemListSpec)
  items(@Query() query: ListQueryDto) {
    return this.admin.listItems(query)
  }

  @Post('items')
  createItem(@CurrentUser() user: AuthUser, @Body() body: CreateItemDto) {
    return this.admin.createItem(user.id, body.exam, body.part, body.item)
  }

  @Post('items/import')
  @HttpCode(HttpStatus.OK)
  importItems(@CurrentUser() user: AuthUser, @Body() body: ImportItemsDto) {
    return this.admin.importItems(user.id, body)
  }

  @Post('items/status')
  @HttpCode(HttpStatus.OK)
  setStatus(@Body() body: SetItemStatusDto) {
    return this.admin.setStatus(body.ids, body.status)
  }

  @Get('batches')
  batches() {
    return this.admin.batches()
  }

  @Post('decks')
  createDeck(@Body() body: CreateDeckDto) {
    return this.admin.createDeck(body)
  }

  @Post('decks/:id/import')
  @HttpCode(HttpStatus.OK)
  importCards(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ImportCardsDto,
  ) {
    return this.admin.importCards(id, body.csv)
  }

  @Post('samples')
  @HttpCode(HttpStatus.OK)
  loadSamples(@CurrentUser() user: AuthUser) {
    return this.admin.loadSamples(user.id)
  }
}
