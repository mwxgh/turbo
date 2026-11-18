import type { ExamSpec, PartSpec } from './types'

const choice = (
  code: string,
  name: string,
  nameVi: string,
  count: number,
  extra: Partial<PartSpec> = {},
): PartSpec => ({
  code,
  name,
  nameVi,
  count,
  types: ['SINGLE_CHOICE'],
  options: 4,
  questionsPerItem: [1, 1],
  media: ['text'],
  passage: false,
  available: false,
  ...extra,
})

/** Estimated, not ETS: linear 5 → 495 (the official tables are not public). */
const SECTION_SCORE = {
  min: 5,
  max: 495,
  step: 5,
  table: [
    [0, 5],
    [1, 495],
  ],
} as const

export const toeicLr: ExamSpec = {
  code: 'TOEIC_LR',
  name: 'TOEIC Listening & Reading',
  language: 'en',
  available: true,
  sections: [
    {
      code: 'L',
      name: 'Listening',
      minutes: 45,
      score: SECTION_SCORE,
      parts: [
        choice('P1', 'Photographs', 'Mô tả tranh', 6, {
          media: ['image', 'audio'],
        }),
        choice('P2', 'Question–Response', 'Hỏi – đáp', 25, {
          options: 3,
          media: ['audio'],
        }),
        choice('P3', 'Conversations', 'Hội thoại ngắn', 39, {
          questionsPerItem: [3, 3],
          media: ['audio'],
        }),
        choice('P4', 'Talks', 'Bài nói ngắn', 30, {
          questionsPerItem: [3, 3],
          media: ['audio'],
        }),
      ],
    },
    {
      code: 'R',
      name: 'Reading',
      minutes: 75,
      score: SECTION_SCORE,
      parts: [
        choice('P5', 'Incomplete Sentences', 'Điền câu chưa hoàn chỉnh', 30, {
          available: true,
        }),
        choice('P6', 'Text Completion', 'Điền đoạn văn', 16, {
          questionsPerItem: [4, 4],
          passage: true,
        }),
        choice('P7', 'Reading Comprehension', 'Đọc hiểu', 54, {
          questionsPerItem: [2, 5],
          passage: true,
        }),
      ],
    },
  ],
  skillTags: {
    'grammar.verb-tense': 'Thì của động từ',
    'grammar.verb-form': 'Dạng động từ (to V, V-ing, bị động)',
    'grammar.word-form': 'Từ loại',
    'grammar.pronoun': 'Đại từ',
    'grammar.preposition': 'Giới từ',
    'grammar.conjunction': 'Liên từ',
    'grammar.relative-clause': 'Mệnh đề quan hệ',
    'grammar.comparison': 'So sánh',
    'grammar.agreement': 'Hoà hợp chủ – vị',
    'vocab.meaning': 'Nghĩa của từ',
    'vocab.collocation': 'Cụm từ cố định',
  },
  difficulties: {
    EASY: 'Dễ (~400)',
    MEDIUM: 'Vừa (~650)',
    HARD: 'Khó (850+)',
  },
}
