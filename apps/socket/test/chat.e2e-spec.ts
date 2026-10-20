import type { AddressInfo } from 'node:net'

import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { type Socket, io } from 'socket.io-client'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  type ChatMessage,
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { AppModule } from '../src/app.module.js'
import { configureApp } from '../src/app.setup.js'

type Client = Socket<ServerToClientEvents, ClientToServerEvents>

describe('Chat gateway (e2e)', () => {
  let app: INestApplication
  let url: string
  const clients: Client[] = []

  const connect = async (): Promise<Client> => {
    const client: Client = io(url, {
      transports: ['websocket'],
      forceNew: true,
    })
    clients.push(client)
    await new Promise<void>((resolve, reject) => {
      client.once('connect', resolve)
      client.once('connect_error', reject)
    })
    return client
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = configureApp(moduleRef.createNestApplication({ logger: false }))
    await app.listen(0, '127.0.0.1')
    const { port } = app.getHttpServer().address() as AddressInfo
    url = `http://127.0.0.1:${port}${SOCKET_NAMESPACE}`
  })

  afterEach(() => {
    for (const client of clients.splice(0)) client.disconnect()
  })

  afterAll(async () => {
    await app.close()
  })

  it('serves the health endpoint', async () => {
    const res = await fetch(new URL('/health', url))
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toMatchObject({
      status: 'ok',
      service: 'socket',
      env: 'dev',
    })
  })

  it('delivers messages to everyone in the room', async () => {
    const alice = await connect()
    const bob = await connect()
    await expect(
      alice.emitWithAck('room:join', { room: 'lobby' }),
    ).resolves.toEqual({
      ok: true,
    })
    await bob.emitWithAck('room:join', { room: 'lobby' })

    const received = new Promise<ChatMessage>((resolve) =>
      bob.once('chat:message', resolve),
    )
    const ack = await alice.emitWithAck('chat:send', {
      room: 'lobby',
      text: 'hi bob',
    })

    expect(ack).toMatchObject({
      ok: true,
      data: { text: 'hi bob', senderId: alice.id },
    })
    await expect(received).resolves.toMatchObject({
      text: 'hi bob',
      room: 'lobby',
    })
  })

  it('does not leak messages to other rooms', async () => {
    const alice = await connect()
    const carol = await connect()
    await alice.emitWithAck('room:join', { room: 'a' })
    await carol.emitWithAck('room:join', { room: 'b' })

    let leaked = false
    carol.on('chat:message', () => {
      leaked = true
    })
    await alice.emitWithAck('chat:send', { room: 'a', text: 'secret' })
    await new Promise((r) => setTimeout(r, 100))
    expect(leaked).toBe(false)
  })

  it('acks validation errors instead of hanging', async () => {
    const client = await connect()
    await expect(
      client.emitWithAck('room:join', 'lobby' as never),
    ).resolves.toEqual({
      ok: false,
      errors: ['payload must be an object'],
    })
    await expect(
      client.emitWithAck('chat:send', { room: 'lobby', text: 'x' }),
    ).resolves.toEqual({
      ok: false,
      errors: ['Join room "lobby" first'],
    })
  })
})
