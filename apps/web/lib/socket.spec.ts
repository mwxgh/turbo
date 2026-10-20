import { describe, expect, it, vi } from 'vitest'

import { SOCKET_NAMESPACE } from '@repo/socket-events'

import { publicEnv } from './env'
import { getSocket } from './socket'

// vi.mock is hoisted above the imports, so ./socket gets the fake client
const io = vi.hoisted(() => vi.fn(() => ({ id: 'fake' })))
vi.mock('socket.io-client', () => ({ io }))

describe('getSocket', () => {
  it('creates one lazy connection to the events namespace', () => {
    const first = getSocket()
    const second = getSocket()

    expect(first).toBe(second)
    expect(io).toHaveBeenCalledTimes(1)
    expect(io).toHaveBeenCalledWith(
      `${publicEnv.socketUrl}${SOCKET_NAMESPACE}`,
      {
        autoConnect: false,
        withCredentials: true,
      },
    )
  })
})
