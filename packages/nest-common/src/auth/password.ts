import { argon2, randomBytes, timingSafeEqual } from 'node:crypto'

/** argon2id cost. Stored with each hash, so it can be raised later (`needsRehash`). */
export interface Argon2Params {
  /** Memory in KiB. */
  m: number
  /** Passes. */
  t: number
  /** Parallelism. */
  p: number
}

/** OWASP Password Storage Cheat Sheet minimum for argon2id: 19 MiB, 2 passes, 1 lane. */
export const ARGON2_PARAMS: Argon2Params = { m: 19_456, t: 2, p: 1 }

const TAG_LENGTH = 32
const VERSION = 19

/** argon2id from Node's crypto (no native addon). */
function derive(password: string, salt: Buffer, { m, t, p }: Argon2Params) {
  return new Promise<Buffer>((resolve, reject) =>
    argon2(
      'argon2id',
      {
        message: password,
        nonce: salt,
        parallelism: p,
        tagLength: TAG_LENGTH,
        memory: m,
        passes: t,
      },
      (error, key) => (error ? reject(error) : resolve(key)),
    ),
  )
}

// PHC string format uses unpadded standard base64
const b64 = (buffer: Buffer) => buffer.toString('base64').replace(/=+$/, '')

/** PHC string: `$argon2id$v=19$m=19456,t=2,p=1$<salt>$<hash>` (readable by other argon2 libraries). */
export async function hashPassword(
  password: string,
  params: Argon2Params = ARGON2_PARAMS,
): Promise<string> {
  const salt = randomBytes(16)
  const key = await derive(password, salt, params)
  return `$argon2id$v=${VERSION}$m=${params.m},t=${params.t},p=${params.p}$${b64(salt)}$${b64(key)}`
}

function parse(stored: string) {
  const match =
    /^\$argon2id\$v=(\d+)\$m=(\d+),t=(\d+),p=(\d+)\$([A-Za-z0-9+/]+)\$([A-Za-z0-9+/]+)$/.exec(
      stored,
    )
  if (!match || Number(match[1]) !== VERSION) return null
  return {
    params: { m: Number(match[2]), t: Number(match[3]), p: Number(match[4]) },
    salt: Buffer.from(match[5]!, 'base64'),
    key: Buffer.from(match[6]!, 'base64'),
  }
}

/** Constant-time compare; `false` for a malformed or unsupported hash. */
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parsed = parse(stored)
  if (!parsed) return false
  const key = await derive(password, parsed.salt, parsed.params)
  return key.length === parsed.key.length && timingSafeEqual(key, parsed.key)
}

/** True when the hash was made with other parameters than `params` (rehash after sign-in). */
export function needsRehash(
  stored: string,
  params: Argon2Params = ARGON2_PARAMS,
): boolean {
  const parsed = parse(stored)
  return (
    !parsed ||
    parsed.params.m !== params.m ||
    parsed.params.t !== params.t ||
    parsed.params.p !== params.p
  )
}
