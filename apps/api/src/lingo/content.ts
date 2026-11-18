import { createHash } from 'node:crypto'

import type { LingoContentStatus, Prisma } from '@repo/db'

import type { ExamSpec, PartSpec, SectionSpec } from './specs'
import type { ItemInput } from './specs/schemas'

/** Same text → same hash, whatever the difficulty / topic / explanations say. */
export function itemHash(exam: string, part: string, item: ItemInput): string {
  const canonical = JSON.stringify([
    exam,
    part,
    item.passage ?? null,
    item.questions.map((q) => [q.text, q.options]),
  ])
  return createHash('sha256').update(canonical).digest('hex')
}

/** Prisma create input of a validated item with its questions. */
export function itemCreateData(
  exam: ExamSpec,
  section: SectionSpec,
  part: PartSpec,
  item: ItemInput,
  status: LingoContentStatus,
  batchId?: string,
): Prisma.LingoItemCreateInput {
  return {
    exam: exam.code,
    section: section.code,
    part: part.code,
    difficulty: item.difficulty,
    topic: item.topic ?? null,
    content: item.passage ? { passage: item.passage } : {},
    status,
    contentHash: itemHash(exam.code, part.code, item),
    ...(batchId && { batch: { connect: { id: batchId } } }),
    questions: {
      create: item.questions.map((q, order) => ({
        order,
        type: 'SINGLE_CHOICE',
        prompt: { text: q.text, options: q.options },
        answer: { choice: q.answer },
        explanationVi: q.explanationVi,
        translationVi: q.translationVi ?? null,
        skillTags: q.skillTags,
      })),
    },
  }
}
