'use client'

import { type Socket, io } from 'socket.io-client'

import {
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { publicEnv } from './env'

export type { Ack, ChatMessage } from '@repo/socket-events'

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

let socket: AppSocket | undefined

/** Lazily creates a single shared socket connection for the browser. */
export function getSocket(): AppSocket {
  socket ??= io(`${publicEnv.socketUrl}${SOCKET_NAMESPACE}`, {
    autoConnect: false,
    withCredentials: true,
  })
  return socket
}
