import { BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '@repo/db/nest'

import { AdminLessonsService } from './admin-lessons.service'

const ID = '11111111-1111-4111-8111-111111111111'
const lesson = { moduleId: ID, slug: 'word-form', title: 'Từ loại' }

describe('AdminLessonsService', () => {
  let service: AdminLessonsService
  const prisma = {
    lingoLessonModule: {
      create: vi.fn(),
      findUniqueOrThrow: vi.fn(),
    },
    lingoLesson: { create: vi.fn(), update: vi.fn() },
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    prisma.lingoLessonModule.findUniqueOrThrow.mockResolvedValue({
      exam: 'TOEIC_LR',
    })
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminLessonsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile()
    service = moduleRef.get(AdminLessonsService)
  })

  it('saves a lesson whose parts and practice exist in the exam', async () => {
    const data = {
      ...lesson,
      parts: ['P5'],
      practicePart: 'P5',
      practiceSkillTag: 'grammar.word-form',
    }
    await service.createLesson(data)
    expect(prisma.lingoLesson.create).toHaveBeenCalledWith({ data })
  })

  it.each([
    [{ parts: ['P9'] }, 'Unknown part P9'],
    [{ practicePart: 'P9' }, 'Unknown practice part P9'],
    [{ practiceSkillTag: 'grammar.word-form' }, 'needs a practice part'],
    [{ practicePart: 'P5', practiceSkillTag: 'nope' }, 'Unknown skill tag'],
  ])('rejects %j', async (extra, message) => {
    const saving = service.updateLesson(ID, { ...lesson, ...extra })
    await expect(saving).rejects.toBeInstanceOf(BadRequestException)
    await expect(saving).rejects.toMatchObject({
      response: { message: [expect.stringContaining(message)] },
    })
    expect(prisma.lingoLesson.update).not.toHaveBeenCalled()
  })

  it('rejects a module of an unknown exam', () => {
    expect(() =>
      service.createModule({ exam: 'NOPE', slug: 'x', title: 'X' }),
    ).toThrow('Unknown exam')
    expect(prisma.lingoLessonModule.create).not.toHaveBeenCalled()
  })
})
