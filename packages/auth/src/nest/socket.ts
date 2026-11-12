import type { Socket } from 'socket.io'

import { accessTokenFrom } from '../http.js'
import type { RevokedSessions } from '../revoked-sessions.js'
import type { AccessTokens, AuthUser } from '../tokens.js'

/** Error message clients get in `connect_error` (refresh the session, then reconnect). */
export const SOCKET_UNAUTHORIZED = 'unauthorized'

/**
 * Socket.IO middleware: the handshake must carry an access token, as `auth: { token }` (native
 * clients) or the access cookie (browsers, `withCredentials: true`), of a session that is not
 * signed out. Sets `socket.data.user`. Checked at connection time only: an open connection is
 * not closed when its session ends.
 *
 *   afterInit(server: Server) {
 *     server.use(socketAuth(this.tokens, this.revoked, env.authCookies.access))
 *   }
 */
export function socketAuth(
  tokens: AccessTokens,
  revoked: RevokedSessions,
  accessCookie: string,
) {
  return (socket: Socket, next: (error?: Error) => void) => {
    const auth = socket.handshake.auth as { token?: unknown }
    const token =
      typeof auth.token === 'string'
        ? auth.token
        : accessTokenFrom(socket.handshake.headers, accessCookie)
    const check = async (): Promise<AuthUser | null> => {
      const user = token ? await tokens.verify(token) : null
      return user && !(await revoked.isRevoked(user.sessionId)) ? user : null
    }
    check().then(
      (user) => {
        if (!user) return next(new Error(SOCKET_UNAUTHORIZED))
        ;(socket.data as { user?: AuthUser }).user = user
        next()
      },
      // Revocation list unreachable: refuse (fail closed) with the error Socket.IO reports
      (error: Error) => next(error),
    )
  }
}
