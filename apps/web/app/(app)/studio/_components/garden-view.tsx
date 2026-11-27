'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { Apple, Flame, Flower, Leaf } from 'pulsoicon-react'

import { Progress } from '@repo/ui/components/progress'
import { cn } from '@repo/ui/lib/utils'
import { formatDate, toDateKey } from '@repo/utils'

import { type StudioGarden, gardenQueryOptions } from '@/lib/queries/studio'
import { lessonHref } from '@/lib/studio'
import {
  type Crown,
  MAX_DRAWN_LEAVES,
  gardenMessage,
  growthOf,
  leafSpot,
  noise,
  stageOf,
  weekdayLabel,
  wiltOf,
} from '@/lib/studio-garden'

const GROUND = 300
const TREE_X = 180

const LEAF_PATH = 'M0 0 C3 -5 10 -5 14 0 C10 5 3 5 0 0 Z'
const LEAF_SHADES = [
  'fill-emerald-500 dark:fill-emerald-400',
  'fill-emerald-600 dark:fill-emerald-500',
  'fill-green-500 dark:fill-green-400',
]
const WILTED_SHADES = [
  'fill-amber-400 dark:fill-amber-300',
  'fill-yellow-600 dark:fill-yellow-500',
]

/** The tree: trunk and crown size from the stage, a leaf per finished lesson. */
function GardenTree({ garden }: { garden: StudioGarden }) {
  const leaves = garden.leaves.length
  const g = growthOf(leaves)
  const wilt = wiltOf(garden.streak.idleDays)
  const today = garden.streak.week.at(-1)?.date

  const trunk = leaves ? 30 + 150 * g : 0
  const top = GROUND - trunk
  const crown: Crown = {
    cx: TREE_X,
    cy: top - 6 - 30 * g,
    rx: 26 + 104 * g,
    ry: 20 + 70 * g,
  }
  const drawn = garden.leaves.slice(-MAX_DRAWN_LEAVES)
  const fallen = Math.round(wilt * 6)

  return (
    <svg
      viewBox="0 0 360 320"
      role="img"
      aria-label={`Cây có ${leaves} lá, ${garden.flowers.length} hoa, ${garden.fruits.length} quả`}
      className="w-full max-w-sm"
    >
      <ellipse
        cx={TREE_X}
        cy={GROUND + 4}
        rx="150"
        ry="12"
        className="fill-amber-900/20 dark:fill-amber-700/25"
      />

      {leaves === 0 ? (
        // Seed in the soil, waiting for the first lesson
        <ellipse
          cx={TREE_X}
          cy={GROUND - 4}
          rx="9"
          ry="6"
          className="fill-amber-800 dark:fill-amber-600"
        />
      ) : (
        <>
          <path
            d={`M${TREE_X} ${GROUND} L${TREE_X} ${top}`}
            strokeWidth={3 + 15 * g}
            strokeLinecap="round"
            className="stroke-amber-900 dark:stroke-amber-700"
          />
          {g > 0.2 && (
            <g
              strokeWidth={2 + 5 * g}
              strokeLinecap="round"
              className="stroke-amber-900 dark:stroke-amber-700"
            >
              {[-1, 1].map((side) => (
                <path
                  key={side}
                  d={`M${TREE_X} ${top + trunk * 0.3} Q${TREE_X + side * crown.rx * 0.3} ${top} ${TREE_X + side * crown.rx * 0.6} ${crown.cy}`}
                  fill="none"
                />
              ))}
            </g>
          )}

          {drawn.map((leaf, i) => {
            const spot = leafSpot(i, drawn.length, crown)
            const wilted = noise(i, 2) < wilt
            const fresh = toDateKey(leaf.completedAt) === today
            const shades = wilted ? WILTED_SHADES : LEAF_SHADES
            const scale = 1 + 0.5 * g + (fresh ? 0.3 : 0)
            return (
              <path
                key={`${leaf.track.slug}/${leaf.slug}`}
                d={LEAF_PATH}
                transform={`translate(${spot.x} ${spot.y}) rotate(${spot.angle + (wilted ? 40 : 0)}) scale(${scale})`}
                className={cn(
                  shades[Math.floor(noise(i, 1) * shades.length)],
                  fresh && 'stroke-lime-300 dark:stroke-lime-200',
                )}
                strokeWidth={fresh ? 1.2 : 0}
              >
                <title>
                  {`${leaf.title} · ${leaf.track.title} · ${formatDate(leaf.completedAt)}`}
                </title>
              </path>
            )
          })}

          {garden.flowers.map((flower, i) => {
            const spot = leafSpot(i * 7 + 3, garden.flowers.length * 7 + 6, {
              ...crown,
              rx: crown.rx * 0.85,
              ry: crown.ry * 0.85,
            })
            return (
              <g key={flower.slug} transform={`translate(${spot.x} ${spot.y})`}>
                <title>{`Hoa: học xong chủ đề ${flower.title}`}</title>
                {[0, 72, 144, 216, 288].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="0"
                    cy="-4.5"
                    rx="3"
                    ry="4.5"
                    transform={`rotate(${angle})`}
                    className="fill-pink-400 dark:fill-pink-300"
                  />
                ))}
                <circle r="2.5" className="fill-yellow-300" />
              </g>
            )
          })}

          {garden.fruits.map((fruit, i) => {
            const x =
              TREE_X + (i % 2 ? 1 : -1) * crown.rx * (0.3 + 0.12 * (i >> 1))
            const y = crown.cy + crown.ry * 0.55
            return (
              <g key={fruit.slug} transform={`translate(${x} ${y})`}>
                <title>{`Quả: hoàn thành lộ trình ${fruit.title}`}</title>
                <path
                  d="M0 -8 L1 -12"
                  strokeWidth="1.5"
                  className="stroke-amber-900 dark:stroke-amber-700"
                />
                <circle r="8" className="fill-red-500 dark:fill-red-400" />
                <circle r="2.2" cx="-3" cy="-3" className="fill-white/50" />
              </g>
            )
          })}

          {Array.from({ length: fallen }, (_, i) => (
            <path
              key={i}
              d={LEAF_PATH}
              transform={`translate(${TREE_X - 120 + noise(i, 5) * 240} ${GROUND - 2 + noise(i, 6) * 8}) rotate(${noise(i, 7) * 180})`}
              className={WILTED_SHADES[i % 2]}
              opacity="0.8"
            />
          ))}
        </>
      )}
    </svg>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
      {icon}
      <span className="text-xl font-medium tabular-nums">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

