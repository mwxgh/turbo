import { describe, expect, it } from 'vitest'

import { itemHash } from '../content'
import { getExam, getPart } from '../specs'
import { parseCsv } from '../specs/csv'
import { cardRowSchema, issueLines, itemSchema } from '../specs/schemas'
import { MORE_DECKS, SAMPLE_TESTS } from './index'
import { TOEIC_TOPIC_DECKS } from './toeic-decks'
import { TOEIC_EXTRA_SAMPLES } from './toeic-extra'
import { TOEIC_MORE_SAMPLES } from './toeic-more'
import { TOEIC_PART5_SAMPLES, TOEIC_STARTER_DECK } from './toeic-part5'

const exam = getExam('TOEIC_LR')

/** Every built-in item, by part, with where it comes from. */
const sources: [string, Record<string, object[]>][] = [
  ['samples', { P5: TOEIC_PART5_SAMPLES, ...TOEIC_MORE_SAMPLES }],
  ['extra', TOEIC_EXTRA_SAMPLES],
  ...SAMPLE_TESTS.map(
    (t) => [t.title, t.items] as [string, Record<string, object[]>],
  ),
]

describe('built-in content', () => {
  it('has valid, unique items', () => {
    const hashes = new Map<string, string>()
    const problems: string[] = []
    for (const [source, parts] of sources)
      for (const [code, items] of Object.entries(parts)) {
        const { part } = getPart(exam, code)
        items.forEach((raw, i) => {
          const parsed = itemSchema(exam, part).safeParse(raw)
          if (!parsed.success) {
            problems.push(
              `${source} ${code}[${i}]: ${issueLines(parsed.error).join('; ')}`,
            )
            return
          }
          const hash = itemHash(exam.code, code, parsed.data)
          const seen = hashes.get(hash)
          if (seen) problems.push(`${source} ${code}[${i}] duplicates ${seen}`)
          hashes.set(hash, `${source} ${code}[${i}]`)
        })
      }
    expect(problems).toEqual([])
  })

  // One case per test and part, so a part still being written fails on its own
  const partCases = SAMPLE_TESTS.flatMap((test) =>
    exam.sections.flatMap((section) =>
      section.parts
        .filter((part) => part.code !== 'P1') // needs real photos
        .map((part) => ({
          name: `${test.title} ${part.code}`,
          items: test.items[part.code] ?? [],
          expected: test.kind === 'FULL' ? part.count : part.miniCount,
        })),
    ),
  )
  it.each(partCases)('$name has the part’s question count', (c) => {
    const questions = c.items.reduce<number>(
      (sum, item) => sum + (item as { questions: unknown[] }).questions.length,
      0,
    )
    expect(questions).toBe(c.expected)
  })

  it('has valid cards with terms unique across every deck', () => {
    const decks = [
      { title: TOEIC_STARTER_DECK.title, rows: TOEIC_STARTER_DECK.cards },
      ...TOEIC_TOPIC_DECKS.map((d) => ({
        title: d.title,
        rows: parseCsv(d.csv),
      })),
      ...MORE_DECKS.map((d) => ({
        title: d.title,
        rows: d.cards.map((c) => ({ ...c, topic: d.topic })),
      })),
    ]
    const terms = new Map<string, string>()
    const problems: string[] = []
    for (const deck of decks)
      deck.rows.forEach((row, i) => {
        const parsed = cardRowSchema.safeParse(row)
        if (!parsed.success) {
          problems.push(
            `${deck.title}[${i}]: ${issueLines(parsed.error).join('; ')}`,
          )
          return
        }
        const key = parsed.data.term.toLowerCase()
        const seen = terms.get(key)
        if (seen)
          problems.push(`"${parsed.data.term}" in ${deck.title} and ${seen}`)
        terms.set(key, deck.title)
      })
    for (const deck of MORE_DECKS)
      expect(deck.cards.length, deck.title).toBe(40)
    expect(problems).toEqual([])
  })
})
