import { randomUUID } from 'node:crypto'

import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import type { Server, Socket } from 'socket.io'

import { validateDto } from '@repo/decorators'
import {
  type Ack,
  type ChatMessage,
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { SubscribeEvent } from '../common/subscribe-event.decorator.js'
import { env } from '../config/env.js'
import { JoinRoomDto } from './dto/join-room.dto.js'
import { SendMessageDto } from './dto/send-message.dto.js'

type AppServer = Server<ClientToServerEvents, ServerToClientEvents>
type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>

/**
 * Payloads are validated with `validateDto` instead of `ValidationPipe`: a pipe
 * error would never reach the client's ack callback, leaving `emitWithAck` hanging.
 */
@WebSocketGateway({
  namespace: SOCKET_NAMESPACE,
  cors: { origin: env.corsOrigins, credentials: true },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name)

  @WebSocketServer()
  private readonly server!: AppServer

  handleConnection(client: AppSocket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: AppSocket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  /** The handler's return value is sent back through the client's ack callback. */
  @SubscribeEvent('room:join')
  async joinRoom(
    @ConnectedSocket() client: AppSocket,
    @MessageBody() payload: unknown,
  ): Promise<Ack> {
    const input = validateDto(JoinRoomDto, payload)
    if (!input.ok) return input

    const { room } = input.data
    await client.join(room)
    this.server.to(room).emit('room:joined', { room, socketId: client.id })
    return { ok: true, data: undefined }
  }

  @SubscribeEvent('chat:send')
  sendMessage(
    @ConnectedSocket() client: AppSocket,
    @MessageBody() payload: unknown,
  ): Ack<ChatMessage> {
    const input = validateDto(SendMessageDto, payload)
    if (!input.ok) return input
    if (!client.rooms.has(input.data.room)) {
      return { ok: false, errors: [`Join room "${input.data.room}" first`] }
    }

    const message: ChatMessage = {
      ...input.data,
      id: randomUUID(),
      senderId: client.id,
      sentAt: new Date().toISOString(),
    }
    this.server.to(message.room).emit('chat:message', message)
    return { ok: true, data: message }
  }
}
