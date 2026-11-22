/**
 * 12-week TOEIC study plan (built for 650 → 800+, works for any target): what to do each week,
 * measured on that week's activity only. Like the roadmap, nothing is stored: the plan starts on
 * the day (UTC) of the learner's first placement test, in 7-day weeks, recomputed on every request.
 */
import { lessonById } from './lessons'
import {
  type RoadmapStats,
  type RoadmapTask,
  type TaskSpec,
  accuracyFor,
  task,
} from './roadmap'

export const PLAN_WEEKS = 12
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

/** What one week of the plan measures (RoadmapService counts it between the week's dates). */
export type WeekStats = Pick<RoadmapStats, 'parts' | 'wordsLearned' | 'tests'>

export interface PlanWeek {
  week: number
  /** Phase of the plan: build the parts, then tests, then finish */
  phase: string
  title: string
  focus: string
  tips: string[]
  /** ISO dates: 7 days from `start` (00:00 UTC) to `end` (excluded) */
  start: string | null
  end: string | null
  /** done: every task done; missed: the week is over without it */
  status: 'done' | 'missed' | 'current' | 'upcoming'
  tasks: RoadmapTask[]
  /** Lessons to read this week (course in `lessons/`) */
  lessons: { id: string; title: string }[]
}

export interface StudyPlan {
  /** Day the plan started (first placement test), null before it */
  start: string | null
  /** 1-based, null before the start and after the last week */
  currentWeek: number | null
  weeks: PlanWeek[]
}

/** Accuracy asked in a week: below the target early, the full target from week 9. */
type Level = 'warmup' | 'build' | 'target'
const LEVEL_DROP: Record<Level, number> = {
  warmup: 0.1,
  build: 0.05,
  target: 0,
}

interface WeekSpec {
  phase: string
  title: string
  focus: string
  tips: string[]
  words: number
  level: Level
  /** Questions of each part to answer this week */
  parts: Record<string, number>
  tests?: { MINI?: number; FULL?: number }
  /** Lesson ids (lessons/plan.ts) to read this week */
  lessons: string[]
}

const BUILD = 'Chắc từng Part'
const TESTS = 'Luyện đề'
const FINISH = 'Về đích'

