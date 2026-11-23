import { describe, expect, it } from 'vitest'

import { itemHash } from '../content'
import { getExam, getPart } from '../specs'
import { cardRowSchema, issueLines, itemSchema } from '../specs/schemas'
import { CARD_SUPPLEMENT } from './decks/supplement'
import { SAMPLE_TESTS } from './index'
import { TOEIC_EXTRA_SAMPLES } from './toeic-extra'
import { TOEIC_MORE_SAMPLES } from './toeic-more'
import { TOEIC_PART5_SAMPLES } from './toeic-part5'
import { VOCAB_DECKS, VOCAB_SOURCES } from './vocab'

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

  it('has valid source cards', () => {
    const problems = VOCAB_SOURCES.flatMap((source) =>
      source.cards.flatMap((row, i) => {
        const parsed = cardRowSchema.safeParse(row)
        return parsed.success
          ? []
          : [`${source.title}[${i}]: ${issueLines(parsed.error).join('; ')}`]
      }),
    )
    expect(problems).toEqual([])
  })

  it('builds the curriculum: one card per term, decks of up to 40 in order', () => {
    const terms = VOCAB_DECKS.flatMap((d) =>
      d.cards.map((c) => c.term.toLowerCase()),
    )
    expect(new Set(terms).size).toBe(terms.length)
    const sourceTerms = new Set(
      VOCAB_SOURCES.flatMap((s) => s.cards.map((c) => c.term.toLowerCase())),
    )
    expect(terms.length).toBe(sourceTerms.size)
    expect(terms.length).toBe(1426)
    VOCAB_DECKS.forEach((deck, i) => {
      expect(deck.title).toMatch(
        new RegExp(`^Bài ${String(i + 1).padStart(2, '0')} · `),
      )
      expect(deck.cards.length).toBeGreaterThan(0)
      expect(deck.cards.length).toBeLessThanOrEqual(40)
      for (const card of deck.cards)
        expect(cardRowSchema.safeParse(card).success, card.term).toBe(true)
    })
  })

  it('gives every card IPA and an example, using every supplement entry', () => {
    const cards = VOCAB_DECKS.flatMap((d) => d.cards)
    expect(
      cards
        .filter((c) => !c.reading || !c.example || !c.exampleVi)
        .map((c) => c.term),
    ).toEqual([])
    const terms = new Set(cards.map((c) => c.term))
    expect(Object.keys(CARD_SUPPLEMENT).filter((t) => !terms.has(t))).toEqual(
      [],
    )
  })
})
