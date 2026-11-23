import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiProduces, ApiTags } from '@nestjs/swagger'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'

import type { Response } from 'express'

import { ApiListQuery, ListQueryDto } from '@repo/nest-common'
import { type AuthUser, CurrentUser } from '@repo/nest-common/auth/nest'

import { ChatService } from './chat.service'
import { SendChatMessageDto } from './dto/chat.dto'
import { chatListSpec } from './lingo.list-spec'

/** Questions to the model per user IP and minute: each one costs tokens. */
const ASK_LIMIT = { default: { limit: 20, ttl: 60_000 } }

@UseGuards(ThrottlerGuard)
@ApiTags('lingo')
@Controller('lingo/chats')
export class ChatController {
  constructor(private readonly chats: ChatService) {}

  @Get()
  @ApiListQuery(chatListSpec)
  list(@CurrentUser() user: AuthUser, @Query() query: ListQueryDto) {
    return this.chats.list(user.id, query)
  }

  @Post()
  create(@CurrentUser() user: AuthUser) {
    return this.chats.create(user.id)
  }

  @Get(':id')
  view(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: string) {
    return this.chats.view(user.id, id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.chats.remove(user.id, id)
  }

  /**
   * Streams the tutor's answer as plain UTF-8 text. Headers go out with the first piece, so a
   * model that fails before answering is still a 502.
   */
  @Post(':id/messages')
  @Throttle(ASK_LIMIT)
  @ApiProduces('text/plain')
  async ask(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SendChatMessageDto,
    @Res() res: Response,
  ) {
    const abort = new AbortController()
    res.on('close', () => abort.abort())
    const reply = await this.chats.ask(user.id, id, body.text, abort.signal)

    let first: IteratorResult<string>
    try {
      first = await reply.next()
    } catch {
      throw new BadGatewayException('AI tutor failed to answer')
    }
    // Client gone while the model was thinking
    if (abort.signal.aborted) return

    res.status(HttpStatus.OK)
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.setHeader('cache-control', 'no-cache')
    // nginx: pass pieces through instead of buffering the whole answer
    res.setHeader('x-accel-buffering', 'no')
    if (!first.done) res.write(first.value)
    try {
      for await (const piece of reply) res.write(piece)
    } catch {
      // Headers are out: the answer just stops (ChatService logged it and kept what arrived)
    } finally {
      res.end()
    }
  }
}
