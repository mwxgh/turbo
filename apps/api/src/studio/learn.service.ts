import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { StudioLevel, StudioStatus } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import {
  addDaysToKey,
  dayStreak,
  daysBetween,
  longestDayStreak,
  toDateKey,
} from '@repo/utils'

/** Share of quiz answers that must be right to finish a lesson by its quiz. */
export const PASS_RATIO = 0.7

const published = { status: StudioStatus.PUBLISHED }
/** Easiest level first (enum order), then the order inside the level. */
const lessonOrder = [
  { level: 'asc' as const },
  { order: 'asc' as const },
  { title: 'asc' as const },
]

export const quizPassed = (score: number, total: number) =>
  total > 0 && score / total >= PASS_RATIO

/** Days shown in the garden's week strip, ending today. */
export const GARDEN_WEEK = 7

/** A learner's state on one lesson, as a roadmap shows it. */
export type LessonState = 'done' | 'started' | 'todo'

const finished = (item: { lessons: number; done: number }) =>
  item.lessons > 0 && item.done === item.lessons

/** Learner side of Studio: published tracks, lessons and roadmaps, with the learner's progress. */
@Injectable()
export class LearnService {
  constructor(private readonly prisma: PrismaService) {}

  /** Ids of the given lessons the learner has finished. */
  private async doneIds(userId: string, lessonIds: string[]) {
    if (!lessonIds.length) return new Set<string>()
    const rows = await this.prisma.studioProgress.findMany({
      where: {
        userId,
        lessonId: { in: lessonIds },
        completedAt: { not: null },
      },
      select: { lessonId: true },
    })
    return new Set(rows.map((row) => row.lessonId))
  }

  /** Every published track with its lesson count and how many the learner finished. */
  async tracks(userId: string) {
    const tracks = await this.prisma.studioTrack.findMany({
      where: published,
      orderBy: [{ category: 'asc' }, { order: 'asc' }, { title: 'asc' }],
      select: {
        id: true,
        slug: true,
        category: true,
        title: true,
        summary: true,
        lessons: { where: published, select: { id: true, level: true } },
      },
    })
    const done = await this.doneIds(
      userId,
      tracks.flatMap((track) => track.lessons.map((lesson) => lesson.id)),
    )
    return tracks.map(({ lessons, ...track }) => ({
      ...track,
      lessons: lessons.length,
      done: lessons.filter((lesson) => done.has(lesson.id)).length,
      /** Lesson and done counts per level present in the track, easiest first */
      levels: Object.values(StudioLevel).flatMap((level) => {
        const inLevel = lessons.filter((lesson) => lesson.level === level)
        return inLevel.length
          ? [
              {
                level,
                lessons: inLevel.length,
                done: inLevel.filter((lesson) => done.has(lesson.id)).length,
              },
            ]
          : []
      }),
    }))
  }

  async track(userId: string, slug: string) {
    const track = await this.prisma.studioTrack.findFirst({
      where: { slug, ...published },
      select: {
        id: true,
        slug: true,
        category: true,
        title: true,
        summary: true,
        lessons: {
          where: published,
          orderBy: lessonOrder,
          select: {
            id: true,
            slug: true,
            title: true,
            summary: true,
            minutes: true,
            level: true,
          },
        },
      },
    })
    if (!track) throw new NotFoundException('Track not found')
    const progress = await this.prisma.studioProgress.findMany({
      where: { userId, lessonId: { in: track.lessons.map((l) => l.id) } },
    })
    const byLesson = new Map(progress.map((row) => [row.lessonId, row]))
    return {
      ...track,
      lessons: track.lessons.map((lesson) => {
        const row = byLesson.get(lesson.id)
        return {
          ...lesson,
          done: Boolean(row?.completedAt),
          quizScore: row?.quizScore ?? null,
          quizTotal: row?.quizTotal ?? null,
        }
      }),
    }
  }

  /** One lesson to read: quiz questions without their answers, the previous and next lesson. */
  async lesson(userId: string, trackSlug: string, lessonSlug: string) {
    const track = await this.prisma.studioTrack.findFirst({
      where: { slug: trackSlug, ...published },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        lessons: {
          where: published,
          orderBy: lessonOrder,
          select: { id: true, slug: true, title: true },
        },
      },
    })
    const index = track?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1
    const current = track?.lessons[index]
    if (!track || !current) throw new NotFoundException('Lesson not found')

