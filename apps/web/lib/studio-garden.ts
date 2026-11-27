// Pure geometry and rules of the Studio garden (the tree on /studio). No clock, no randomness:
// the same garden always renders the same tree, on the server and in the browser.

/** Growth stages by finished lessons (leaves); `at` = leaves needed. */
export const STAGES = [
  { at: 0, name: 'Hạt giống' },
  { at: 1, name: 'Mầm non' },
  { at: 5, name: 'Cây non' },
  { at: 15, name: 'Cây lớn' },
  { at: 40, name: 'Cây trưởng thành' },
  { at: 100, name: 'Cổ thụ' },
] as const

export type Stage = (typeof STAGES)[number]

/** The stage a tree with `leaves` leaves is at, and the next one (null at the last). */
export function stageOf(leaves: number): {
  index: number
  stage: Stage
  next: Stage | null
} {
  const index = STAGES.findLastIndex((stage) => leaves >= stage.at)
  return {
    index,
    stage: STAGES[index]!,
    next: STAGES[index + 1] ?? null,
  }
}

/** Tree size 0–1: fast at first, slower later, full at the last stage. */
export const growthOf = (leaves: number) =>
  Math.sqrt(Math.min(leaves, STAGES.at(-1)!.at) / STAGES.at(-1)!.at)

/**
 * Share of leaves turned yellow after days without study: none while the streak is alive
 * (today or yesterday), then more each idle day, at most 80%.
 */
export function wiltOf(idleDays: number | null): number {
  if (idleDays === null || idleDays <= 1) return 0
  return Math.min(0.8, (idleDays - 1) * 0.2)
}

/** Most leaves drawn; past that the tree is full and the count says the rest. */
export const MAX_DRAWN_LEAVES = 160

const GOLDEN_ANGLE = 137.50776

/** Stable 0–1 noise for an index, so leaves tilt and shade the same on every render. */
export const noise = (i: number, salt = 0) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export interface Crown {
  cx: number
  cy: number
  rx: number
  ry: number
}

/**
 * Where leaf `i` of `count` sits in the crown: a sunflower spiral, so leaves spread evenly and
 * a new leaf lands on the rim; `angle` tilts the leaf outward.
 */
export function leafSpot(i: number, count: number, crown: Crown) {
  const r = Math.sqrt((i + 0.5) / Math.max(count, 1))
  const theta = ((i * GOLDEN_ANGLE) % 360) * (Math.PI / 180)
  return {
    x: crown.cx + Math.cos(theta) * r * crown.rx,
    y: crown.cy + Math.sin(theta) * r * crown.ry,
    angle: (theta * 180) / Math.PI + (noise(i) - 0.5) * 50,
  }
}

/** Monday-first short weekday of a yyyy-MM-dd key ("T2" … "CN"). */
export function weekdayLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  const day = new Date(Date.UTC(y!, m! - 1, d)).getUTCDay()
  return day === 0 ? 'CN' : `T${day + 1}`
}

/** One line that nudges the learner, from the streak state. */
export function gardenMessage(streak: {
  current: number
  studiedToday: boolean
  idleDays: number | null
}): string {
  if (streak.idleDays === null)
    return 'Học xong bài đầu tiên để gieo hạt cho cây của bạn.'
  if (streak.studiedToday)
    return streak.current > 1
      ? `Cây đã được tưới hôm nay. ${streak.current} ngày liên tiếp, giữ vững nhé!`
      : 'Cây đã được tưới hôm nay. Quay lại ngày mai để bắt đầu chuỗi.'
  if (streak.idleDays === 1)
    return `Học một bài hôm nay để giữ chuỗi ${streak.current} ngày.`
  return `Cây đang héo sau ${streak.idleDays} ngày chưa tưới. Học một bài để cây xanh lại.`
}
