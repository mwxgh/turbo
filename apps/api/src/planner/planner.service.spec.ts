import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '@repo/db/nest'

import { PlannerService } from './planner.service'

const userId = '11111111-1111-4111-8111-111111111111'
const id = '22222222-2222-4222-8222-222222222222'

describe('PlannerService', () => {
  let service: PlannerService
  const prisma = {
    plannerTask: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      providers: [PlannerService, { provide: PrismaService, useValue: prisma }],
    }).compile()
    service = moduleRef.get(PlannerService)
  })

  it('loads the dated tasks of the range plus the backlog', async () => {
    prisma.plannerTask.findMany.mockResolvedValue([])
    await service.findRange(userId, { from: '2026-11-01', to: '2026-11-30' })
    expect(prisma.plannerTask.findMany).toHaveBeenCalledWith({
      where: {
        userId,
        OR: [
          {
            date: {
              gte: new Date('2026-11-01T00:00:00Z'),
              lte: new Date('2026-11-30T00:00:00Z'),
            },
          },
          { date: null },
        ],
      },
      orderBy: [{ position: 'asc' }, { id: 'asc' }],
    })
  })

  it.each([
    ['2026-11-30', '2026-11-01'],
    ['2026-01-01', '2026-06-01'],
  ])('rejects the range %s → %s', async (from, to) => {
    await expect(service.findRange(userId, { from, to })).rejects.toThrow(
      'Range must be',
    )
    expect(prisma.plannerTask.findMany).not.toHaveBeenCalled()
  })

  it('creates at the end of its column with the day as a date', async () => {
    prisma.plannerTask.findFirst.mockResolvedValue({ position: 4 })
    await service.create(userId, {
      title: 'Plan',
      status: 'DOING',
      date: '2026-11-24',
    })
    expect(prisma.plannerTask.findFirst).toHaveBeenCalledWith({
      where: { userId, status: 'DOING' },
      orderBy: { position: 'desc' },
      select: { position: true },
    })
    expect(prisma.plannerTask.create).toHaveBeenCalledWith({
      data: {
        title: 'Plan',
        userId,
        status: 'DOING',
        date: new Date('2026-11-24T00:00:00Z'),
        position: 5,
      },
    })
  })

  it('keeps a given position and defaults to TODO in the backlog', async () => {
    await service.create(userId, { title: 'Later', position: 0.5 })
    expect(prisma.plannerTask.findFirst).not.toHaveBeenCalled()
    expect(prisma.plannerTask.create).toHaveBeenCalledWith({
      data: {
        title: 'Later',
        userId,
        status: 'TODO',
        date: undefined,
        position: 0.5,
      },
    })
  })

  it('updates and deletes only the owner’s task', async () => {
    await service.update(userId, id, { date: null, status: 'DONE' })
    expect(prisma.plannerTask.update).toHaveBeenCalledWith({
      where: { id, userId },
      data: { status: 'DONE', date: null },
    })
    await service.remove(userId, id)
    expect(prisma.plannerTask.delete).toHaveBeenCalledWith({
      where: { id, userId },
    })
  })
})