    const [lesson, progress] = await Promise.all([
      this.prisma.studioLesson.findUniqueOrThrow({
        where: { id: current.id },
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          content: true,
          minutes: true,
          level: true,
          updatedAt: true,
          questions: {
            orderBy: { order: 'asc' },
            select: { id: true, prompt: true, choices: true },
          },
        },
      }),
      this.prisma.studioProgress.findUnique({
        where: {
          userId_lessonId: { userId, lessonId: current.id },
        },
      }),
    ])
    const { lessons, ...trackInfo } = track
    const link = (i: number) => {
      const other = lessons[i]
      return other ? { slug: other.slug, title: other.title } : null
    }
    return {
      ...lesson,
      track: trackInfo,
      done: Boolean(progress?.completedAt),
      quizScore: progress?.quizScore ?? null,
      quizTotal: progress?.quizTotal ?? null,
      previous: link(index - 1),
      next: link(index + 1),
    }
  }

  /** Published roadmaps with their size and the learner's share done. */
  async roadmaps(userId: string) {
    const roadmaps = await this.prisma.studioRoadmap.findMany({
      where: published,
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
      select: {
        slug: true,
        title: true,
        summary: true,
        steps: {
          select: {
            track: {
              select: {
                status: true,
                lessons: { where: published, select: { id: true } },
              },
            },
          },
        },
      },
    })
    const lessonIds = (steps: (typeof roadmaps)[number]['steps']) =>
      steps.flatMap(({ track }) =>
        track?.status === StudioStatus.PUBLISHED
          ? track.lessons.map((l) => l.id)
          : [],
      )
    const done = await this.doneIds(
      userId,
      roadmaps.flatMap((roadmap) => lessonIds(roadmap.steps)),
    )
    return roadmaps.map(({ steps, ...roadmap }) => {
      const ids = lessonIds(steps)
      return {
        ...roadmap,
        steps: steps.length,
        lessons: ids.length,
        done: ids.filter((id) => done.has(id)).length,
      }
    })
  }

  /** One roadmap: its steps in order, each with its track (when published) and progress. */
  async roadmap(userId: string, slug: string) {
    const roadmap = await this.prisma.studioRoadmap.findFirst({
      where: { slug, ...published },
      select: {
        slug: true,
        title: true,
        summary: true,
        steps: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            track: {
              select: {
                slug: true,
                title: true,
                category: true,
                status: true,
                lessons: {
                  where: published,
                  orderBy: lessonOrder,
                  select: { id: true, slug: true, title: true },
                },
              },
            },
          },
        },
      },
    })
    if (!roadmap) throw new NotFoundException('Roadmap not found')
    const visible = roadmap.steps.map((step) =>
      step.track?.status === StudioStatus.PUBLISHED ? step.track : null,
    )
    const lessonIds = visible.flatMap(
      (track) => track?.lessons.map((l) => l.id) ?? [],
    )
    const progress = lessonIds.length
      ? await this.prisma.studioProgress.findMany({
          where: { userId, lessonId: { in: lessonIds } },
          select: { lessonId: true, completedAt: true },
        })
      : []
    const stateOf = new Map<string, LessonState>(
      progress.map((row) => [
        row.lessonId,
        row.completedAt ? 'done' : 'started',
      ]),
    )
    return {
      ...roadmap,
      steps: roadmap.steps.map((step, i) => {
        const track = visible[i]
        const lessons =
          track?.lessons.map(({ id, slug, title }) => ({
            slug,
            title,
            state: stateOf.get(id) ?? 'todo',
          })) ?? []
        return {
          id: step.id,
          title: step.title,
          description: step.description,
          track: track && {
            slug: track.slug,
            title: track.title,
            category: track.category,
            lessons: lessons.length,
            done: lessons.filter((l) => l.state === 'done').length,
            items: lessons,
          },
        }
      }),
    }
  }

  /** The learner's latest lessons (to continue) and how many lessons they finished. */
  async overview(userId: string) {
    const visible = { ...published, track: published }
    const [recent, done] = await Promise.all([
      this.prisma.studioProgress.findMany({
        where: { userId, lesson: visible },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          completedAt: true,
          updatedAt: true,
          lesson: {
            select: {
              slug: true,
              title: true,
              track: { select: { slug: true, title: true } },
            },
          },
        },
      }),
      this.prisma.studioProgress.count({
        where: { userId, completedAt: { not: null }, lesson: visible },
      }),
    ])
    return {
      done,
      recent: recent.map(({ lesson, completedAt, updatedAt }) => ({
        track: lesson.track,
        slug: lesson.slug,
        title: lesson.title,
        done: Boolean(completedAt),
        updatedAt,
      })),
    }
  }

  /**
   * The learner's achievements for the Studio garden: a leaf per finished lesson, a flower per
   * finished track, a fruit per finished roadmap, and the study-day streak (days in the business
   * time zone with a finished or touched lesson).
   */
  async garden(userId: string, now = new Date()) {
    const visible = { ...published, track: published }
    const [rows, tracks, roadmaps] = await Promise.all([
      this.prisma.studioProgress.findMany({
        where: { userId, lesson: visible },
        orderBy: { updatedAt: 'asc' },
        select: {
          completedAt: true,
          updatedAt: true,
          lesson: {
            select: {
              slug: true,
              title: true,
              track: { select: { slug: true, title: true } },
            },
          },
        },
      }),
      this.tracks(userId),
      this.roadmaps(userId),
    ])

    const leaves = rows
      .flatMap(({ lesson, completedAt }) =>
        completedAt
          ? [
              {
                track: lesson.track,
                slug: lesson.slug,
                title: lesson.title,
                completedAt,
              },
            ]
          : [],
      )
      .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime())

    const days = new Set(
      rows.flatMap(({ completedAt, updatedAt }) => [
        toDateKey(updatedAt),
        ...(completedAt ? [toDateKey(completedAt)] : []),
      ]),
    )
    const today = toDateKey(now)
    const last = [...days].sort().at(-1)

    return {
      leaves,
      flowers: tracks
        .filter(finished)
        .map(({ slug, title }) => ({ slug, title })),
      fruits: roadmaps
        .filter(finished)
        .map(({ slug, title }) => ({ slug, title })),
      streak: {
        current: dayStreak(days, now),
        best: longestDayStreak(days),
        activeDays: days.size,
        studiedToday: days.has(today),
        /** Days since the last study day; null: never studied */
        idleDays: last ? daysBetween(last, today) : null,
        week: Array.from({ length: GARDEN_WEEK }, (_, i) => {
          const date = addDaysToKey(today, i - GARDEN_WEEK + 1)
          return { date, studied: days.has(date) }
        }),
      },
    }
  }

  private async publishedLesson(lessonId: string) {
    const lesson = await this.prisma.studioLesson.findFirst({
      where: { id: lessonId, ...published, track: published },
      select: {
        id: true,
        questions: {
          orderBy: { order: 'asc' },
          select: { id: true, answer: true, explanation: true },
        },
      },
    })
    if (!lesson) throw new NotFoundException('Lesson not found')
    return lesson
  }

  /** Marks a lesson finished (or not) by hand; keeps the quiz score. */
  async setDone(userId: string, lessonId: string, done: boolean) {
    await this.publishedLesson(lessonId)
    const completedAt = done ? new Date() : null
    return this.prisma.studioProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId, completedAt },
      update: { completedAt },
    })
  }

  /**
   * Grades a quiz: right or wrong per question with the answer and explanation. Keeps the best
   * score; a passed quiz ({@link PASS_RATIO}) finishes the lesson.
   */
  async submitQuiz(userId: string, lessonId: string, answers: number[]) {
    const { questions } = await this.publishedLesson(lessonId)
    if (!questions.length)
      throw new BadRequestException('This lesson has no quiz')
    if (answers.length !== questions.length)
      throw new BadRequestException(
        `Expected ${questions.length} answers, got ${answers.length}`,
      )

    const results = questions.map((question, i) => ({
      id: question.id,
      chosen: answers[i],
      answer: question.answer,
      correct: answers[i] === question.answer,
      explanation: question.explanation,
    }))
    const score = results.filter((result) => result.correct).length
    const total = questions.length
    const passed = quizPassed(score, total)

    const key = { userId_lessonId: { userId, lessonId } }
    const before = await this.prisma.studioProgress.findUnique({ where: key })
    const best =
      before?.quizScore != null &&
      before.quizTotal &&
      before.quizScore / before.quizTotal > score / total
        ? { quizScore: before.quizScore, quizTotal: before.quizTotal }
        : { quizScore: score, quizTotal: total }
    const completedAt = before?.completedAt ?? (passed ? new Date() : null)
    const progress = await this.prisma.studioProgress.upsert({
      where: key,
      create: { userId, lessonId, completedAt, ...best },
      update: { completedAt, ...best },
    })
    return {
      score,
      total,
      passed,
      results,
      done: Boolean(progress.completedAt),
    }
  }
}
