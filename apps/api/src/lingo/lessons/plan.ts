import type { ModuleId } from './types'

/**
 * Every lesson of the course, in study order: the content files must define exactly these ids
 * (the study plan links to them, so an id never changes once published).
 */
export const LESSON_IDS: Record<ModuleId, string[]> = {
  grammar: [
    'word-form',
    'verb-tense',
    'verb-form',
    'agreement',
    'pronoun',
    'preposition',
    'conjunction',
    'relative-clause',
    'comparison',
    'inversion-conditional',
  ],
  vocab: ['word-meaning', 'collocation'],
  listening: [
    'p1-photos',
    'p2-wh-questions',
    'p2-yes-no',
    'p2-indirect',
    'p3-preview',
    'p34-speaker-intent',
    'p4-talks',
  ],
  reading: [
    'p6-insertion',
    'p7-not-true',
    'p7-inference',
    'p7-vocab-in-context',
    'p7-multi-passage',
  ],
  strategy: ['time-management', 'review-mistakes'],
}
