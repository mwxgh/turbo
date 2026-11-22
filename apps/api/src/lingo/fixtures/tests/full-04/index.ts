import type { TestFixture } from '../../types'
import { P2 } from './p2'
import { P3 } from './p3'
import { P4 } from './p4'
import { P5 } from './p5'
import { P6 } from './p6'
import { P7_MULTI } from './p7-multi'
import { P7_SINGLE } from './p7-single'

/** Full test at the ETS counts of Parts 2–7 (194 questions); Part 1 waits for photos. */
export const FULL_04: TestFixture = {
  title: 'Lingo Full Test 04',
  description:
    'Đề full TOEIC Listening & Reading Part 2–7 (194 câu, chưa có Part 1), độ khó cho mục tiêu 850–950, nhiều câu khó, biên soạn riêng cho Lingo.',
  kind: 'FULL',
  items: {
    P2,
    P3,
    P4,
    P5,
    P6,
    // Single passages first, then double and triple, as in the exam
    P7: [...P7_SINGLE, ...P7_MULTI],
  },
}
