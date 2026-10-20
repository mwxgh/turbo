import { ValidationPipe } from '@nestjs/common'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ListQueryExceptionFilter, VALIDATOR_OPTIONS } from '@repo/decorators'
import { AppEnv } from '@repo/utils'

import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter.js'
import { corsOrigins, env } from './config/env.js'

/** Global HTTP setup shared by `main.ts` and the e2e tests. */
export function configureApp(
  app: NestExpressApplication,
): NestExpressApplication {
  app.setGlobalPrefix('api')
  // qs parser: list filters as filter[field]=… / filter[field][op]=… (also accepts filter={json})
  app.set('query parser', 'extended')
  app.useGlobalPipes(
    new ValidationPipe({
      ...VALIDATOR_OPTIONS,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new ListQueryExceptionFilter(),
  )
  app.enableCors({ origin: corsOrigins, credentials: true })
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