export const TOEIC_PLAN: WeekSpec[] = [
  {
    phase: BUILD,
    title: 'Part 5: từ loại và thì',
    focus:
      'Nhận ra vị trí cần danh từ, động từ, tính từ hay trạng từ chỉ trong vài giây; nắm thì và câu bị động',
    tips: [
      'Part 5 không cần dịch cả câu: nhìn chỗ trống và các từ quanh nó trước',
      'Ghi lại mọi câu sai vì từ loại, đó là điểm mất dễ nhất ở mức 650',
      'Mỗi ngày khoảng 12 từ mới, ôn hết thẻ đến hạn trước khi học từ mới',
    ],
    words: 80,
    level: 'warmup',
    lessons: ['word-form', 'verb-tense', 'verb-form', 'agreement'],
    parts: { P5: 60, P2: 25 },
  },
  {
    phase: BUILD,
    title: 'Part 2: bẫy âm và câu hỏi gián tiếp',
    focus:
      'Nghe từ để hỏi đầu câu, loại đáp án lặp âm, nhận ra câu trả lời gián tiếp ("Let me check", "It depends")',
    tips: [
      'Đáp án lặp lại một từ trong câu hỏi thường là bẫy',
      'Câu hỏi Yes/No vẫn có thể được trả lời không có Yes/No',
      'Nghe lại câu sai và đọc to theo transcript',
    ],
    words: 80,
    level: 'warmup',
    lessons: ['p2-wh-questions', 'p2-yes-no', 'p2-indirect', 'pronoun'],
    parts: { P2: 50, P5: 40 },
  },
  {
    phase: BUILD,
    title: 'Part 3–4: đọc trước câu hỏi',
    focus:
      'Đọc 3 câu hỏi trước khi nghe, đoán bối cảnh, bắt từ khoá theo thứ tự câu hỏi',
    tips: [
      'Câu hỏi thường đi theo thứ tự thông tin trong bài nói',
      'Đáp án đúng hay diễn đạt lại (paraphrase), ít khi lặp nguyên từ',
      'Câu "What will the man probably do next?" nằm ở cuối bài',
    ],
    words: 80,
    level: 'warmup',
    lessons: ['p3-preview', 'p34-speaker-intent', 'p4-talks'],
    parts: { P3: 39, P4: 30 },
  },
  {
    phase: BUILD,
    title: 'Part 6–7: đoạn văn và bài đọc đơn',
    focus:
      'Part 6 đọc cả đoạn để chọn thì và câu chèn; Part 7 đọc câu hỏi trước, tìm từ khoá trong bài',
    tips: [
      'Câu chèn Part 6 phải nối được ý câu trước và câu sau',
      'Part 7: câu hỏi NOT/true cần đối chiếu từng đáp án với bài',
      'Cuối tuần làm một mini test để xem tiến bộ',
    ],
    words: 80,
    level: 'warmup',
    lessons: ['p6-insertion', 'p7-not-true', 'p7-vocab-in-context'],
    parts: { P6: 16, P7: 40 },
    tests: { MINI: 1 },
  },
  {
    phase: BUILD,
    title: 'Part 5 nâng cao: mệnh đề và liên từ',
    focus:
      'Mệnh đề quan hệ, liên từ và giới từ dễ nhầm (although/despite, because/because of), đảo ngữ, câu giả định',
    tips: [
      'Sau chỗ trống là mệnh đề thì cần liên từ, là cụm danh từ thì cần giới từ',
      'Mục tiêu 800+: Part 5 làm trong khoảng 10 phút, đúng từ 26/30 câu',
    ],
    words: 80,
    level: 'build',
    lessons: [
      'preposition',
      'conjunction',
      'relative-clause',
      'inversion-conditional',
    ],
    parts: { P5: 60, P6: 16 },
  },
  {
    phase: BUILD,
    title: 'Part 3–4 có bảng biểu và ý định người nói',
    focus:
      'Câu hỏi kèm hình (lịch, bảng giá, sơ đồ) và câu hỏi ý định ("Why does the woman say…?")',
    tips: [
      'Với câu có hình: nhìn hình trước, đáp án thường là thông tin không nằm trong lựa chọn',
      'Câu hỏi ý định cần hiểu ngữ cảnh, không chỉ nghĩa đen của câu được trích',
    ],
    words: 80,
    level: 'build',
    lessons: ['comparison', 'word-meaning', 'p1-photos'],
    parts: { P3: 39, P4: 30, P2: 25 },
  },
  {
    phase: BUILD,
    title: 'Part 7: bài đọc kép, bài đọc ba',
    focus:
      'Nối thông tin giữa 2–3 văn bản (email, lịch, hoá đơn); câu hỏi suy luận và từ đồng nghĩa',
    tips: [
      'Câu hỏi đầu của bộ thường chỉ cần văn bản thứ nhất',
      'Câu nối thông tin hay hỏi ngày, giá, tên: gạch chân chúng khi đọc',
      'Giữ khoảng 1 phút cho mỗi câu Part 7',
    ],
    words: 80,
    level: 'build',
    lessons: ['p7-multi-passage', 'p7-inference', 'collocation'],
    parts: { P7: 54, P5: 30 },
    tests: { MINI: 1 },
  },
  {
    phase: BUILD,
    title: 'Chữa điểm yếu',
    focus:
      'Làm lại Sổ câu sai, luyện thêm Part có tỉ lệ đúng thấp nhất, làm 2 mini test có giờ',
    tips: [
      'Xem "Điểm yếu" ở trang Luyện tập và luyện đúng dạng câu đó',
      'Câu sai lần hai: ghi vì sao sai, không chỉ ghi đáp án',
    ],
    words: 80,
    level: 'build',
    lessons: ['review-mistakes'],
    parts: { P3: 26, P4: 20, P7: 30 },
    tests: { MINI: 2 },
  },
  {
    phase: TESTS,
    title: 'Full test đầu tiên',
    focus:
      'Làm một full test có giờ, không dừng; chấm, rồi chữa kỹ từng câu sai theo Part',
    tips: [
      'Làm cùng giờ với giờ thi thật, trong phòng thi toàn màn hình',
      'Reading: Part 5–6 khoảng 20 phút, còn lại cho Part 7',
    ],
    words: 60,
    level: 'target',
    lessons: ['time-management'],
    parts: { P3: 26, P4: 20 },
    tests: { FULL: 1 },
  },
  {
    phase: TESTS,
    title: 'Tốc độ Part 7',
    focus:
      'Một full test và luyện Part 7 có giờ để còn thời gian cho bài đọc ba cuối đề',
    tips: [
      'Gặp câu quá khó: đoán, đánh dấu và đi tiếp, quay lại nếu còn giờ',
      'Không để trống câu nào: TOEIC không trừ điểm câu sai',
    ],
    words: 60,
    level: 'target',
    lessons: [],
    parts: { P7: 54 },
    tests: { FULL: 1 },
  },
  {
    phase: TESTS,
    title: 'Hai full test',
    focus:
      'Hai full test trong tuần, so sánh điểm từng phần và chữa câu sai sau mỗi đề',
    tips: [
      'Điểm hai đề chênh nhiều: xem Part nào kéo xuống',
      'Ôn lại từ vựng gặp trong đề vào thẻ của bạn',
    ],
    words: 60,
    level: 'target',
    lessons: [],
    parts: {},
    tests: { FULL: 2 },
  },
  {
    phase: FINISH,
    title: 'Về đích',
    focus:
      'Một full test cuối, rồi chỉ ôn câu sai và từ vựng; không học dạng mới trước ngày thi',
    tips: [
      'Ngủ đủ và giữ giờ học như giờ thi',
      'Ngày trước khi thi: chỉ ôn thẻ, không làm đề',
    ],
    words: 40,
    level: 'target',
    lessons: [],
    parts: { P5: 30 },
    tests: { FULL: 1 },
  },
]

