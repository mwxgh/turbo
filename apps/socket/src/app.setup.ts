import type { INestApplication } from '@nestjs/common'

import { REDIS, type Redis } from '@repo/redis'

import { RedisIoAdapter } from './common/redis-io.adapter'
import { env } from './config/env'

/** Global setup shared by `main.ts` and the e2e tests. */
export function configureApp(app: INestApplication): INestApplication {
  app.enableCors({ origin: env.corsOrigins, credentials: true })
  app.enableShutdownHooks()
  // Rooms span every socket instance (scale out behind a load balancer)
  app.useWebSocketAdapter(
    new RedisIoAdapter(
      app,
      app.get<Redis>(REDIS),
      `${env.redisKeyPrefix}socket.io`,
    ),
  )
  return app
}
