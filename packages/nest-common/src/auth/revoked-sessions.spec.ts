import { describe, expect, it } from 'vitest'

import { type RevocationStore, RevokedSessions } from './revoked-sessions.js'

/** In-memory store that records the TTL of each key. */
function memoryStore() {
  const ttls = new Map<string, number>()
  const store: RevocationStore = {
    exists: (key) => Promise.resolve(ttls.has(key) ? 1 : 0),
    set: (key, _value, _mode, seconds) => {
      ttls.set(key, seconds)
      return Promise.resolve('OK')
    },
  }
  return { store, ttls }
}

describe('RevokedSessions', () => {
  it('remembers revoked sessions for one access token lifetime', async () => {
    const { store, ttls } = memoryStore()
    const revoked = new RevokedSessions(store, 900)

    expect(await revoked.isRevoked('s1')).toBe(false)
    await revoked.revoke('s1', 's2')
    expect(await revoked.isRevoked('s1')).toBe(true)
    expect(await revoked.isRevoked('s2')).toBe(true)
    expect(await revoked.isRevoked('s3')).toBe(false)
    expect([...ttls.values()]).toEqual([900, 900])
  })

  it('revoking nothing is a no-op', async () => {
    const { store, ttls } = memoryStore()
    await new RevokedSessions(store, 900).revoke()
    expect(ttls.size).toBe(0)
  })
})
