import { z } from 'zod'

import { getExam, getPart } from './specs'
import { cardRowSchema, issueLines, itemSchema } from './specs/schemas'

/** Raw items per part code (`{ "P5": [...] }`), each checked against its part's schema. */
const partItems = z.record(z.string(), z.array(z.unknown()))

/** A system deck: one card per term, in study order. */
const deckSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500).default(''),
  topic: z.string().trim().max(50).optional(),
  cards: z.array(cardRowSchema.omit({ topic: true })).min(1),
})

/** A published test; its items are imported (PUBLISHED) before it is made. */
const testSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(1000).default(''),
  /** MINI (default) or FULL */
  kind: z.enum(['MINI', 'FULL']).default('MINI'),
  items: partItems,
})

/**
 * Lingo content written outside the app (`scripts/content-import.ts`): published items, system
 * decks and published tests of one exam.
 */
export const lingoContentSchema = z.object({
  exam: z.string().default('TOEIC_LR'),
  items: partItems.default({}),
  decks: z.array(deckSchema).default([]),
  tests: z.array(testSchema).default([]),
})

export type LingoContent = z.infer<typeof lingoContentSchema>
export type DeckContent = z.infer<typeof deckSchema>
export type TestContent = z.infer<typeof testSchema>

/** Every invalid item of the file as `where: issue` lines (an unknown exam or part throws). */
export function contentIssues(content: LingoContent): string[] {
  const exam = getExam(content.exam)
  const groups: [string, Record<string, unknown[]>][] = [
    ['items', content.items],
    ...content.tests.map(
      (t) =>
        [`test "${t.title}"`, t.items] as [string, Record<string, unknown[]>],
    ),
  ]
  return groups.flatMap(([where, parts]) =>
    Object.entries(parts).flatMap(([code, items]) => {
      const schema = itemSchema(exam, getPart(exam, code).part)
      return items.flatMap((raw, i) => {
        const result = schema.safeParse(raw)
        return result.success
          ? []
          : issueLines(result.error).map(
              (issue) => `${where} ${code}[${i}]: ${issue}`,
            )
      })
    }),
  )
}
