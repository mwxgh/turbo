import { BadRequestException, Injectable } from '@nestjs/common'

import { type Prisma, StudioStatus, toPrismaListArgs } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import type {
  LessonDto,
  QuizQuestionDto,
  RoadmapDto,
  StudioContentDto,
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
          orderBy: [{ level: 'asc' }, { order: 'asc' }, { title: 'asc' }],
          select: {
            id: true,
            slug: true,
            title: true,
            status: true,
            level: true,
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

  /**
   * Loads a content file in one transaction: tracks and roadmaps by slug, lessons by track + slug
   * (stored ones not in the file are kept), a lesson's quiz and a roadmap's steps replaced.
   * Defaults: lessons and roadmaps PUBLISHED, a track PUBLISHED once it has a published lesson
   * (an outline step stays DRAFT). An omitted `order` keeps the stored one; new rows go last.
   */
  async importContent({ tracks = [], roadmaps = [] }: StudioContentDto) {
    const result = { tracks: 0, lessons: 0, roadmaps: 0 }
    await this.prisma.$transaction(
      async (tx) => {
        for (const { lessons = [], ...track } of tracks) {
          const { id } = await tx.studioTrack.upsert({
            where: { slug: track.slug },
            create: {
              ...track,
              order:
                track.order ??
                (await tx.studioTrack.count({
                  where: { category: track.category },
                })),
            },
            update: track,
          })
          let next =
            ((
              await tx.studioLesson.aggregate({
                where: { trackId: id },
                _max: { order: true },
              })
            )._max.order ?? -1) + 1
          for (const { questions, ...lesson } of lessons) {
            const data = {
              ...lesson,
              status: lesson.status ?? StudioStatus.PUBLISHED,
              ...(questions && {
                questions: { deleteMany: {}, create: questionRows(questions) },
              }),
            }
            await tx.studioLesson.upsert({
              where: { trackId_slug: { trackId: id, slug: lesson.slug } },
              create: {
                ...data,
                trackId: id,
                order: lesson.order ?? next++,
                questions: { create: questionRows(questions ?? []) },
              },
              update: data,
            })
          }
          if (!track.status) {
            const published = await tx.studioLesson.count({
              where: { trackId: id, status: StudioStatus.PUBLISHED },
            })
            await tx.studioTrack.update({
              where: { id },
              data: {
                status: published ? StudioStatus.PUBLISHED : StudioStatus.DRAFT,
              },
            })
          }
          result.tracks++
          result.lessons += lessons.length
        }

        const slugs = roadmaps.flatMap((r) =>
          (r.steps ?? []).flatMap((s) => s.track ?? []),
        )
        const found = await tx.studioTrack.findMany({
          where: { slug: { in: slugs } },
          select: { id: true, slug: true },
        })
        const idOf = new Map(found.map((t) => [t.slug, t.id]))
        const missing = [...new Set(slugs.filter((s) => !idOf.has(s)))]
        if (missing.length)
          throw new BadRequestException(
            `Roadmap steps point at unknown tracks: ${missing.join(', ')}`,
          )
        for (const { steps, ...roadmap } of roadmaps) {
          const create = steps && {
            create: steps.map(({ track, ...step }, order) => ({
              ...step,
              order,
              trackId: track ? idOf.get(track)! : null,
            })),
          }
          await tx.studioRoadmap.upsert({
            where: { slug: roadmap.slug },
            create: {
              ...roadmap,
              status: roadmap.status ?? StudioStatus.PUBLISHED,
              order: roadmap.order ?? (await tx.studioRoadmap.count()),
              steps: create,
            },
            update: {
              ...roadmap,
              ...(create && { steps: { deleteMany: {}, ...create } }),
            },
          })
          result.roadmaps++
        }
      },
      { timeout: 120_000 },
    )
    return result
  }
}
