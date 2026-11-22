import { describe, expect, it } from 'vitest'

import { TOEIC_MORE_SAMPLES } from '../fixtures/toeic-more'
import {
  TOEIC_PART5_SAMPLES,
  TOEIC_STARTER_DECK,
} from '../fixtures/toeic-part5'
import { parseCsv } from './csv'
import { findExam, findPart, getExam, getPart } from './index'
import { cardRowSchema, itemSchema } from './schemas'
import { scaledScore } from './score'

const toeic = getExam('TOEIC_LR')
const p5 = getPart(toeic, 'P5').part
const valid = {
  difficulty: 'EASY',
  questions: [
    {
      text: 'She ------- here.',
      options: ['work', 'works', 'working', 'to work'],
      answer: 1,
      skillTags: ['grammar.agreement'],
    },
  ],
}

describe('exam registry', () => {
  it('finds TOEIC parts and hides exams without content', () => {
    expect(findPart(toeic, 'P7')?.section.code).toBe('R')
    expect(findExam('HSK')?.available).toBe(false)
    expect(() => getExam('HSK')).toThrow('Unknown exam')
    expect(() => getPart(toeic, 'P9')).toThrow('Unknown part')
  })
})

describe('itemSchema', () => {
  const schema = itemSchema(toeic, p5)

  it('accepts a Part 5 item and fills defaults', () => {
    const item = schema.parse(valid)
    expect(item.questions[0]).toMatchObject({
      explanationVi: '',
      skillTags: ['grammar.agreement'],
    })
  })

  it.each([
    [
      'wrong option count',
      {
        ...valid,
        questions: [{ ...valid.questions[0], options: ['a', 'b', 'c'] }],
      },
    ],
    [
      'answer out of range',
      { ...valid, questions: [{ ...valid.questions[0], answer: 4 }] },
    ],
    [
      'unknown skill tag',
      { ...valid, questions: [{ ...valid.questions[0], skillTags: ['x.y'] }] },
    ],
    ['passage on Part 5', { ...valid, passage: 'Dear team' }],
    ['no questions', { ...valid, questions: [] }],
    ['bad difficulty', { ...valid, difficulty: 'IMPOSSIBLE' }],
  ])('rejects %s', (_name, input) => {
    expect(schema.safeParse(input).success).toBe(false)
  })

  it('validates every built-in sample', () => {
    for (const sample of TOEIC_PART5_SAMPLES)
      expect(schema.safeParse(sample).error).toBeUndefined()
    for (const [code, items] of Object.entries(TOEIC_MORE_SAMPLES)) {
      const partSchema = itemSchema(toeic, getPart(toeic, code).part)
      for (const sample of items)
        expect(partSchema.safeParse(sample).error).toBeUndefined()
    }
    for (const card of TOEIC_STARTER_DECK.cards)
      expect(cardRowSchema.safeParse(card).success).toBe(true)
  })
})

describe('itemSchema by part', () => {
  const schemaOf = (code: string) =>
    itemSchema(toeic, getPart(toeic, code).part)
  const question = (extra: object = {}) => ({
    options: ['a', 'b', 'c', 'd'],
    answer: 0,
    ...extra,
  })

  it('Part 1: a scene, no question text, an uploaded photo key only', () => {
    const p1 = schemaOf('P1')
    const item = {
      difficulty: 'EASY',
      scene: 'A man reading',
      questions: [question()],
    }
    expect(p1.safeParse(item).success).toBe(true)
    expect(p1.safeParse({ ...item, scene: undefined }).success).toBe(false)
    expect(
      p1.safeParse({ ...item, questions: [question({ text: 'Q' })] }).success,
    ).toBe(false)
    expect(
      p1.safeParse({ ...item, image: 'uploads/2026/11/a/photo.png' }).success,
    ).toBe(true)
    expect(p1.safeParse({ ...item, image: 'https://evil/x.png' }).success).toBe(
      false,
    )
  })

  it('Part 3: needs a transcript of known speakers and exactly 3 questions', () => {
    const p3 = schemaOf('P3')
    const item = {
      difficulty: 'EASY',
      transcript: [{ speaker: 'W', text: 'Hi' }],
      questions: [
        question({ text: 'Q' }),
        question({ text: 'Q' }),
        question({ text: 'Q' }),
      ],
    }
    expect(p3.safeParse(item).success).toBe(true)
    expect(p3.safeParse({ ...item, transcript: undefined }).success).toBe(false)
    expect(
      p3.safeParse({ ...item, transcript: [{ speaker: 'X', text: 'Hi' }] })
        .success,
    ).toBe(false)
    expect(
      p3.safeParse({ ...item, questions: item.questions.slice(1) }).success,
    ).toBe(false)
  })

  it('Part 6: question text may be omitted', () => {
    const p6 = schemaOf('P6')
    expect(
      p6.safeParse({
        difficulty: 'EASY',
        passage: 'Text [1] [2] [3] [4]',
        questions: [question(), question(), question(), question()],
      }).success,
    ).toBe(true)
  })
})

describe('parseCsv', () => {
  it('reads quoted fields, CRLF, a BOM and skips blank lines', () => {
    const csv =
      '﻿term,meaningVi,example\r\n"comply with","tuân thủ","He said ""yes"", then left"\r\n\r\nrefund,hoàn tiền,\n'
    expect(parseCsv(csv)).toEqual([
      {
        term: 'comply with',
        meaningVi: 'tuân thủ',
        example: 'He said "yes", then left',
      },
      { term: 'refund', meaningVi: 'hoàn tiền', example: '' },
    ])
  })

  it('turns blank cells into missing optional fields', () => {
    const [row] = parseCsv('term,meaningVi,pos\ndeadline,hạn chót,')
    expect(cardRowSchema.parse(row)).toEqual({
      term: 'deadline',
      meaningVi: 'hạn chót',
    })
  })
})

describe('scaledScore', () => {
  const score = toeic.sections[0]!.score
  it.each([
    [0, 100, 5],
    [100, 100, 495],
    [50, 100, 250],
    [1, 3, 170],
    [0, 0, 5],
  ])('%i/%i correct → %i', (correct, total, expected) => {
    expect(scaledScore(score, correct, total)).toBe(expected)
  })
})
