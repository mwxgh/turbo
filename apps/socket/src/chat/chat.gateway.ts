import { randomUUID } from 'node:crypto'

import { Inject, Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import type { Server, Socket } from 'socket.io'

import { AccessTokens } from '@repo/auth'
import { socketAuth } from '@repo/auth/nest'
import { validateDto } from '@repo/nest-common'
import {
  type Ack,
  type ChatMessage,
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { env } from '../env'
import { JoinRoomDto } from './dto/join-room.dto'
import { SendMessageDto } from './dto/send-message.dto'
import { SubscribeEvent } from './subscribe-event.decorator'

type AppServer = Server<ClientToServerEvents, ServerToClientEvents>
type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>

/** Namespaced so a client can never join Socket.IO's own per-socket `socket.id` rooms. */
const roomKey = (room: string) => `chat:${room}`

/**
 * Payloads are validated with `validateDto` instead of `ValidationPipe`: a pipe
 * error would never reach the client's ack callback, leaving `emitWithAck` hanging.
 */
@WebSocketGateway({
  namespace: SOCKET_NAMESPACE,
  cors: { origin: env.corsOrigins, credentials: true },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name)

  @WebSocketServer()
  private readonly server!: AppServer

  constructor(@Inject(AccessTokens) private readonly tokens: AccessTokens) {}

  /** Only signed-in users connect: the handshake carries the access token (cookie or `auth.token`). */
  afterInit(server: AppServer) {
    server.use(socketAuth(this.tokens))
  }

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
    await client.join(roomKey(room))
    this.server
      .to(roomKey(room))
      .emit('room:joined', { room, socketId: client.id })
    return { ok: true, data: undefined }
  }

  @SubscribeEvent('chat:send')
  sendMessage(
    @ConnectedSocket() client: AppSocket,
    @MessageBody() payload: unknown,
  ): Ack<ChatMessage> {
    const input = validateDto(SendMessageDto, payload)
    if (!input.ok) return input
    if (!client.rooms.has(roomKey(input.data.room))) {
      return { ok: false, errors: [`Join room "${input.data.room}" first`] }
    }

    const message: ChatMessage = {
      ...input.data,
      id: randomUUID(),
      senderId: client.id,
      sentAt: new Date().toISOString(),
    }
    this.server.to(roomKey(message.room)).emit('chat:message', message)
    return { ok: true, data: message }
  }
}
