/**
 * Socket.IO contract shared by the gateway (apps/socket) and clients (apps/web).
 * Change an event here and both sides fail type-checking until they follow.
 */

export const SOCKET_NAMESPACE = '/events'

export interface ChatMessage {
  id: string
  room: string
  text: string
  senderId: string
  sentAt: string
}

/** Ack payload returned by every client → server event. */
export type Ack<T = undefined> =
  { ok: true; data: T } | { ok: false; errors: string[] }

/** Events the server emits to clients. */
export interface ServerToClientEvents {
  'chat:message': (message: ChatMessage) => void
  'room:joined': (payload: { room: string; socketId: string }) => void
}

/** Events clients emit to the server. */
export interface ClientToServerEvents {
  'room:join': (input: { room: string }, ack: (res: Ack) => void) => void
  'chat:send': (
    input: { room: string; text: string },
    ack: (res: Ack<ChatMessage>) => void,
  ) => void
}
