import { describe, expect, expectTypeOf, it } from 'vitest'

import {
  type Ack,
  type ChatMessage,
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from './index.js'

describe('socket contract', () => {
  it('uses the /events namespace', () => {
    expect(SOCKET_NAMESPACE).toBe('/events')
  })

  // Compile-time checks (enforced by `check-types`): renaming an event or
  // changing a payload here breaks both the gateway and the web client.
  it('declares the event signatures', () => {
    expectTypeOf<keyof ClientToServerEvents>().toEqualTypeOf<
      'room:join' | 'chat:send'
    >()
    expectTypeOf<keyof ServerToClientEvents>().toEqualTypeOf<
      'chat:message' | 'room:joined'
    >()
    expectTypeOf<
      Parameters<ClientToServerEvents['chat:send']>[0]
    >().toEqualTypeOf<{
      room: string
      text: string
    }>()
    expectTypeOf<
      Parameters<ServerToClientEvents['chat:message']>[0]
    >().toEqualTypeOf<ChatMessage>()
    expectTypeOf<Ack<number>>().toEqualTypeOf<
      { ok: true; data: number } | { ok: false; errors: string[] }
    >()
  })
})
