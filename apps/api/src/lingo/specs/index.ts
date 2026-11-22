import { NotFoundException } from '@nestjs/common'

import { toeicLr } from './toeic-lr'
import type { ExamSpec, PartSpec, SectionSpec } from './types'

export * from './types'

/** Every exam Lingo knows. Exams without content yet show as "coming soon". */
export const EXAMS: readonly ExamSpec[] = [
  toeicLr,
  {
    code: 'IELTS_AC',
    name: 'IELTS Academic',
    language: 'en',
    available: false,
    sections: [],
    skillTags: {},
    difficulties: { EASY: 'Band 5', MEDIUM: 'Band 6.5', HARD: 'Band 8' },
  },
  {
    code: 'HSK',
    name: 'HSK',
    language: 'zh',
    available: false,
    sections: [],
    skillTags: {},
    difficulties: { EASY: 'HSK 1–2', MEDIUM: 'HSK 3–4', HARD: 'HSK 5–6' },
  },
]

export function findExam(code: string): ExamSpec | undefined {
  return EXAMS.find((exam) => exam.code === code)
}

/** 404 for unknown or not yet available exams. */
export function getExam(code: string): ExamSpec {
  const exam = findExam(code)
  if (!exam?.available) throw new NotFoundException(`Unknown exam "${code}"`)
  return exam
}

export function findPart(
  exam: ExamSpec,
  code: string,
): { section: SectionSpec; part: PartSpec } | undefined {
  for (const section of exam.sections) {
    const part = section.parts.find((p) => p.code === code)
    if (part) return { section, part }
  }
  return undefined
}

/** 404 for a part the exam does not have. */
export function getPart(exam: ExamSpec, code: string) {
  const found = findPart(exam, code)
  if (!found)
    throw new NotFoundException(`Unknown part "${code}" of ${exam.code}`)
  return found
}