/** 00:00 UTC of the day holding `date`: the plan starts on the placement test's day. */
export function dayStart(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  )
}

/** Date range of week `n` (1-based) of a plan starting on `start`. */
export function weekRange(start: Date, n: number): { from: Date; to: Date } {
  const from = new Date(start.getTime() + (n - 1) * WEEK_MS)
  return { from, to: new Date(from.getTime() + WEEK_MS) }
}

/** The week (1-based) `now` falls in, or null outside the plan. */
export function currentWeekOf(start: Date | null, now: Date): number | null {
  if (!start || now < start) return null
  const n = Math.floor((now.getTime() - start.getTime()) / WEEK_MS) + 1
  return n <= PLAN_WEEKS ? n : null
}

const NO_STATS: RoadmapStats = {
  estimate: null,
  fullScores: [],
  parts: {},
  wordsLearned: 0,
  tests: { MINI: 0, FULL: 0 },
  placementDone: false,
}

function weekTasks(
  spec: WeekSpec,
  stats: WeekStats | undefined,
  id: string,
  target: number,
): RoadmapTask[] {
  const accuracy = Math.max(0.4, accuracyFor(target) - LEVEL_DROP[spec.level])
  const specs: TaskSpec[] = [
    { kind: 'words', count: spec.words },
    ...Object.entries(spec.parts).map(([part, answered]): TaskSpec => ({
      kind: 'part',
      part,
      answered,
      accuracy,
    })),
    ...(['MINI', 'FULL'] as const).flatMap((testKind): TaskSpec[] =>
      spec.tests?.[testKind]
        ? [{ kind: 'tests', testKind, count: spec.tests[testKind] }]
        : [],
    ),
  ]
  const all = { ...NO_STATS, ...stats }
  return specs.map((s) => task(s, all, id))
}

/**
 * The 12 weeks with their status. `weeks[i]` holds the stats of week i + 1 (only past and current
 * weeks are counted); `start` is the plan's first day, null before the placement test.
 */
export function buildStudyPlan(
  start: Date | null,
  weeks: WeekStats[],
  target: number,
  now: Date,
): StudyPlan {
  const current = currentWeekOf(start, now)
  const over = !!start && current === null && now >= start
  return {
    start: start?.toISOString() ?? null,
    currentWeek: current,
    weeks: TOEIC_PLAN.map((spec, i): PlanWeek => {
      const n = i + 1
      const range = start ? weekRange(start, n) : null
      const tasks = weekTasks(spec, weeks[i], `w${n}`, target)
      const done = tasks.every((t) => t.done)
      const past = over || (current !== null && n < current)
      return {
        week: n,
        phase: spec.phase,
        title: spec.title,
        focus: spec.focus,
        tips: spec.tips,
        start: range?.from.toISOString() ?? null,
        end: range?.to.toISOString() ?? null,
        lessons: spec.lessons.flatMap((id) => {
          const lesson = lessonById(id)
          return lesson ? [{ id, title: lesson.title }] : []
        }),
        status: done
          ? 'done'
          : past
            ? 'missed'
            : n === current
              ? 'current'
              : 'upcoming',
        tasks,
      }
    }),
  }
}
