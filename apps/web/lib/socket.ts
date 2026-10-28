'use client'

import { type Socket, io } from 'socket.io-client'

import {
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { publicEnv } from './env'

export type { ChatMessage } from '@repo/socket-events'

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

/** emitWithAck rejects after this instead of waiting forever for a lost ack. */
export const ACK_TIMEOUT_MS = 5_000

let socket: AppSocket | undefined

/** Lazily creates a single shared socket connection for the browser. */
export function getSocket(): AppSocket {
  socket ??= io(`${publicEnv.socketUrl}${SOCKET_NAMESPACE}`, {
    autoConnect: false,
    withCredentials: true,
    ackTimeout: ACK_TIMEOUT_MS,
  })
  return socket
}
