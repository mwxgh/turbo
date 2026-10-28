import { type ArgumentsHost, Logger } from '@nestjs/common'
import type { AbstractHttpAdapter } from '@nestjs/core'

import { describe, expect, it, vi } from 'vitest'

import { Prisma } from '../generated/prisma/client.js'
import { PrismaExceptionFilter } from './prisma-exception.filter.js'

function setup() {
  const adapter = {
    reply: vi.fn(),
    isHeadersSent: vi.fn(() => false),
    end: vi.fn(),
  }
  const host = {
    getArgByIndex: () => ({}),
    getArgs: () => [{}, {}],
    getType: () => 'http',
  } as unknown as ArgumentsHost
  const filter = new PrismaExceptionFilter(
    adapter as unknown as AbstractHttpAdapter,
  )
  return { adapter, host, filter }
}

const prismaError = (code: string) =>
  new Prisma.PrismaClientKnownRequestError('boom', {
    code,
    clientVersion: 'test',
  })

describe('PrismaExceptionFilter', () => {
  it.each([
    ['P2025', 404, 'Record not found', 'Not Found'],
    ['P2002', 409, 'Record already exists', 'Conflict'],
    ['P2003', 400, 'Invalid relation reference', 'Bad Request'],
  ])('maps %s to %i', (code, statusCode, message, error) => {
    const { adapter, host, filter } = setup()
    filter.catch(prismaError(code), host)
    expect(adapter.reply).toHaveBeenCalledWith(
      {},
      { statusCode, message, error },
      statusCode,
    )
  })

  it('logs any other Prisma error and answers a generic 500', () => {
    const log = vi.spyOn(Logger.prototype, 'error').mockImplementation(() => {})
    const { adapter, host, filter } = setup()
    filter.catch(prismaError('P9999'), host)
    expect(log).toHaveBeenCalled()
    expect(adapter.reply).toHaveBeenCalledWith(
      {},
      { statusCode: 500, message: 'Internal server error' },
      500,
    )
  })
})
