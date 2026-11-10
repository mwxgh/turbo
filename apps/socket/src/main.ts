import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { Logger as PinoLogger } from '@repo/nest-common/logger'

import { AppModule } from './app.module'
import { configureApp } from './app.setup'
import { env } from './env'

async function bootstrap() {
  const app = configureApp(
    await NestFactory.create(AppModule, { bufferLogs: true }),
  )
  // Nest's own logs (and Logger.log below) go through pino
  app.useLogger(app.get(PinoLogger))

  await app.listen(env.PORT, env.HOST)
  Logger.log(
    `Socket server listening on http://${env.HOST}:${env.PORT} (health: /socket/health)`,
    'Bootstrap',
  )
}

void bootstrap()
