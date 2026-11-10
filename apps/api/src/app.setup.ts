import { ValidationPipe } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import helmet from 'helmet'

import { PrismaExceptionFilter } from '@repo/db/nest'
import {
  ListQueryExceptionFilter,
  VALIDATOR_OPTIONS,
  jsonReplacer,
} from '@repo/nest-common'
import {
  LoggerErrorInterceptor,
  REQUEST_ID_HEADER,
} from '@repo/nest-common/logger'
import { AppEnv } from '@repo/utils'

import { env } from './env'

/** Global HTTP setup shared by `main.ts` and the e2e tests. */
export function configureApp(
  app: NestExpressApplication,
): NestExpressApplication {
  app.setGlobalPrefix('api')
  // Security headers; CSP off where Swagger UI is served (its inline assets), JSON-only otherwise
  app.use(
    helmet({
      contentSecurityPolicy: env.APP_ENV === AppEnv.Prod ? undefined : false,
    }),
  )
  app.set('trust proxy', env.TRUST_PROXY)
  // Registered before init, so they replace Nest's default parsers (same names)
  app.useBodyParser('json', { limit: env.BODY_LIMIT })
  app.useBodyParser('urlencoded', { limit: env.BODY_LIMIT, extended: true })
  // qs parser: list filters as filter[field]=… / filter[field][op]=… (also accepts filter={json})
  app.set('query parser', 'extended')
  app.set('json replacer', jsonReplacer)
  app.useGlobalPipes(
    new ValidationPipe({
      ...VALIDATOR_OPTIONS,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(
    new PrismaExceptionFilter(app.getHttpAdapter()),
    new ListQueryExceptionFilter(),
  )
  app.enableCors({
    origin: env.corsOrigins,
    credentials: true,
    // Browsers may read the id to quote it in bug reports
    exposedHeaders: [REQUEST_ID_HEADER],
  })
  // 5xx request logs carry the error and its stack
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.enableShutdownHooks()

  // API docs on dev and stg (QA), never on prod
  if (env.APP_ENV !== AppEnv.Prod) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0')
      .build()
    SwaggerModule.setup('api/docs', app, () =>
      SwaggerModule.createDocument(app, config),
    )
  }

  return app
}
