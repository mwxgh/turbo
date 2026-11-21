/**
 * TOEIC study roadmap: stages in order (foundation → parts → tests → finish), each with tasks whose
 * progress comes from what the learner already did (answers, cards, attempts). Nothing is stored:
 * the roadmap is recomputed on every request. Thresholds scale with the learner's target score.
 */

/** What the roadmap is computed from (RoadmapService reads it from the database). */
export interface RoadmapStats {
  /** Latest estimated total of a placement test or full test (newest first wins) */
  estimate: number | null
  /** Scaled totals of submitted full tests */
  fullScores: number[]
  /** Latest answers per part (window of PART_WINDOW) */
  parts: Record<string, { correct: number; total: number }>
  /** Cards in review state (learned at least once) */
  wordsLearned: number
  /** Submitted full-test attempts on published tests, by test kind */
  tests: { MINI: number; FULL: number }
  placementDone: boolean
}

export type TaskKind = 'placement' | 'words' | 'part' | 'tests' | 'score'

export interface RoadmapTask {
  id: string
  kind: TaskKind
  label: string
  /** Shown next to the progress bar: "38/50 câu, 72%" */
  detail: string
  progress: number
  done: boolean
  part?: string
  testKind?: 'MINI' | 'FULL'
}

export interface RoadmapStage {
  id: string
  title: string
  goal: string
  /** Advice for the stage */
  tips: string[]
  /** done: every task done; passed: the score estimate is already above `passScore` */
  status: 'done' | 'passed' | 'current' | 'upcoming'
  passScore: number | null
  tasks: RoadmapTask[]
}

export interface Roadmap {
  target: number
  estimate: number | null
  /** Accuracy the target needs (TOEIC: about (target + 10) / 5 right answers of 200) */
  accuracy: number
  stages: RoadmapStage[]
}

export const PART_WINDOW = 100
export const DEFAULT_TARGET = 650

/** Questions of each part in the placement test (about 30, 20 minutes). */
export const PLACEMENT_COUNTS: Record<string, number> = {
  P1: 2,
  P2: 5,
  P3: 3,
  P4: 3,
  P5: 10,
  P6: 4,
  P7: 4,
}

/** Right-answer ratio a TOEIC target needs: score ≈ right × 5 − 10, out of 200 questions. */
export const accuracyFor = (target: number) =>
  Math.min(0.95, Math.max(0.4, (target + 10) / 1000))

const pct = (ratio: number) => `${Math.round(ratio * 100)}%`
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

type TaskSpec =
  | { kind: 'placement' }
  | { kind: 'words'; count: number }
  | { kind: 'part'; part: string; answered: number; accuracy: number }
  | { kind: 'tests'; testKind: 'MINI' | 'FULL'; count: number }
  | { kind: 'score'; score: number; times: number }

interface StageSpec {
  id: string
  title: string
  goal: string
  tips: string[]
  passScore: (target: number) => number | null
  tasks: (target: number) => TaskSpec[]
}

const PART_NAMES: Record<string, string> = {
  P1: 'Part 1 · Mô tả tranh',
  P2: 'Part 2 · Hỏi – đáp',
  P3: 'Part 3 · Hội thoại',
  P4: 'Part 4 · Bài nói ngắn',
  P5: 'Part 5 · Điền câu',
  P6: 'Part 6 · Điền đoạn văn',
  P7: 'Part 7 · Đọc hiểu',
}

/** Answers needed before a part's accuracy counts (enough to be more than luck). */
const PART_MIN: Record<string, number> = {
  P1: 12,
  P2: 30,
  P3: 30,
  P4: 30,
  P5: 40,
  P6: 16,
  P7: 30,
}

const part = (code: string, accuracy: number, answered = PART_MIN[code]!) =>
  ({ kind: 'part', part: code, answered, accuracy }) as const

