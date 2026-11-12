import type { Socket } from 'socket.io'
import { describe, expect, it } from 'vitest'

import { RevokedSessions } from '../revoked-sessions.js'
import { AccessTokens } from '../tokens.js'
import { SOCKET_UNAUTHORIZED, socketAuth } from './socket.js'

const tokens = new AccessTokens('x'.repeat(32), 60)
const user = { id: 'u1', sessionId: 's1', role: 'USER' }

function handshake(auth: object, headers: object = {}) {
  return { handshake: { auth, headers }, data: {} } as unknown as Socket
}

let revokedIds = new Set<string>()
let storeDown = false
const revoked = new RevokedSessions(
  {
    exists: (key) =>
      storeDown
        ? Promise.reject(new Error('redis down'))
        : Promise.resolve(revokedIds.has(key.split(':').pop()!) ? 1 : 0),
    set: () => Promise.resolve('OK'),
  },
  60,
)

const run = (socket: Socket) =>
  new Promise<Error | undefined>((resolve) =>
    socketAuth(tokens, revoked, 'access_token')(socket, resolve),
  )

describe('socketAuth', () => {
  it('accepts auth.token and the access cookie', async () => {
    const token = await tokens.sign(user)
    const viaAuth = handshake({ token })
    expect(await run(viaAuth)).toBeUndefined()
    expect(viaAuth.data).toEqual({ user })

    const viaCookie = handshake({}, { cookie: `access_token=${token}` })
    expect(await run(viaCookie)).toBeUndefined()
  })

  it('refuses a missing or invalid token', async () => {
    expect((await run(handshake({})))?.message).toBe(SOCKET_UNAUTHORIZED)
    expect((await run(handshake({ token: 'nope' })))?.message).toBe(
      SOCKET_UNAUTHORIZED,
    )
  })

  it('refuses a signed-out session, and fails closed without the store', async () => {
    const token = await tokens.sign(user)
    revokedIds = new Set(['s1'])
    expect((await run(handshake({ token })))?.message).toBe(SOCKET_UNAUTHORIZED)
    revokedIds = new Set()

    storeDown = true
    expect((await run(handshake({ token })))?.message).toBe('redis down')
    storeDown = false
  })
})
