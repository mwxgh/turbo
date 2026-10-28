import type { INestApplication } from '@nestjs/common'

import { REDIS, type Redis } from '@repo/redis'
import { RedisIoAdapter } from '@repo/redis/socket-io'

import { env } from './env'

/** Global setup shared by `main.ts` and the e2e tests. */
export function configureApp(app: INestApplication): INestApplication {
  // HTTP routes only (e.g. /socket/health); Socket.IO keeps /socket.io + namespace /events
  app.setGlobalPrefix('socket')
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