export const TOEIC_STAGES: StageSpec[] = [
  {
    id: 'foundation',
    title: 'Xây nền',
    goal: 'Từ vựng và ngữ pháp cơ bản, làm chắc Part 5, làm quen Part 1–2.',
    tips: [
      'Mỗi ngày học 10–15 từ mới kèm phát âm và ôn hết thẻ đến hạn.',
      'Học ngữ pháp đến đâu, luyện Part 5 đến đó; đọc kỹ giải thích câu sai.',
      'Chưa cần làm Part 6–7 ở giai đoạn này.',
    ],
    passScore: () => 350,
    tasks: () => [
      { kind: 'placement' },
      { kind: 'words', count: 150 },
      part('P5', 0.6),
      part('P2', 0.5, 20),
    ],
  },
  {
    id: 'parts',
    title: 'Luyện từng Part',
    goal: 'Nắm dạng câu hỏi và bẫy của cả 7 Part, đạt tỉ lệ đúng mục tiêu ở từng Part.',
    tips: [
      'Nghe: học dạng câu và từ vựng hay gặp của Part 1–4 trước rồi mới luyện nhiều.',
      'Đọc: Part 6 cần đọc cả đoạn; Part 7 đọc câu hỏi trước, tìm từ khoá trong bài.',
      'Mỗi buổi chữa lại câu sai trong Sổ câu sai.',
    ],
    passScore: (target) => Math.max(450, target - 150),
    tasks: (target) => {
      const acc = accuracyFor(target)
      return [
        { kind: 'words', count: 400 },
        part('P1', Math.min(0.95, acc + 0.1)),
        part('P2', acc),
        part('P3', acc),
        part('P4', acc),
        part('P5', acc),
        part('P6', acc),
        part('P7', Math.max(0.4, acc - 0.05)),
      ]
    },
  },
  {
    id: 'tests',
    title: 'Luyện đề',
    goal: 'Làm đề có giờ, quen áp lực thời gian và phân bổ thời gian cho Part 7.',
    tips: [
      'Làm đề trong phòng thi toàn màn hình, không dừng giữa chừng.',
      'Sau mỗi đề, xem lại kỹ từng câu sai và ghi từ mới vào thẻ.',
      'Đọc: dành khoảng 55 phút cho Part 7.',
    ],
    passScore: () => null,
    tasks: () => [
      { kind: 'words', count: 600 },
      { kind: 'tests', testKind: 'MINI', count: 3 },
      { kind: 'tests', testKind: 'FULL', count: 2 },
    ],
  },
  {
    id: 'finish',
    title: 'Về đích',
    goal: 'Giữ điểm ổn định ở mức mục tiêu trước ngày thi.',
    tips: [
      'Làm full test mỗi tuần, cùng giờ với giờ thi thật.',
      '20–30 ngày trước ngày thi: chỉ ôn câu sai và từ vựng, không học thêm dạng mới.',
    ],
    passScore: () => null,
    tasks: (target) => [{ kind: 'score', score: target, times: 2 }],
  },
]

function task(spec: TaskSpec, stats: RoadmapStats, stage: string): RoadmapTask {
  switch (spec.kind) {
    case 'placement':
      return {
        id: `${stage}.placement`,
        kind: 'placement',
        label: 'Làm bài kiểm tra đầu vào',
        detail: stats.placementDone ? 'Đã làm' : 'Khoảng 30 câu, 20 phút',
        progress: stats.placementDone ? 1 : 0,
        done: stats.placementDone,
      }
    case 'words':
      return {
        id: `${stage}.words`,
        kind: 'words',
        label: `Thuộc ${spec.count} từ vựng`,
        detail: `${Math.min(stats.wordsLearned, spec.count)}/${spec.count} từ`,
        progress: clamp01(stats.wordsLearned / spec.count),
        done: stats.wordsLearned >= spec.count,
      }
    case 'part': {
      const s = stats.parts[spec.part] ?? { correct: 0, total: 0 }
      const ratio = s.total ? s.correct / s.total : 0
      const enough = s.total >= spec.answered
      return {
        id: `${stage}.${spec.part}`,
        kind: 'part',
        part: spec.part,
        label: `${PART_NAMES[spec.part] ?? spec.part}: đúng từ ${pct(spec.accuracy)}`,
        detail: `${Math.min(s.total, spec.answered)}/${spec.answered} câu · đúng ${pct(ratio)}`,
        // Half for volume, half for accuracy
        progress:
          clamp01(s.total / spec.answered) / 2 +
          clamp01(ratio / spec.accuracy) / 2,
        done: enough && ratio >= spec.accuracy,
      }
    }
    case 'tests': {
      const have = stats.tests[spec.testKind]
      return {
        id: `${stage}.${spec.testKind}`,
        kind: 'tests',
        testKind: spec.testKind,
        label: `Làm ${spec.count} ${spec.testKind === 'FULL' ? 'full test' : 'mini test'}`,
        detail: `${Math.min(have, spec.count)}/${spec.count} đề`,
        progress: clamp01(have / spec.count),
        done: have >= spec.count,
      }
    }
    case 'score': {
      const reached = stats.fullScores.filter((s) => s >= spec.score).length
      const best = stats.fullScores.length ? Math.max(...stats.fullScores) : 0
      return {
        id: `${stage}.score`,
        kind: 'score',
        label: `Đạt ${spec.score} điểm full test ${spec.times} lần`,
        detail: `${Math.min(reached, spec.times)}/${spec.times} lần · cao nhất ${best || '–'}`,
        progress: reached
          ? clamp01(reached / spec.times)
          : clamp01(best / spec.score) * 0.9,
        done: reached >= spec.times,
      }
    }
  }
}

export function buildRoadmap(
  stats: RoadmapStats,
  targetScore: number | null,
): Roadmap {
  const target = targetScore ?? DEFAULT_TARGET
  let current = false
  const stages = TOEIC_STAGES.map((spec): RoadmapStage => {
    const tasks = spec.tasks(target).map((t) => task(t, stats, spec.id))
    const passScore = spec.passScore(target)
    let status: RoadmapStage['status']
    if (tasks.every((t) => t.done)) status = 'done'
    else if (
      !current &&
      passScore !== null &&
      stats.estimate !== null &&
      stats.estimate >= passScore
    )
      status = 'passed'
    else if (!current) {
      status = 'current'
      current = true
    } else status = 'upcoming'
    return {
      id: spec.id,
      title: spec.title,
      goal: spec.goal,
      tips: spec.tips,
      status,
      passScore,
      tasks,
    }
  })
  return {
    target,
    estimate: stats.estimate,
    accuracy: accuracyFor(target),
    stages,
  }
}
