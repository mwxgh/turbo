import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@repo/db/nest'

import { LESSONS, LESSON_MODULES, type LessonSpec, lessonById } from './lessons'
import { LingoService } from './lingo.service'
import { DEFAULT_TARGET, accuracyFor } from './roadmap'
import { getExam } from './specs'

/** The course is written for TOEIC Listening & Reading. */
const COURSE_EXAM = 'TOEIC_LR'
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

/**
 * The course (lessons defined in code, `lessons/`) with each lesson's progress, computed from the
 * learner's latest answers to questions of the lesson's skill tag. Nothing is stored.
 */
@Injectable()
export class LessonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lingo: LingoService,
  ) {}

  private async progress(userId: string, exam: string, lessons: LessonSpec[]) {
    const tags = [
      ...new Set(lessons.flatMap((l) => l.practice?.skillTag ?? [])),
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

  private course(code: string) {
    const exam = getExam(code)
    if (exam.code !== COURSE_EXAM)
      throw new NotFoundException('No course for this exam yet')
    return exam
  }

  async list(userId: string, code: string) {
    const exam = this.course(code)
    const progress = await this.progress(userId, exam.code, LESSONS)
    return {
      modules: LESSON_MODULES.map((module) => ({
        ...module,
        lessons: LESSONS.filter((l) => l.module === module.id).map((l) => ({
          id: l.id,
          title: l.title,
          summary: l.summary,
          minutes: l.minutes,
          parts: l.parts,
          practice: l.practice ?? null,
          progress: l.practice?.skillTag
            ? (progress.get(l.practice.skillTag) ?? null)
            : null,
        })),
      })),
    }
  }

  async get(userId: string, code: string, id: string) {
    const exam = this.course(code)
    const lesson = lessonById(id)
    if (!lesson) throw new NotFoundException('Lesson not found')
    const progress = await this.progress(userId, exam.code, [lesson])
    const index = LESSONS.indexOf(lesson)
    const neighbour = (l: LessonSpec | undefined) =>
      l ? { id: l.id, title: l.title } : null
    return {
      ...lesson,
      practice: lesson.practice ?? null,
      progress: lesson.practice?.skillTag
        ? (progress.get(lesson.practice.skillTag) ?? null)
        : null,
      previous: neighbour(LESSONS[index - 1]),
      next: neighbour(LESSONS[index + 1]),
    }
  }
}
