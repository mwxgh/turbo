import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'

import type { Response } from 'express'

import { Prisma } from '@repo/db'

const STATUS_BY_CODE: Record<string, [HttpStatus, string]> = {
  P2025: [HttpStatus.NOT_FOUND, 'Record not found'],
  P2002: [HttpStatus.CONFLICT, 'Record already exists'],
  P2003: [HttpStatus.BAD_REQUEST, 'Invalid relation reference'],
}

/** Maps known Prisma errors to HTTP responses instead of a generic 500. */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const [status, message] = STATUS_BY_CODE[err.code] ?? [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Database error',
    ]
    host
      .switchToHttp()
      .getResponse<Response>()
      .status(status)
      .json({ statusCode: status, message })
  }
}
