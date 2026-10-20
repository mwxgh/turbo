import type { INestApplication } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'

import { AppModule } from '../src/app.module.js'
import { configureApp } from '../src/app.setup.js'
import { PrismaService } from '../src/prisma/prisma.service.js'

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
