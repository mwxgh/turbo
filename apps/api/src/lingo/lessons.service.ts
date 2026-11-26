import { Injectable, NotFoundException } from '@nestjs/common'

import { LingoContentStatus, type LingoLesson, type Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import { LingoService } from './lingo.service'
import { DEFAULT_TARGET, accuracyFor } from './roadmap'
import { getExam } from './specs'

/** Latest answers of a skill a lesson's progress looks at */
export const LESSON_WINDOW = 30
/** Answers needed before a lesson can count as done */
export const LESSON_MIN = 10

export interface LessonProgress {
  answered: number
  correct: number
  accuracy: number
  done: boolean
}

/** Progress of each skill tag from the latest answers (newest first). */
export function skillProgress(
  answers: { correct: boolean | null; skillTags: string[] }[],
  tags: string[],
  goal: number,
): Map<string, LessonProgress> {
  const result = new Map<string, LessonProgress>()
  for (const tag of tags) {
    const recent = answers
      .filter((a) => a.skillTags.includes(tag))
      .slice(0, LESSON_WINDOW)
    const correct = recent.filter((a) => a.correct).length
    const accuracy = recent.length ? correct / recent.length : 0
    result.set(tag, {
      answered: recent.length,
      correct,
      accuracy,
      done: recent.length >= LESSON_MIN && accuracy >= goal,
    })
  }
  return result
}

/** Accuracy a lesson asks: a little under the target's, at least 60%. */
export const lessonGoal = (target: number) =>
  Math.max(0.6, accuracyFor(target) - 0.05)

const SUMMARY = {
  slug: true,
  title: true,
  summary: true,
  minutes: true,
  parts: true,
  practicePart: true,
  practiceSkillTag: true,
} satisfies Prisma.LingoLessonSelect

type Practiced = Pick<LingoLesson, 'practicePart' | 'practiceSkillTag'>

const practice = (l: Practiced) =>
  l.practicePart
    ? { part: l.practicePart, skillTag: l.practiceSkillTag ?? undefined }
    : null

/**
 * The course (published modules and lessons in the database, edited in the teacher area) with each
 * lesson's progress, computed from the learner's latest answers to questions of the lesson's skill
 * tag. Progress is not stored. A lesson's `id` in the API is its slug.
 */
@Injectable()
export class LessonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lingo: LingoService,
  ) {}

  private async progress(userId: string, exam: string, lessons: Practiced[]) {
    const tags = [
      ...new Set(
        lessons.flatMap((l) =>
          l.practicePart && l.practiceSkillTag ? [l.practiceSkillTag] : [],
        ),
      ),
    ]
    if (!tags.length) return new Map<string, LessonProgress>()
    const [goal, answers] = await Promise.all([
      this.lingo.goal(userId, exam),
      this.prisma.lingoAnswer.findMany({
        where: {
          correct: { not: null },
          question: { skillTags: { hasSome: tags } },
          attempt: { userId, exam, submittedAt: { not: null } },
        },
        orderBy: { answeredAt: 'desc' },
        take: LESSON_WINDOW * tags.length,
        select: { correct: true, question: { select: { skillTags: true } } },
      }),
    ])
    return skillProgress(
      answers.map((a) => ({
        correct: a.correct,
        skillTags: a.question.skillTags,
      })),
      tags,
      lessonGoal(goal.targetScore ?? DEFAULT_TARGET),
    )
  }

  /** Published modules of the exam, each with its published lessons, in study order. */
  private modules<S extends Prisma.LingoLessonSelect>(exam: string, select: S) {
    return this.prisma.lingoLessonModule.findMany({
      where: { exam },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
      select: {
        slug: true,
        title: true,
        description: true,
        lessons: {
          where: { status: LingoContentStatus.PUBLISHED },
          orderBy: [{ order: 'asc' }, { title: 'asc' }],
          select,
        },
      },
    })
  }

  async list(userId: string, code: string) {
    const exam = getExam(code)
    const modules = await this.modules(exam.code, SUMMARY)
    const progress = await this.progress(
      userId,
      exam.code,
      modules.flatMap((m) => m.lessons),
    )
    return {
      modules: modules
        .filter((m) => m.lessons.length)
        .map(({ slug, lessons, ...module }) => ({
          id: slug,
          ...module,
          lessons: lessons.map(
            ({ slug, practicePart, practiceSkillTag, ...l }) => ({
              id: slug,
              ...l,
              practice: practice({ practicePart, practiceSkillTag }),
              progress: practiceSkillTag
                ? (progress.get(practiceSkillTag) ?? null)
                : null,
            }),
          ),
        })),
    }
  }

  async get(userId: string, code: string, slug: string) {
    const exam = getExam(code)
    const lesson = await this.prisma.lingoLesson.findFirst({
      where: {
        slug,
        status: LingoContentStatus.PUBLISHED,
        module: { exam: exam.code },
      },
    })
    if (!lesson) throw new NotFoundException('Lesson not found')
    const [progress, modules] = await Promise.all([
      this.progress(userId, exam.code, [lesson]),
      this.modules(exam.code, { slug: true, title: true }),
    ])
    const order = modules.flatMap((m) => m.lessons)
    const index = order.findIndex((l) => l.slug === slug)
    const neighbour = (l: (typeof order)[number] | undefined) =>
      l ? { id: l.slug, title: l.title } : null
    return {
      id: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      minutes: lesson.minutes,
      parts: lesson.parts,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      practice: practice(lesson),
      progress:
        lesson.practicePart && lesson.practiceSkillTag
          ? (progress.get(lesson.practiceSkillTag) ?? null)
          : null,
      previous: neighbour(order[index - 1]),
      next: neighbour(order[index + 1]),
    }
  }

  /** Titles of the published lessons by slug: the 12-week plan links its lessons through it. */
  async titles(code: string) {
    const lessons = await this.prisma.lingoLesson.findMany({
      where: {
        status: LingoContentStatus.PUBLISHED,
        module: { exam: code },
      },
      select: { slug: true, title: true },
    })
    return new Map(lessons.map((l) => [l.slug, l.title]))
  }
}
