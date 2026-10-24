import type { ArgumentsHost } from '@nestjs/common'

import { describe, expect, it, vi } from 'vitest'

import { Prisma } from '@repo/db'

import { PrismaExceptionFilter } from './prisma-exception.filter'

function hostWithResponse() {
  const res = { status: vi.fn(), json: vi.fn() }
  res.status.mockReturnValue(res)
  const host = {
    switchToHttp: () => ({ getResponse: () => res }),
  } as unknown as ArgumentsHost
  return { host, res }
}

const prismaError = (code: string) =>
  new Prisma.PrismaClientKnownRequestError('boom', {
    code,
    clientVersion: 'test',
  })

describe('PrismaExceptionFilter', () => {
  it.each([
    ['P2025', 404, 'Record not found'],
    ['P2002', 409, 'Record already exists'],
    ['P2003', 400, 'Invalid relation reference'],
    ['P9999', 500, 'Database error'],
  ])('maps %s to %i', (code, status, message) => {
    const { host, res } = hostWithResponse()
    new PrismaExceptionFilter().catch(prismaError(code), host)
    expect(res.status).toHaveBeenCalledWith(status)
    expect(res.json).toHaveBeenCalledWith({ statusCode: status, message })
  })
})
