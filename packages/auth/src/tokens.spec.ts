import { describe, expect, it, vi } from 'vitest'

import {
  AccessTokens,
  createRefreshToken,
  hashToken,
  parseRefreshToken,
} from './tokens.js'

const SECRET = 'x'.repeat(32)
const user = { id: 'user-1', sessionId: 'session-1', role: 'USER' }

describe('AccessTokens', () => {
  it('round-trips the user', async () => {
    const tokens = new AccessTokens(SECRET, 60)
    expect(await tokens.verify(await tokens.sign(user))).toEqual(user)
  })

  it('rejects tokens signed with another secret, garbage and expired ones', async () => {
    const tokens = new AccessTokens(SECRET, 60)
    const other = new AccessTokens('y'.repeat(32), 60)
    expect(await tokens.verify(await other.sign(user))).toBeNull()
    expect(await tokens.verify('not.a.jwt')).toBeNull()

    vi.useFakeTimers()
    const token = await tokens.sign(user)
    vi.advanceTimersByTime(61_000)
    expect(await tokens.verify(token)).toBeNull()
    vi.useRealTimers()
  })

  it('refuses short secrets', () => {
    expect(() => new AccessTokens('short', 60)).toThrow(/32 characters/)
  })
})

describe('refresh tokens', () => {
  const sessionId = '11111111-1111-4111-8111-111111111111'

  it('are <sessionId>.<secret>, stored as a hash', () => {
    const { token, hash } = createRefreshToken(sessionId)
    expect(token.startsWith(`${sessionId}.`)).toBe(true)
    expect(hash).toBe(hashToken(token.slice(sessionId.length + 1)))
    expect(parseRefreshToken(token)).toEqual({ sessionId, hash })
  })

  it('parse rejects malformed tokens', () => {
    expect(parseRefreshToken('')).toBeNull()
    expect(parseRefreshToken('no-dot')).toBeNull()
    expect(parseRefreshToken(`not-a-uuid.${'s'.repeat(43)}`)).toBeNull()
    expect(parseRefreshToken(`${sessionId}.short`)).toBeNull()
  })
})
