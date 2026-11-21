/** Question types the runner and the grader know. New exams add types here (GAP_FILL, MATCHING…). */
export const QUESTION_TYPES = ['SINGLE_CHOICE'] as const
export type QuestionType = (typeof QUESTION_TYPES)[number]

export type Media = 'text' | 'audio' | 'image'

export interface PartSpec {
  /** Unique within the exam: `P5` */
  code: string
  name: string
  nameVi: string
  /** Questions in a full test */
  count: number
  types: readonly QuestionType[]
  /** Options per SINGLE_CHOICE question */
  options: number
  /** Questions per item (1 for a sentence, 3–5 for a passage) */
  questionsPerItem: readonly [min: number, max: number]
  media: readonly Media[]
  /** Item content needs a passage (Part 6, 7; Part 7 separates multiple texts with a `---` line) */
  passage: boolean
  /** Item content needs a spoken script (Part 3, 4) */
  transcript: boolean
  /** Question text and options are heard, not printed (Part 1, 2) */
  spokenOptions: boolean
  /** A question needs its own text (`none`: Part 1 photos; `optional`: Part 6 blanks) */
  questionText: 'required' | 'optional' | 'none'
  /** Roughly how many questions a mini test takes from this part */
  miniCount: number
  /** What the AI writer is told about the part (format, traps, length) */
  guide: string
  /** Learners can practise it (content pipeline ready) */
  available: boolean
}

/** Estimated conversion: [correct ratio 0–1, scaled score] points, linear between them. */
export type ScoreTable = readonly (readonly [ratio: number, score: number])[]

export interface SectionSpec {
  code: string
  name: string
  minutes: number
  score: { min: number; max: number; step: number; table: ScoreTable }
  parts: readonly PartSpec[]
}

export interface ExamSpec {
  code: string
  name: string
  /** BCP 47 language learnt */
  language: string
  available: boolean
  sections: readonly SectionSpec[]
  /** Skill tag → Vietnamese label */
  skillTags: Readonly<Record<string, string>>
  /** Vietnamese label of each difficulty, with the score band it aims at */
  difficulties: Readonly<Record<'EASY' | 'MEDIUM' | 'HARD', string>>
}
