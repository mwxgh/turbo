import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { accessTokenFrom } from '../http.js'
import { RevokedSessions } from '../revoked-sessions.js'
import { AccessTokens } from '../tokens.js'
import { type AuthRequest, IS_PUBLIC, ROLES } from './decorators.js'

/** Injection token: the access cookie name (`AuthModuleOptions.accessCookie`). */
export const AUTH_ACCESS_COOKIE = Symbol('AUTH_ACCESS_COOKIE')

/**
 * Global HTTP guard: every route needs a valid access token of a session that is not signed out
 * (`RevokedSessions`) unless it is `@Public()`.
 * WebSocket gateways authenticate at the handshake instead (`socketAuth`).
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AccessTokens) private readonly tokens: AccessTokens,
    @Inject(AUTH_ACCESS_COOKIE) private readonly accessCookie: string,
    @Inject(RevokedSessions) private readonly revoked: RevokedSessions,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true
    const targets = [context.getHandler(), context.getClass()]
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC,
      targets,
    )

    const request = context.switchToHttp().getRequest<AuthRequest>()
    const token = accessTokenFrom(request.headers, this.accessCookie)
    const verified = token ? await this.tokens.verify(token) : null
    // A signed-out session counts as no token (a @Public() route still serves it, anonymously)
    const user =
      verified && !(await this.revoked.isRevoked(verified.sessionId))
        ? verified
        : null
    if (user) request.user = user
    if (isPublic) return true
    if (!user) throw new UnauthorizedException()

    const roles = this.reflector.getAllAndOverride<string[] | undefined>(
      ROLES,
      targets,
    )
    if (roles?.length && !roles.includes(user.role))
      throw new ForbiddenException()
    return true
  }
}
