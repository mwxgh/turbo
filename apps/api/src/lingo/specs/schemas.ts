import { z } from 'zod'

import type { ExamSpec, PartSpec } from './types'

/** Blank cells of a CSV / JSON become `undefined`. */
const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().trim().max(max).optional(),
  )

/** One SINGLE_CHOICE question as admins write it (JSON import, form). */
export function choiceQuestionSchema(exam: ExamSpec, part: PartSpec) {
  return z.object({
    text: z.string().trim().min(1).max(1000),
    options: z.array(z.string().trim().min(1).max(300)).length(part.options),
    answer: z
      .number()
      .int()
      .min(0)
      .max(part.options - 1),
    explanationVi: z.string().trim().max(4000).default(''),
    translationVi: optionalText(2000),
    skillTags: z
      .array(
        z.string().refine((tag) => tag in exam.skillTags, {
          message: `Unknown skill tag (known: ${Object.keys(exam.skillTags).join(', ')})`,
        }),
      )
      .max(5)
      .default([]),
  })
}

/** One item (stimulus + its questions) of a part, as admins write it. */
export function itemSchema(exam: ExamSpec, part: PartSpec) {
  const [min, max] = part.questionsPerItem
  return z.object({
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    topic: optionalText(100),
    passage: part.passage
      ? z.string().trim().min(1).max(10_000)
      : z
          .undefined({ message: `${part.code} items have no passage` })
          .optional(),
    questions: z.array(choiceQuestionSchema(exam, part)).min(min).max(max),
  })
}

export type ItemInput = z.infer<ReturnType<typeof itemSchema>>

/** One row of a vocabulary CSV. */
export const cardRowSchema = z.object({
  term: z.string().trim().min(1).max(100),
  pos: optionalText(20),
  reading: optionalText(100),
  meaningVi: z.string().trim().min(1).max(500),
  example: optionalText(500),
  exampleVi: optionalText(500),
  topic: optionalText(50),
})

export type CardRow = z.infer<typeof cardRowSchema>

export const CARD_CSV_COLUMNS = Object.keys(cardRowSchema.shape)

/** Zod issues as short `path: message` lines for the admin. */
export const issueLines = (error: z.ZodError): string[] =>
  error.issues.map((issue) =>
    issue.path.length
      ? `${issue.path.join('.')}: ${issue.message}`
      : issue.message,
  )
