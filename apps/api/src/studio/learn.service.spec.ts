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
      {
        id: 't1',
        slug: 'ts',
        lessons: [
          { id: 'a', level: 'BASIC' },
          { id: 'b', level: 'ADVANCED' },
          { id: 'c', level: 'BASIC' },
        ],
      },
      { id: 't2', slug: 'go', lessons: [] },
    ])
    prisma.studioProgress.findMany.mockResolvedValue([{ lessonId: 'b' }])

    await expect(service.tracks(USER)).resolves.toEqual([
      {
        id: 't1',
        slug: 'ts',
        lessons: 3,
        done: 1,
        // Easiest first, only the levels the track has
        levels: [
          { level: 'BASIC', lessons: 2, done: 0 },
          { level: 'ADVANCED', lessons: 1, done: 1 },
        ],
      },
      { id: 't2', slug: 'go', lessons: 0, done: 0, levels: [] },
    ])
    expect(prisma.studioProgress.findMany).toHaveBeenCalledWith({
      where: {
        userId: USER,
        lessonId: { in: ['a', 'b', 'c'] },
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

  it('gives each roadmap lesson its state, counting published tracks only', async () => {
    prisma.studioRoadmap.findFirst.mockResolvedValue({
      slug: 'backend',
      title: 'Backend',
      summary: '',
      steps: [
        {
          id: 's1',
          title: 'Ngôn ngữ',
          description: '',
          track: {
            slug: 'ts',
            title: 'TypeScript',
            category: 'LANGUAGE',
            status: 'PUBLISHED',
            lessons: [
              { id: 'a', slug: 'a', title: 'A' },
              { id: 'b', slug: 'b', title: 'B' },
              { id: 'c', slug: 'c', title: 'C' },
            ],
          },
        },
        {
          id: 's2',
          title: 'Nháp',
          description: '',
          track: {
            slug: 'x',
            title: 'X',
            category: 'TOOL',
            status: 'DRAFT',
            lessons: [{ id: 'd', slug: 'd', title: 'D' }],
          },
        },
      ],
    })
    prisma.studioProgress.findMany.mockResolvedValue([
      { lessonId: 'a', completedAt: new Date() },
      { lessonId: 'b', completedAt: null },
    ])

    const roadmap = await service.roadmap(USER, 'backend')

    expect(roadmap.steps[0]!.track).toEqual({
      slug: 'ts',
      title: 'TypeScript',
      category: 'LANGUAGE',
      lessons: 3,
      done: 1,
      items: [
        { slug: 'a', title: 'A', state: 'done' },
        { slug: 'b', title: 'B', state: 'started' },
        { slug: 'c', title: 'C', state: 'todo' },
      ],
    })
    expect(roadmap.steps[1]!.track).toBeNull()
    expect(prisma.studioProgress.findMany).toHaveBeenCalledWith({
      where: { userId: USER, lessonId: { in: ['a', 'b', 'c'] } },
      select: { lessonId: true, completedAt: true },
    })
  })

  describe('garden', () => {
    // 12:00 on 2026-11-18 in Vietnam
    const now = new Date('2026-11-18T05:00:00Z')
    const at = (iso: string) => new Date(iso)
    const lesson = (slug: string) => ({
      slug,
      title: slug.toUpperCase(),
      track: { slug: 'ts', title: 'TypeScript' },
    })

    it('grows a leaf per finished lesson, a flower per track, a fruit per roadmap', async () => {
      prisma.studioProgress.findMany.mockImplementation(
        ({ select }: { select: Record<string, unknown> }) =>
          Promise.resolve(
            'lesson' in select
              ? [
                  // finished later, touched earlier: leaves follow completion order
                  {
                    completedAt: at('2026-11-17T03:00:00Z'),
                    updatedAt: at('2026-11-16T03:00:00Z'),
                    lesson: lesson('b'),
                  },
                  {
                    completedAt: at('2026-11-16T02:00:00Z'),
                    updatedAt: at('2026-11-17T04:00:00Z'),
                    lesson: lesson('a'),
                  },
                  // opened, not finished: a study day, no leaf
                  {
                    completedAt: null,
                    updatedAt: at('2026-11-18T01:00:00Z'),
                    lesson: lesson('c'),
                  },
                ]
              : [{ lessonId: 'a' }, { lessonId: 'b' }],
          ),
      )
      prisma.studioTrack.findMany.mockResolvedValue([
        {
          id: 't1',
          slug: 'ts',
          title: 'TypeScript',
          lessons: [{ id: 'a' }, { id: 'b' }],
        },
        { id: 't2', slug: 'go', title: 'Go', lessons: [{ id: 'c' }] },
        { id: 't3', slug: 'empty', title: 'Trống', lessons: [] },
      ])
      prisma.studioRoadmap.findMany.mockResolvedValue([
        {
          slug: 'mini',
          title: 'Mini',
          summary: '',
          steps: [{ track: { status: 'PUBLISHED', lessons: [{ id: 'a' }] } }],
        },
      ])

      const garden = await service.garden(USER, now)

      expect(garden.leaves.map((leaf) => leaf.slug)).toEqual(['a', 'b'])
      expect(garden.flowers).toEqual([{ slug: 'ts', title: 'TypeScript' }])
      expect(garden.fruits).toEqual([{ slug: 'mini', title: 'Mini' }])
      expect(garden.streak).toMatchObject({
        current: 3,
        best: 3,
        activeDays: 3,
        studiedToday: true,
        idleDays: 0,
      })
      expect(garden.streak.week).toHaveLength(7)
      expect(garden.streak.week.at(-1)).toEqual({
        date: '2026-11-18',
        studied: true,
      })
      expect(garden.streak.week.filter((d) => d.studied)).toHaveLength(3)
    })

    it('counts idle days and an empty garden', async () => {
      prisma.studioTrack.findMany.mockResolvedValue([])
      prisma.studioRoadmap.findMany.mockResolvedValue([])
      prisma.studioProgress.findMany.mockResolvedValueOnce([
        {
          completedAt: at('2026-11-14T02:00:00Z'),
          updatedAt: at('2026-11-14T02:00:00Z'),
          lesson: lesson('a'),
        },
      ])
      await expect(service.garden(USER, now)).resolves.toMatchObject({
        streak: { current: 0, best: 1, studiedToday: false, idleDays: 4 },
      })

      prisma.studioProgress.findMany.mockResolvedValueOnce([])
      await expect(service.garden(USER, now)).resolves.toMatchObject({
        leaves: [],
        streak: { current: 0, best: 0, activeDays: 0, idleDays: null },
      })
    })
  })
})
