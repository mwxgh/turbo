import { createHash, randomBytes } from 'node:crypto'

import { Injectable, Logger } from '@nestjs/common'

import type { CookieOptions } from 'express'

import { type OAuthProvider, Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { InjectRedis, type Redis } from '@repo/infra/redis'

import { env } from '../env'

/** Binds a pending link to the browser whose provider sign-in hit an existing account. */
export const PENDING_LINK_COOKIE = 'oauth_link'

const TTL_SECONDS = 600

/** Host-only (the api), httpOnly: another browser or site cannot plant or read it. */
export const pendingLinkCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: env.cookieSecure,
  path: '/',
})

/** A provider account waiting to be linked to `userId` once that user signs in. */
export interface PendingLink {
  userId: string
  provider: OAuthProvider
  subject: string
  email: string | null
}

const key = (token: string) =>
  `auth:oauth-link:${createHash('sha256').update(token).digest('base64url')}`

/**
 * Provider sign-in whose email matches an account, but the provider does not vouch for the email
 * (Facebook): instead of linking by email, the api remembers the provider account for
 * `TTL_SECONDS` and links it when the same browser proves it owns the account (password or a
 * linked provider).
 */
@Injectable()
export class PendingLinks {
  private readonly logger = new Logger(PendingLinks.name)

  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /** Token for the `PENDING_LINK_COOKIE`. */
  async create(link: PendingLink): Promise<string> {
    const token = randomBytes(32).toString('base64url')
    await this.redis.set(key(token), JSON.stringify(link), 'EX', TTL_SECONDS)
    return token
  }

  /** Links (once) when `userId` signed in to the account the link waits for. */
  async complete(token: string | undefined, userId: string): Promise<boolean> {
    if (!token) return false
    const raw = await this.redis.getdel(key(token))
    if (!raw) return false
    const { userId: owner, ...identity } = JSON.parse(raw) as PendingLink
    if (owner !== userId) return false
    try {
      await this.prisma.userIdentity.create({ data: { ...identity, userId } })
    } catch (error) {
      // Linked meanwhile (another flow, or to another account)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        return false
      throw error
    }
    this.logger.log(`Linked ${identity.provider} to user ${userId}`)
    return true
  }
}
