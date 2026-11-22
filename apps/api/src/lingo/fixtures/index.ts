import { DECKS_A } from './decks/set-a'
import { DECKS_B } from './decks/set-b'
import { DECKS_C } from './decks/set-c'
import { FULL_01 } from './tests/full-01'
import { FULL_02 } from './tests/full-02'
import { FULL_03 } from './tests/full-03'
import { FULL_04 } from './tests/full-04'
import { FULL_05 } from './tests/full-05'
import { MINI_01 } from './tests/mini-01'
import { MINI_02 } from './tests/mini-02'
import type { DeckFixture, TestFixture } from './types'

export { PART56_DECKS } from './decks/part56'

/** Decks after the starter and topic decks (TOEIC 07…). */
export const MORE_DECKS: DeckFixture[] = [...DECKS_A, ...DECKS_B, ...DECKS_C]

/** Published sample tests, each with its own items. */
export const SAMPLE_TESTS: TestFixture[] = [
  MINI_01,
  MINI_02,
  FULL_01,
  FULL_02,
  FULL_03,
  FULL_04,
  FULL_05,
]
