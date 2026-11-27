import { describe, expect, it } from 'vitest'

import { contentIssues, lingoContentSchema } from './content-file'

const p5 = {
  difficulty: 'EASY',
  questions: [
    {
      text: 'She ------- here.',
      options: ['work', 'works', 'working', 'to work'],
      answer: 1,
    },
  ],
}

describe('lingo content file', () => {
  it('fills defaults and finds no issue in valid items', () => {
    const content = lingoContentSchema.parse({ items: { P5: [p5] } })
    expect(content).toMatchObject({ exam: 'TOEIC_LR', decks: [], tests: [] })
    expect(contentIssues(content)).toEqual([])
  })

  it('names the item and test of every issue', () => {
    const content = lingoContentSchema.parse({
      items: { P5: [p5, { ...p5, passage: 'Dear team' }] },
      tests: [{ title: 'Mini', items: { P5: [{ difficulty: 'EASY' }] } }],
    })
    expect(contentIssues(content)).toEqual([
      'items P5[1]: passage: P5 items have no passage',
      'test "Mini" P5[0]: questions: Invalid input: expected array, received undefined',
    ])
  })

  it('refuses a deck without cards', () => {
    expect(
      lingoContentSchema.safeParse({ decks: [{ title: 'Bài 01', cards: [] }] })
        .success,
    ).toBe(false)
  })
})
