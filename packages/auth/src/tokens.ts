import { createHash, randomBytes } from 'node:crypto'

import { SignJWT, jwtVerify } from 'jose'

/** The signed-in user as guards, decorators and gateways see it (from the access token). */
export interface AuthUser {
  id: string
  sessionId: string
  role: string
}

const ALGORITHM = 'HS256'

/** Short-lived access JWTs (HS256): `sub` = user id, `sid` = session id, `role`. */
export class AccessTokens {
  private readonly key: Uint8Array

  constructor(
    secret: string,
    readonly ttlSeconds: number,
    private readonly issuer = 'turbo-base',
  ) {
    if (secret.length < 32)
      throw new Error('JWT secret must be at least 32 characters')
    this.key = new TextEncoder().encode(secret)
  }

  sign(user: AuthUser): Promise<string> {
    return new SignJWT({ sid: user.sessionId, role: user.role })
      .setProtectedHeader({ alg: ALGORITHM })
      .setSubject(user.id)
      .setIssuer(this.issuer)
      .setIssuedAt()
      .setExpirationTime(`${this.ttlSeconds}s`)
      .sign(this.key)
  }

  /** The user, or `null` when the token is malformed, forged or expired. */
  async verify(token: string): Promise<AuthUser | null> {
    try {
      const { payload } = await jwtVerify(token, this.key, {
        algorithms: [ALGORITHM],
        issuer: this.issuer,
      })
      if (
        typeof payload.sub !== 'string' ||
        typeof payload.sid !== 'string' ||
        typeof payload.role !== 'string'
      )
        return null
      return { id: payload.sub, sessionId: payload.sid, role: payload.role }
    } catch {
      return null
    }
  }
}

/** sha256 hex: what the database stores instead of a refresh secret. */
export const hashToken = (secret: string) =>
  createHash('sha256').update(secret).digest('hex')

/** A new refresh token `<sessionId>.<secret>` and the hash to store. */
export function createRefreshToken(sessionId: string) {
  const secret = randomBytes(32).toString('base64url')
  return { token: `${sessionId}.${secret}`, hash: hashToken(secret) }
}

/** `{ sessionId, hash }` of a refresh token, or `null` when it is malformed. */
export function parseRefreshToken(token: string) {
  const dot = token.indexOf('.')
  const sessionId = token.slice(0, dot)
  const secret = token.slice(dot + 1)
  if (dot < 1 || !/^[0-9a-f-]{36}$/.test(sessionId) || secret.length < 32)
    return null
  return { sessionId, hash: hashToken(secret) }
}
