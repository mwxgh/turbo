import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  type HttpException,
  NotFoundException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

import { Prisma } from '../generated/prisma/client.js'

const HTTP_BY_CODE: Record<string, () => HttpException> = {
  P2025: () => new NotFoundException('Record not found'),
  P2002: () => new ConflictException('Record already exists'),
  P2003: () => new BadRequestException('Invalid relation reference'),
}

/**
 * Known Prisma errors → 404/409/400 in Nest's usual error body; any other
 * Prisma error falls through to Nest (logged, generic 500).
 * Needs the HTTP adapter: `new PrismaExceptionFilter(app.getHttpAdapter())`.
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    super.catch(HTTP_BY_CODE[err.code]?.() ?? err, host)
  }
}
