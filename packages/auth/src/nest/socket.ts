import type { Socket } from 'socket.io'

import { accessTokenFrom } from '../http.js'
import type { AccessTokens, AuthUser } from '../tokens.js'

/** Error message clients get in `connect_error` (refresh the session, then reconnect). */
export const SOCKET_UNAUTHORIZED = 'unauthorized'

/**
 * Socket.IO middleware: the handshake must carry an access token, as `auth: { token }` (native
 * clients) or the access cookie (browsers, `withCredentials: true`). Sets `socket.data.user`.
 *
 *   afterInit(server: Server) { server.use(socketAuth(this.tokens, env.authCookies.access)) }
 */
export function socketAuth(tokens: AccessTokens, accessCookie: string) {
  return (socket: Socket, next: (error?: Error) => void) => {
    const auth = socket.handshake.auth as { token?: unknown }
    const token =
      typeof auth.token === 'string'
        ? auth.token
        : accessTokenFrom(socket.handshake.headers, accessCookie)
    void (token ? tokens.verify(token) : Promise.resolve(null)).then(
      (user: AuthUser | null) => {
        if (!user) return next(new Error(SOCKET_UNAUTHORIZED))
        ;(socket.data as { user?: AuthUser }).user = user
        next()
      },
    )
  }
}
