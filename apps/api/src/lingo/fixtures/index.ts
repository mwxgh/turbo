import { DECKS_A } from './decks/set-a'
import { DECKS_B } from './decks/set-b'
import { MINI_01 } from './tests/mini-01'
import { MINI_02 } from './tests/mini-02'
import type { DeckFixture, TestFixture } from './types'

/** Decks after the starter and topic decks (TOEIC 07…). */
export const MORE_DECKS: DeckFixture[] = [...DECKS_A, ...DECKS_B]

/** Published sample tests, each with its own items. */
export const SAMPLE_TESTS: TestFixture[] = [MINI_01, MINI_02]
