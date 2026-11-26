import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '@repo/db/nest'

import { LearnService, quizPassed } from './learn.service'

const USER = '11111111-1111-4111-8111-111111111111'
const LESSON = '22222222-2222-4222-8222-222222222222'
const questions = [
  { id: 'q1', answer: 0, explanation: 'a' },
  { id: 'q2', answer: 1, explanation: 'b' },
  { id: 'q3', answer: 2, explanation: 'c' },
]

describe('LearnService', () => {
  let service: LearnService
  const prisma = {
    studioTrack: { findMany: vi.fn(), findFirst: vi.fn() },
    studioLesson: { findFirst: vi.fn(), findUniqueOrThrow: vi.fn() },
    studioRoadmap: { findMany: vi.fn(), findFirst: vi.fn() },
    studioProgress: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      upsert: vi.fn(),
      count: vi.fn(),
    },
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    prisma.studioProgress.upsert.mockImplementation(
      ({ create }: { create: object }) => Promise.resolve(create),
    )
    const moduleRef = await Test.createTestingModule({
      providers: [LearnService, { provide: PrismaService, useValue: prisma }],
    }).compile()
    service = moduleRef.get(LearnService)
  })

  it('passes a quiz from 70% right answers', () => {
    expect(quizPassed(2, 3)).toBe(false)
    expect(quizPassed(7, 10)).toBe(true)
    expect(quizPassed(0, 0)).toBe(false)
  })

  it('counts finished lessons per track', async () => {
    prisma.studioTrack.findMany.mockResolvedValue([
      { id: 't1', slug: 'ts', lessons: [{ id: 'a' }, { id: 'b' }] },
      { id: 't2', slug: 'go', lessons: [] },
    ])
    prisma.studioProgress.findMany.mockResolvedValue([{ lessonId: 'b' }])

    await expect(service.tracks(USER)).resolves.toEqual([
      { id: 't1', slug: 'ts', lessons: 2, done: 1 },
      { id: 't2', slug: 'go', lessons: 0, done: 0 },
    ])
    expect(prisma.studioProgress.findMany).toHaveBeenCalledWith({
      where: {
        userId: USER,
        lessonId: { in: ['a', 'b'] },
        completedAt: { not: null },
      },
      select: { lessonId: true },
    })
  })

  it('links the previous and next lesson, and 404s an unknown one', async () => {
    prisma.studioTrack.findFirst.mockResolvedValue({
      id: 't1',
      slug: 'ts',
      title: 'TypeScript',
      category: 'LANGUAGE',
      lessons: [
        { id: 'a', slug: 'intro', title: 'Intro' },
        { id: 'b', slug: 'types', title: 'Types' },
      ],
    })
    prisma.studioLesson.findUniqueOrThrow.mockResolvedValue({
      id: 'b',
      slug: 'types',
      questions: [],
    })
    prisma.studioProgress.findUnique.mockResolvedValue(null)

    await expect(service.lesson(USER, 'ts', 'types')).resolves.toMatchObject({
      id: 'b',
      track: { slug: 'ts', title: 'TypeScript' },
      done: false,
      previous: { slug: 'intro', title: 'Intro' },
      next: null,
    })
    await expect(service.lesson(USER, 'ts', 'nope')).rejects.toBeInstanceOf(
      NotFoundException,
    )
  })

  it('grades a quiz, finishes the lesson when passed', async () => {
    prisma.studioLesson.findFirst.mockResolvedValue({ id: LESSON, questions })
    prisma.studioProgress.findUnique.mockResolvedValue(null)

    const result = await service.submitQuiz(USER, LESSON, [0, 1, 2])

    expect(result).toMatchObject({
      score: 3,
      total: 3,
      passed: true,
      done: true,
    })
    expect(result.results[1]).toEqual({
      id: 'q2',
      chosen: 1,
      answer: 1,
      correct: true,
      explanation: 'b',
    })
  })

  it('keeps the best score and an earlier completion', async () => {
    prisma.studioLesson.findFirst.mockResolvedValue({ id: LESSON, questions })
    const completedAt = new Date('2026-11-01')
    prisma.studioProgress.findUnique.mockResolvedValue({
      completedAt,
      quizScore: 3,
      quizTotal: 3,
    })

    const result = await service.submitQuiz(USER, LESSON, [1, 0, 0])

    expect(result).toMatchObject({ score: 0, passed: false, done: true })
    expect(prisma.studioProgress.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        update: { completedAt, quizScore: 3, quizTotal: 3 },
      }),
    )
  })

  it('refuses a quiz with the wrong number of answers or none to take', async () => {
    prisma.studioLesson.findFirst.mockResolvedValueOnce({
      id: LESSON,
      questions,
    })
    await expect(service.submitQuiz(USER, LESSON, [0])).rejects.toBeInstanceOf(
      BadRequestException,
    )
    prisma.studioLesson.findFirst.mockResolvedValueOnce({
      id: LESSON,
      questions: [],
    })
    await expect(service.submitQuiz(USER, LESSON, [])).rejects.toBeInstanceOf(
      BadRequestException,
    )
    prisma.studioLesson.findFirst.mockResolvedValueOnce(null)
    await expect(service.setDone(USER, LESSON, true)).rejects.toBeInstanceOf(
      NotFoundException,
    )
  })

  it('counts roadmap progress over published tracks only', async () => {
    prisma.studioRoadmap.findMany.mockResolvedValue([
      {
        slug: 'backend',
        title: 'Backend',
        summary: '',
        steps: [
          {
            track: { status: 'PUBLISHED', lessons: [{ id: 'a' }, { id: 'b' }] },
          },
          { track: { status: 'DRAFT', lessons: [{ id: 'c' }] } },
          { track: null },
        ],
      },
    ])
    prisma.studioProgress.findMany.mockResolvedValue([{ lessonId: 'a' }])

    await expect(service.roadmaps(USER)).resolves.toEqual([
      {
        slug: 'backend',
        title: 'Backend',
        summary: '',
        steps: 3,
        lessons: 2,
        done: 1,
      },
    ])
  })
})
