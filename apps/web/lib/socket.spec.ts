import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SOCKET_NAMESPACE } from '@repo/socket-events'

import { publicEnv } from './env'

// vi.mock is hoisted above the imports, so ./socket gets the fake client
const { io, handlers, fake, refreshSession, redirectToLogin } = vi.hoisted(
  () => {
    const handlers: Record<string, (arg?: unknown) => void> = {}
    const fake = {
      id: 'fake',
      on: vi.fn((event: string, fn: (arg?: unknown) => void) => {
        handlers[event] = fn
      }),
      connect: vi.fn(),
    }
    return {
      handlers,
      fake,
      io: vi.fn(() => fake),
      refreshSession: vi.fn(() => Promise.resolve(true)),
      redirectToLogin: vi.fn(),
    }
  },
)
vi.mock('socket.io-client', () => ({ io }))
vi.mock('./auth', () => ({ refreshSession, redirectToLogin }))

const { ACK_TIMEOUT_MS, SOCKET_UNAUTHORIZED, getSocket } =
  await import('./socket')

describe('getSocket', () => {
  beforeEach(() => {
    refreshSession.mockClear()
    redirectToLogin.mockClear()
    fake.connect.mockClear()
  })

  it('creates one lazy connection to the events namespace', () => {
    const first = getSocket()
    const second = getSocket()

    expect(first).toBe(second)
    expect(io).toHaveBeenCalledTimes(1)
    expect(io).toHaveBeenCalledWith(
      `${publicEnv.socketUrl}${SOCKET_NAMESPACE}`,
      {
        autoConnect: false,
        // the access cookie authenticates the handshake
        withCredentials: true,
        // acks never hang forever
        ackTimeout: ACK_TIMEOUT_MS,
      },
    )
  })

  it('refreshes the session once on an unauthorized handshake, then gives up', async () => {
    getSocket()
    handlers.connect_error!(new Error(SOCKET_UNAUTHORIZED))
    await vi.waitFor(() => expect(fake.connect).toHaveBeenCalledTimes(1))
    expect(refreshSession).toHaveBeenCalledTimes(1)

    handlers.connect_error!(new Error(SOCKET_UNAUTHORIZED))
    expect(redirectToLogin).toHaveBeenCalledTimes(1)

    // A successful connection resets the retry
    handlers.connect!()
    handlers.connect_error!(new Error('xhr poll error'))
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })
})
