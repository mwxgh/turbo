import { describe, expect, it } from 'vitest'

import { hashPassword, needsRehash, verifyPassword } from './password.js'

// Low cost keeps the tests fast; the hash records its own parameters
const FAST = { m: 1024, t: 1, p: 1 }

describe('password hashing (argon2id)', () => {
  it('verifies the right password only', async () => {
    const hash = await hashPassword('correct horse', FAST)
    expect(hash).toMatch(
      /^\$argon2id\$v=19\$m=1024,t=1,p=1\$[A-Za-z0-9+/]{22}\$[A-Za-z0-9+/]{43}$/,
    )
    expect(await verifyPassword('correct horse', hash)).toBe(true)
    expect(await verifyPassword('wrong horse', hash)).toBe(false)
  })

  it('verifies a hash from another argon2 implementation (RFC 9106 / PHC format)', async () => {
    // argon2-cli: echo -n password | argon2 somesalt -id -t 2 -m 16 -p 1 -l 32 -e
    const reference =
      '$argon2id$v=19$m=65536,t=2,p=1$c29tZXNhbHQ$CTFhFdXPJO1aFaMaO6Mm5c8y7cJHAph8ArZWb2GRPPc'
    expect(await verifyPassword('password', reference)).toBe(true)
  })

  it('salts every hash', async () => {
    expect(await hashPassword('same', FAST)).not.toBe(
      await hashPassword('same', FAST),
    )
  })

  it('rejects malformed hashes instead of throwing', async () => {
    expect(await verifyPassword('x', 'not-a-hash')).toBe(false)
    expect(
      await verifyPassword('x', '$argon2i$v=19$m=8,t=1,p=1$YWJj$YWJj'),
    ).toBe(false)
  })

  it('flags hashes made with other parameters', async () => {
    const hash = await hashPassword('x', FAST)
    expect(needsRehash(hash, FAST)).toBe(false)
    expect(needsRehash(hash)).toBe(true)
    expect(needsRehash('garbage')).toBe(true)
  })
})
