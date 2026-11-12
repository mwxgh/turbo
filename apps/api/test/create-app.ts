import { randomUUID } from 'node:crypto'

import type { INestApplication } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'

import { AccessTokens } from '@repo/auth'
import { PrismaService } from '@repo/db/nest'

import { AppModule } from '../src/app.module'
import { configureApp } from '../src/app.setup'

/** The real application (same global setup as main.ts) on the test database. */
export async function createApp(): Promise<{
  app: INestApplication
  prisma: PrismaService
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  const app = configureApp(
    moduleRef.createNestApplication<NestExpressApplication>({ logger: false }),
  )
  await app.init()
  return { app, prisma: app.get(PrismaService) }
}

/**
 * `Authorization` header of a signed-in user, for routes behind the global auth guard. The guard
 * verifies the JWT and that its session is not revoked (a fresh random one never is), so no user
 * or session row is needed (auth.e2e-spec.ts covers real sign-in).
 */
export async function bearer(
  app: INestApplication,
  role: 'USER' | 'ADMIN' = 'USER',
): Promise<string> {
  const token = await app
    .get(AccessTokens)
    .sign({ id: randomUUID(), sessionId: randomUUID(), role })
  return `Bearer ${token}`
}