/** Studio achievements: a tree that grows with every finished lesson, and the daily streak. */
export function GardenView() {
  const { data: garden } = useQuery(gardenQueryOptions())
  if (!garden) return null

  const leaves = garden.leaves.length
  const { stage, next } = stageOf(leaves)
  const { streak } = garden
  const toNext = next ? next.at - leaves : 0
  const latest = garden.leaves.slice(-3).reverse()

  return (
    <section
      aria-labelledby="garden-heading"
      className="grid gap-6 rounded-xl border bg-card p-5 shadow-xs sm:p-6
        md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
    >
      <div className="flex items-end justify-center">
        <GardenTree garden={garden} />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 id="garden-heading" className="text-lg font-medium">
            Khu vườn của bạn
          </h2>
          <p className="text-2xl font-medium tracking-tight">{stage.name}</p>
          <p className="text-sm text-pretty text-muted-foreground">
            {gardenMessage(streak)}
          </p>
        </div>

        {next && (
          <div className="flex flex-col gap-1.5">
            <Progress
              value={(leaves / next.at) * 100}
              aria-label={`${leaves}/${next.at} lá tới ${next.name}`}
            />
            <span className="text-xs text-muted-foreground tabular-nums">
              Thêm {toNext} lá nữa thành {next.name}
            </span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Stat
            icon={
              <Leaf
                aria-hidden
                className="size-5 text-emerald-600 dark:text-emerald-400"
              />
            }
            value={leaves}
            label="Lá · bài xong"
          />
          <Stat
            icon={
              <Flower
                aria-hidden
                className="size-5 text-pink-500 dark:text-pink-300"
              />
            }
            value={garden.flowers.length}
            label="Hoa · chủ đề"
          />
          <Stat
            icon={
              <Apple
                aria-hidden
                className="size-5 text-red-500 dark:text-red-400"
              />
            }
            value={garden.fruits.length}
            label="Quả · lộ trình"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Flame
              aria-hidden
              className={cn(
                'size-5',
                streak.current > 0
                  ? 'text-orange-500 dark:text-orange-400'
                  : 'text-muted-foreground',
              )}
            />
            <span className="font-medium tabular-nums">
              {streak.current} ngày liên tiếp
            </span>
            <span className="text-muted-foreground tabular-nums">
              · kỷ lục {streak.best} · {streak.activeDays} ngày đã học
            </span>
          </div>
          <ol className="grid grid-cols-7 gap-1.5" aria-label="7 ngày gần nhất">
            {streak.week.map((day, i) => (
              <li
                key={day.date}
                className="flex flex-col items-center gap-1 text-xs
                  text-muted-foreground"
              >
                <span
                  aria-label={`${formatDate(day.date)}: ${day.studied ? 'có học' : 'chưa học'}`}
                  className={cn(
                    'size-6 rounded-full border',
                    day.studied
                      ? `border-emerald-600 bg-emerald-500
                        dark:border-emerald-400 dark:bg-emerald-400`
                      : 'bg-muted',
                    i === streak.week.length - 1 &&
                      'ring-2 ring-ring/40 ring-offset-1 ring-offset-card',
                  )}
                />
                {weekdayLabel(day.date)}
              </li>
            ))}
          </ol>
        </div>

        {latest.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-medium">Lá mới nhất</h3>
            <ul className="flex flex-col gap-1 text-sm">
              {latest.map((leaf) => (
                <li
                  key={`${leaf.track.slug}/${leaf.slug}`}
                  className="flex items-baseline gap-2"
                >
                  <Leaf
                    aria-hidden
                    className="size-3.5 shrink-0 translate-y-0.5
                      text-emerald-600 dark:text-emerald-400"
                  />
                  <Link
                    href={lessonHref(leaf.track.slug, leaf.slug)}
                    className="min-w-0 truncate hover:underline"
                  >
                    {leaf.title}
                  </Link>
                  <span
                    className="ml-auto shrink-0 text-xs text-muted-foreground
                      tabular-nums"
                  >
                    {formatDate(leaf.completedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
