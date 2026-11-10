import { randomUUID } from 'node:crypto'

import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import {
  AccessTokens,
  type AuthUser,
  createRefreshToken,
  hashPassword,
  needsRehash,
  parseRefreshToken,
  verifyPassword,
} from '@repo/auth'
import type { User } from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import { AuthRegistration, env } from '../env'
import type { ChangePasswordDto } from './dto/change-password.dto'
import type { LoginDto } from './dto/login.dto'
import type { RegisterDto } from './dto/register.dto'

/** Who is signing in, stored on the session. */
export interface ClientMeta {
  ip?: string
  userAgent?: string
}

/** A signed-in session: the user and both tokens (the controller decides how to send them). */
export interface IssuedSession {
  user: Omit<User, 'passwordHash'>
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/** Never sent to clients or kept in memory longer than needed. */
const OMIT_SECRET = { passwordHash: true } as const

/** A refresh token replaced less than this ago is still accepted once (two tabs refreshing at once). */
const ROTATION_GRACE_MS = 60_000

const DAY_MS = 86_400_000

/**
 * Provider-agnostic sessions: password sign-in today; SSO (Keycloak / OIDC) only has to find or
 * create the `User` and call `issue()`.
 */
@Injectable()
export class AuthService {
  /** Compared against when the user does not exist, so timing does not reveal accounts. */
  private readonly dummyHash = hashPassword('timing-equaliser')

  constructor(
    private readonly prisma: PrismaService,
    @Inject(AccessTokens) private readonly tokens: AccessTokens,
  ) {}

  async register(dto: RegisterDto, meta: ClientMeta): Promise<IssuedSession> {
    if (env.AUTH_REGISTRATION !== AuthRegistration.Open)
      throw new ForbiddenException('Registration is closed')
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        name: dto.name,
        passwordHash: await hashPassword(dto.password),
      },
      omit: OMIT_SECRET,
    }) // duplicate email / username → 409 (PrismaExceptionFilter)
    return this.issue(user, meta)
  }

  async login({ login, password }: LoginDto, meta: ClientMeta) {
    const found = await this.prisma.user.findUnique({
      where: login.includes('@') ? { email: login } : { username: login },
    })
    const valid = await verifyPassword(
      password,
      found?.passwordHash ?? (await this.dummyHash),
    )
    if (!found?.passwordHash || !valid || found.disabledAt)
      throw new UnauthorizedException('Invalid login or password')
    const { passwordHash, ...user } = found
    if (needsRehash(passwordHash))
      await this.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: await hashPassword(password) },
      })
    return this.issue(user, meta)
  }

  /** New session (device) for a user who proved who they are. */
  async issue(
    user: IssuedSession['user'],
    meta: ClientMeta,
  ): Promise<IssuedSession> {
    const id = randomUUID()
    const { token, hash } = createRefreshToken(id)
    await this.prisma.session.create({
      data: {
        id,
        userId: user.id,
        tokenHash: hash,
        expiresAt: this.refreshExpiry(),
        ...this.client(meta),
      },
    })
    return this.tokensFor(user, id, token)
  }

  /**
   * Rotates the refresh token. A token that is neither the current one nor the one replaced
   * within the grace period has been reused (stolen copy): the whole session is revoked.
   */
  async refresh(
    refreshToken: string | undefined,
    meta: ClientMeta,
  ): Promise<IssuedSession> {
    const parsed = refreshToken ? parseRefreshToken(refreshToken) : null
    if (!parsed) throw new UnauthorizedException()
    const session = await this.prisma.session.findUnique({
      where: { id: parsed.sessionId },
      include: { user: { omit: OMIT_SECRET } },
    })
    const now = Date.now()
    if (
      !session ||
      session.revokedAt ||
      session.expiresAt.getTime() <= now ||
      session.user.disabledAt
    )
      throw new UnauthorizedException()

    const isCurrent = session.tokenHash === parsed.hash
    const isRecent =
      session.prevTokenHash === parsed.hash &&
      !!session.rotatedAt &&
      now - session.rotatedAt.getTime() < ROTATION_GRACE_MS
    if (!isCurrent && !isRecent) {
      await this.revoke(session.id)
      throw new UnauthorizedException()
    }

    const { token, hash } = createRefreshToken(session.id)
    // Conditional on the hash we read: a concurrent refresh that won the race makes this one retry
    const { count } = await this.prisma.session.updateMany({
      where: { id: session.id, tokenHash: session.tokenHash, revokedAt: null },
      data: {
        tokenHash: hash,
        prevTokenHash: isCurrent ? session.tokenHash : session.prevTokenHash,
        rotatedAt: new Date(now),
        expiresAt: this.refreshExpiry(),
        ...this.client(meta),
      },
    })
    if (count === 0) return this.refresh(refreshToken, meta)
    return this.tokensFor(session.user, session.id, token)
  }

  /** Ends the session of this refresh token (no error if it is unknown or already ended). */
  async logout(refreshToken: string | undefined): Promise<void> {
    const parsed = refreshToken ? parseRefreshToken(refreshToken) : null
    if (!parsed) return
    await this.prisma.session.updateMany({
      where: {
        id: parsed.sessionId,
        revokedAt: null,
        OR: [{ tokenHash: parsed.hash }, { prevTokenHash: parsed.hash }],
      },
      data: { revokedAt: new Date() },
    })
  }

  async me({ id }: AuthUser) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: OMIT_SECRET,
    })
    if (!user || user.disabledAt) throw new UnauthorizedException()
    return user
  }

  /** Changes the password and signs out every other device. */
  async changePassword(
    { id, sessionId }: AuthUser,
    { currentPassword, newPassword }: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (
      !user?.passwordHash ||
      !(await verifyPassword(currentPassword, user.passwordHash))
    )
      throw new BadRequestException('Current password is incorrect')
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { passwordHash: await hashPassword(newPassword) },
      }),
      this.prisma.session.updateMany({
        where: { userId: id, id: { not: sessionId }, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ])
  }

  private revoke(sessionId: string) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
  }

  private async tokensFor(
    user: IssuedSession['user'],
    sessionId: string,
    refreshToken: string,
  ): Promise<IssuedSession> {
    const accessToken = await this.tokens.sign({
      id: user.id,
      sessionId,
      role: user.role,
    })
    return {
      user,
      accessToken,
      refreshToken,
      expiresIn: this.tokens.ttlSeconds,
    }
  }

  private refreshExpiry() {
    return new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * DAY_MS)
  }

  private client({ ip, userAgent }: ClientMeta) {
    return { ip: ip?.slice(0, 45), userAgent: userAgent?.slice(0, 255) }
  }
}
