import {
  type ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common'

import type { AuthUser } from '../tokens.js'

export const IS_PUBLIC = 'auth:public'
export const ROLES = 'auth:roles'

/** Open a route or controller to anonymous callers (the guard still reads a valid token if sent). */
export const Public = () => SetMetadata(IS_PUBLIC, true)

/** Only users with one of these roles (403 otherwise), e.g. `@Roles(Role.ADMIN)`. */
export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles)

/** Request with the user the guard attached. */
export interface AuthRequest {
  user?: AuthUser
  headers: { authorization?: string; cookie?: string }
}

/** The signed-in user (`undefined` only on `@Public()` routes without a token). */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser | undefined =>
    context.switchToHttp().getRequest<AuthRequest>().user,
)
