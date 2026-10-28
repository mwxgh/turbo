import type { AddressInfo } from 'node:net'

import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { type Socket, io } from 'socket.io-client'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import {
  type ChatMessage,
  type ClientToServerEvents,
  SOCKET_NAMESPACE,
  type ServerToClientEvents,
} from '@repo/socket-events'

import { AppModule } from '../src/app.module'
import { configureApp } from '../src/app.setup'

type Client = Socket<ServerToClientEvents, ClientToServerEvents>

/** One socket server instance, like a replica behind a load balancer. */
async function startInstance() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  const app = configureApp(moduleRef.createNestApplication({ logger: false }))
  await app.listen(0, '127.0.0.1')
  const { port } = app.getHttpServer().address() as AddressInfo
  return { app, url: `http://127.0.0.1:${port}${SOCKET_NAMESPACE}` }
}

async function connect(url: string): Promise<Client> {
  const client: Client = io(url, { transports: ['websocket'], forceNew: true })
  await new Promise<void>((resolve, reject) => {
    client.once('connect', resolve)
    client.once('connect_error', reject)
  })
  return client
}

describe('Scale-out through the Redis adapter (e2e)', () => {
  const apps: INestApplication[] = []
  const clients: Client[] = []
  let urls: string[]

  beforeAll(async () => {
    const instances = [await startInstance(), await startInstance()]
    apps.push(...instances.map((i) => i.app))
    urls = instances.map((i) => i.url)
  })

  afterAll(async () => {
    for (const client of clients) client.disconnect()
    await Promise.all(apps.map((app) => app.close()))
  })

  it('reports Redis in the health check', async () => {
    const res = await fetch(new URL('/socket/health', urls[0]))
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toMatchObject({
      checks: { redis: 'up' },
    })
  })

  it('delivers a room message to clients of another instance', async () => {
    // Unique room: other test runs on the same Redis never interfere
    const room = `scale-${Date.now()}`
    const [alice, bob] = await Promise.all(urls.map(connect))
    clients.push(alice!, bob!)
    await alice!.emitWithAck('room:join', { room })
    await bob!.emitWithAck('room:join', { room })

    const received = new Promise<ChatMessage>((resolve) =>
      bob!.once('chat:message', resolve),
    )
    const sent = await alice!.emitWithAck('chat:send', { room, text: 'hi' })

    expect(sent.ok).toBe(true)
    await expect(received).resolves.toMatchObject({
      room,
      text: 'hi',
      senderId: alice!.id,
    })
  })
})
