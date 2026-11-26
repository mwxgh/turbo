import { BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '@repo/db/nest'

import { AdminLearnService } from './admin-learn.service'

const ID = '11111111-1111-4111-8111-111111111111'
const lesson = { slug: 'intro', title: 'Intro' }

describe('AdminLearnService', () => {
  let service: AdminLearnService
  const prisma = {
    studioLesson: { create: vi.fn(), update: vi.fn() },
    studioRoadmap: { update: vi.fn() },
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminLearnService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile()
    service = moduleRef.get(AdminLearnService)
  })

  it('creates a lesson with its quiz in order', async () => {
    await service.createLesson(ID, {
      ...lesson,
      questions: [{ prompt: 'Q?', choices: ['a', 'b'], answer: 1 }],
    })
    expect(prisma.studioLesson.create).toHaveBeenCalledWith({
      data: {
        ...lesson,
        trackId: ID,
        questions: {
          create: [{ prompt: 'Q?', choices: ['a', 'b'], answer: 1, order: 0 }],
        },
      },
    })
  })

  it('replaces the quiz only when questions are sent', async () => {
    await service.updateLesson(ID, lesson)
    expect(prisma.studioLesson.update).toHaveBeenLastCalledWith({
      where: { id: ID },
      data: lesson,
    })
    await service.updateLesson(ID, { ...lesson, questions: [] })
    expect(prisma.studioLesson.update).toHaveBeenLastCalledWith({
      where: { id: ID },
      data: { ...lesson, questions: { deleteMany: {}, create: [] } },
    })
  })

  it('refuses an answer outside the choices', () => {
    expect(() =>
      service.createLesson(ID, {
        ...lesson,
        questions: [{ prompt: 'Q?', choices: ['a', 'b'], answer: 2 }],
      }),
    ).toThrow(BadRequestException)
    expect(prisma.studioLesson.create).not.toHaveBeenCalled()
  })

  it('replaces roadmap steps in the order sent', async () => {
    await service.updateRoadmap(ID, {
      slug: 'web',
      title: 'Web',
      steps: [{ title: 'HTML' }, { title: 'CSS', trackId: null }],
    })
    expect(prisma.studioRoadmap.update).toHaveBeenCalledWith({
      where: { id: ID },
      data: {
        slug: 'web',
        title: 'Web',
        steps: {
          deleteMany: {},
          create: [
            { title: 'HTML', order: 0 },
            { title: 'CSS', trackId: null, order: 1 },
          ],
        },
      },
    })
  })
})
