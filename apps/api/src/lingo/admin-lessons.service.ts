import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from '@repo/db/nest'

import type { LessonDto, LessonModuleDto } from './dto/lessons.dto'
import { getExam } from './specs'

/** Admin side of the Lingo course: modules and lessons, drafts included. */
@Injectable()
export class AdminLessonsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Every module of the exam with all its lessons (any status), in study order. */
  course(code: string) {
    const exam = getExam(code)
    return this.prisma.lingoLessonModule.findMany({
      where: { exam: exam.code },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
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
            parts: true,
            practicePart: true,
            practiceSkillTag: true,
            updatedAt: true,
          },
        },
      },
    })
  }

  createModule(data: LessonModuleDto) {
    getExam(data.exam)
    return this.prisma.lingoLessonModule.create({ data })
  }

  updateModule(id: string, data: LessonModuleDto) {
    getExam(data.exam)
    return this.prisma.lingoLessonModule.update({ where: { id }, data })
  }

  /** Deletes the module and its lessons. */
  async removeModule(id: string) {
    await this.prisma.lingoLessonModule.delete({ where: { id } })
  }

  /** Throws P2025 (→ 404) when missing. */
  lesson(id: string) {
    return this.prisma.lingoLesson.findUniqueOrThrow({
      where: { id },
      include: {
        module: { select: { id: true, exam: true, slug: true, title: true } },
      },
    })
  }

  async createLesson(data: LessonDto) {
    await this.check(data)
    return this.prisma.lingoLesson.create({ data })
  }

  async updateLesson(id: string, data: LessonDto) {
    await this.check(data)
    return this.prisma.lingoLesson.update({ where: { id }, data })
  }

  async removeLesson(id: string) {
    await this.prisma.lingoLesson.delete({ where: { id } })
  }

  /** Parts and the practice must exist in the module's exam. */
  private async check(data: LessonDto) {
    const module = await this.prisma.lingoLessonModule.findUniqueOrThrow({
      where: { id: data.moduleId },
      select: { exam: true },
    })
    const exam = getExam(module.exam)
    const parts = new Set(
      exam.sections.flatMap((s) => s.parts.map((p) => p.code)),
    )
    const problems = [
      ...(data.parts ?? [])
        .filter((p) => !parts.has(p))
        .map((p) => `Unknown part ${p}`),
      ...(data.practicePart && !parts.has(data.practicePart)
        ? [`Unknown practice part ${data.practicePart}`]
        : []),
      ...(data.practiceSkillTag && !data.practicePart
        ? ['A practice skill tag needs a practice part']
        : []),
      ...(data.practiceSkillTag && !(data.practiceSkillTag in exam.skillTags)
        ? [`Unknown skill tag ${data.practiceSkillTag}`]
        : []),
    ]
    if (problems.length) throw new BadRequestException(problems)
  }
}
