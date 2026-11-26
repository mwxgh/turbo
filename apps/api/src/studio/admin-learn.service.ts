import { BadRequestException, Injectable } from '@nestjs/common'

import { type Prisma, toPrismaListArgs } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import type {
  LessonDto,
  QuizQuestionDto,
  RoadmapDto,
  TrackDto,
} from './dto/learn.dto'
import { roadmapListSpec, trackListSpec } from './learn.list-spec'

const questionRows = (questions: QuizQuestionDto[]) =>
  questions.map((question, order) => {
    if (question.answer >= question.choices.length)
      throw new BadRequestException(
        `Question ${order + 1}: answer ${question.answer} is not one of its ${question.choices.length} choices`,
      )
    return { ...question, order }
  })

/** Admin side of Studio: write tracks, lessons (with their quiz) and roadmaps, drafts included. */
@Injectable()
export class AdminLearnService {
  constructor(private readonly prisma: PrismaService) {}

  async tracks(query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.StudioTrackWhereInput,
      Prisma.StudioTrackOrderByWithRelationInput
    >(trackListSpec, query)
    const [items, total] = await Promise.all([
      this.prisma.studioTrack.findMany({
        where,
        ...args,
        include: { _count: { select: { lessons: true } } },
      }),
      this.prisma.studioTrack.count({ where }),
    ])
    return paginated(items, total, query)
  }

  /** Throws P2025 (→ 404) when missing. */
  track(id: string) {
    return this.prisma.studioTrack.findUniqueOrThrow({
      where: { id },
      include: {
        lessons: {
          orderBy: [{ order: 'asc' }, { title: 'asc' }],
          select: {
            id: true,
            slug: true,
            title: true,
            status: true,
            order: true,
            minutes: true,
            updatedAt: true,
            _count: { select: { questions: true } },
          },
        },
      },
    })
  }

  createTrack(data: TrackDto) {
    return this.prisma.studioTrack.create({ data })
  }

  updateTrack(id: string, data: TrackDto) {
    return this.prisma.studioTrack.update({ where: { id }, data })
  }

  async removeTrack(id: string) {
    await this.prisma.studioTrack.delete({ where: { id } })
  }

  lesson(id: string) {
    return this.prisma.studioLesson.findUniqueOrThrow({
      where: { id },
      include: {
        track: { select: { id: true, slug: true, title: true } },
        questions: { orderBy: { order: 'asc' } },
      },
    })
  }

  createLesson(trackId: string, { questions = [], ...data }: LessonDto) {
    return this.prisma.studioLesson.create({
      data: {
        ...data,
        trackId,
        questions: { create: questionRows(questions) },
      },
    })
  }

  /** Saves the lesson; `questions`, when sent, replaces the whole quiz. */
  updateLesson(id: string, { questions, ...data }: LessonDto) {
    return this.prisma.studioLesson.update({
      where: { id },
      data: {
        ...data,
        ...(questions && {
          questions: { deleteMany: {}, create: questionRows(questions) },
        }),
      },
    })
  }

  async removeLesson(id: string) {
    await this.prisma.studioLesson.delete({ where: { id } })
  }

  async roadmaps(query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.StudioRoadmapWhereInput,
      Prisma.StudioRoadmapOrderByWithRelationInput
    >(roadmapListSpec, query)
    const [items, total] = await Promise.all([
      this.prisma.studioRoadmap.findMany({
        where,
        ...args,
        include: { _count: { select: { steps: true } } },
      }),
      this.prisma.studioRoadmap.count({ where }),
    ])
    return paginated(items, total, query)
  }

  roadmap(id: string) {
    return this.prisma.studioRoadmap.findUniqueOrThrow({
      where: { id },
      include: {
        steps: {
          orderBy: { order: 'asc' },
          include: { track: { select: { id: true, slug: true, title: true } } },
        },
      },
    })
  }

  createRoadmap({ steps = [], ...data }: RoadmapDto) {
    return this.prisma.studioRoadmap.create({
      data: {
        ...data,
        steps: { create: steps.map((step, order) => ({ ...step, order })) },
      },
    })
  }

  /** Saves the roadmap; `steps`, when sent, replaces every step. */
  updateRoadmap(id: string, { steps, ...data }: RoadmapDto) {
    return this.prisma.studioRoadmap.update({
      where: { id },
      data: {
        ...data,
        ...(steps && {
          steps: {
            deleteMany: {},
            create: steps.map((step, order) => ({ ...step, order })),
          },
        }),
      },
    })
  }

  async removeRoadmap(id: string) {
    await this.prisma.studioRoadmap.delete({ where: { id } })
  }
}
