import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '../prisma/prisma.service'
import { HellosService } from './hellos.service'

const hello = {
  id: '11111111-1111-4111-8111-111111111111',
  message: 'Hi',
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
}

describe('HellosService', () => {
  let service: HellosService
  const prisma = {
    hello: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    // Prisma batches the queries; resolve them like the real client
    $transaction: vi.fn((queries: Promise<unknown>[]) => Promise.all(queries)),
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      providers: [HellosService, { provide: PrismaService, useValue: prisma }],
    }).compile()
    service = moduleRef.get(HellosService)
  })

  it('pages newest first and returns the total', async () => {
    prisma.hello.findMany.mockResolvedValue([hello])
    prisma.hello.count.mockResolvedValue(21)

    await expect(service.findAll({ page: 3, pageSize: 10 })).resolves.toEqual({
      items: [hello],
      total: 21,
      page: 3,
      pageSize: 10,
      totalPages: 3,
    })
    expect(prisma.hello.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      skip: 20,
      take: 10,
    })
    expect(prisma.hello.count).toHaveBeenCalledWith({ where: {} })
  })

  it('applies keyword, filters and sort from helloListSpec', async () => {
    prisma.hello.findMany.mockResolvedValue([])
    prisma.hello.count.mockResolvedValue(0)

    await service.findAll({
      page: 1,
      pageSize: 20,
      keyword: 'xin',
      sortBy: 'message',
      sortDir: 'asc',
      filter: { message: { startsWith: 'X' } },
    })

    const where = {
      AND: [
        { message: { startsWith: 'X', mode: 'insensitive' } },
        { OR: [{ message: { contains: 'xin', mode: 'insensitive' } }] },
      ],
    }
    expect(prisma.hello.findMany).toHaveBeenCalledWith({
      where,
      orderBy: [{ message: 'asc' }, { id: 'asc' }],
      skip: 0,
      take: 20,
    })
    expect(prisma.hello.count).toHaveBeenCalledWith({ where })
  })

  it('rejects filters the spec does not allow (→ 400)', async () => {
    await expect(
      service.findAll({ page: 1, pageSize: 20, filter: { secret: 1 } }),
    ).rejects.toThrow('Unknown filter "secret"')
    expect(prisma.hello.findMany).not.toHaveBeenCalled()
  })

  it('finds one by id (throws when missing)', async () => {
    prisma.hello.findUniqueOrThrow.mockResolvedValue(hello)
    await expect(service.findOne(hello.id)).resolves.toBe(hello)
    expect(prisma.hello.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: hello.id },
    })

    const notFound = new Error('P2025')
    prisma.hello.findUniqueOrThrow.mockRejectedValue(notFound)
    await expect(service.findOne(hello.id)).rejects.toBe(notFound)
  })

  it('creates, updates and removes', async () => {
    prisma.hello.create.mockResolvedValue(hello)
    prisma.hello.update.mockResolvedValue({ ...hello, message: 'New' })
    prisma.hello.delete.mockResolvedValue(hello)

    await expect(service.create({ message: 'Hi' })).resolves.toBe(hello)
    expect(prisma.hello.create).toHaveBeenCalledWith({
      data: { message: 'Hi' },
    })

    await expect(
      service.update(hello.id, { message: 'New' }),
    ).resolves.toMatchObject({
      message: 'New',
    })
    expect(prisma.hello.update).toHaveBeenCalledWith({
      where: { id: hello.id },
      data: { message: 'New' },
    })

    await expect(service.remove(hello.id)).resolves.toBeUndefined()
    expect(prisma.hello.delete).toHaveBeenCalledWith({
      where: { id: hello.id },
    })
  })
})
