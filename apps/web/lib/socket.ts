'use client'

import { type Socket, io } from 'socket.io-client'

import {
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { redirectToLogin, refreshSession } from './auth'
import { publicEnv } from './env'

export type { ChatMessage } from '@repo/socket-events'

/** `connect_error` message when the handshake has no valid access token (`@repo/auth`). */
export const SOCKET_UNAUTHORIZED = 'unauthorized'

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

/** emitWithAck rejects after this instead of waiting forever for a lost ack. */
export const ACK_TIMEOUT_MS = 5_000

let socket: AppSocket | undefined

/** Lazily creates a single shared socket connection for the browser. */
export function getSocket(): AppSocket {
  if (socket) return socket
  // The access cookie authenticates the handshake (same site as the api)
  const created: AppSocket = io(`${publicEnv.socketUrl}${SOCKET_NAMESPACE}`, {
    autoConnect: false,
    withCredentials: true,
    ackTimeout: ACK_TIMEOUT_MS,
  })
  // Expired access token: refresh once, then reconnect; a second refusal means signed out
  let retried = false
  created.on('connect', () => {
    retried = false
  })
  created.on('connect_error', (error) => {
    if (error.message !== SOCKET_UNAUTHORIZED) return
    if (retried) return redirectToLogin()
    retried = true
    void refreshSession().then((ok) =>
      ok ? created.connect() : redirectToLogin(),
    )
  })
  socket = created
  return socket
}
