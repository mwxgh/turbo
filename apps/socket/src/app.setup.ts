import type { INestApplication } from '@nestjs/common'

import { corsOrigins } from './config/env.js'

/** Global setup shared by `main.ts` and the e2e tests. */
export function configureApp(app: INestApplication): INestApplication {
  app.enableCors({ origin: corsOrigins, credentials: true })
  app.enableShutdownHooks()
  return app
}
