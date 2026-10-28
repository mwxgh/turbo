import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { configureApp } from './app.setup'
import { env } from './env'

async function bootstrap() {
  const app = configureApp(
    await NestFactory.create<NestExpressApplication>(AppModule),
  )

  await app.listen(env.PORT, env.HOST)
  Logger.log(
    `API listening on http://${env.HOST}:${env.PORT}/api (docs: /api/docs)`,
    'Bootstrap',
  )
}

void bootstrap()
