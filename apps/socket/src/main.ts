import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'
import { configureApp } from './app.setup.js'
import { env } from './config/env.js'

async function bootstrap() {
  const app = configureApp(await NestFactory.create(AppModule))

  await app.listen(env.PORT, env.HOST)
  Logger.log(
    `Socket server listening on http://${env.HOST}:${env.PORT}`,
    'Bootstrap',
  )
}

void bootstrap()
