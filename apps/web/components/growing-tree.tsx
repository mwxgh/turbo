'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

/** The tree grows from a sprout to full size over this long while the page stays open. */
const GROW_MS = 3 * 60 * 1000
const DAYS = 365

const GROUND = 350
const TREE_X = 370
const TRUNK_MAX = 200

/** Canopy blobs around the top of the trunk: offset, radius, shade; they fill in one by one. */
const CANOPY = [
  { dx: 0, dy: 0, r: 36, shade: 'fill-emerald-600 dark:fill-emerald-600' },
  { dx: -32, dy: 14, r: 26, shade: 'fill-emerald-700 dark:fill-emerald-700' },
  { dx: 32, dy: 14, r: 26, shade: 'fill-emerald-700 dark:fill-emerald-700' },
  { dx: -20, dy: -28, r: 24, shade: 'fill-emerald-500 dark:fill-emerald-500' },
  { dx: 22, dy: -30, r: 24, shade: 'fill-emerald-500 dark:fill-emerald-500' },
  { dx: 0, dy: -46, r: 20, shade: 'fill-emerald-400 dark:fill-emerald-400' },
]

/** Drops leave the can's rose a moment apart and splash on the ground under it. */
const DROP_MS = 1100
const DROPS = [
  { x: 262, delay: 0 },
  { x: 274, delay: 220 },
  { x: 268, delay: 440 },
  { x: 280, delay: 660 },
  { x: 266, delay: 880 },
]

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Mostly steady with a compounding part (1.01^day), so the tree grows from the start and still
 * speeds up the way small daily gains do.
 */
const growth = (p: number) => {
  const compounded = (1.01 ** (p * DAYS) - 1) / (1.01 ** DAYS - 1)
  return 0.75 * p + 0.25 * compounded
}

/** One drop: falls with gravity from the rose to the ground, then a ring splashes out. */
function Drop({ x, delay }: { x: number; delay: number }) {
  const timing = {
    dur: `${DROP_MS}ms`,
    begin: `${delay}ms`,
    repeatCount: 'indefinite',
  }
  return (
    <g>
      <path
        d={`M${x} 0 c-4 7 -6 11 -6 14 a6 6 0 0 0 12 0 c0 -3 -2 -7 -6 -14 z`}
        className="fill-sky-500 dark:fill-sky-400"
        opacity="0"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`0 108; 0 ${GROUND - 20}`}
          keyTimes="0; 1"
          calcMode="spline"
          keySplines="0.5 0 1 1"
          {...timing}
        />
        <animate
          attributeName="opacity"
          values="0; 1; 1; 0"
          keyTimes="0; 0.1; 0.9; 1"
          {...timing}
        />
      </path>
      <ellipse
        cx={x}
        cy={GROUND - 2}
        rx="0"
        ry="0"
        fill="none"
        strokeWidth="2"
        className="stroke-sky-500 dark:stroke-sky-400"
        opacity="0"
      >
        <animate
          attributeName="rx"
          values="0; 0; 12"
          keyTimes="0; 0.88; 1"
          {...timing}
        />
        <animate
          attributeName="ry"
          values="0; 0; 3"
          keyTimes="0; 0.88; 1"
          {...timing}
        />
        <animate
          attributeName="opacity"
          values="0; 0; 1; 0"
          keyTimes="0; 0.88; 0.92; 1"
          {...timing}
        />
      </ellipse>
    </g>
  )
}

/**
 * A watering can over the ground: drops fall the whole time and a tree grows from a sprout over
 * three minutes while the sign-in page stays open, with a day counter and 1.01^day under it.
 * Reduced motion: the grown tree, no drops.
 */
export function GrowingTree() {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (reduced) return
    const start = performance.now()
    const id = window.setInterval(() => {
      const ms = performance.now() - start
      setElapsed(ms)
      if (ms >= GROW_MS) window.clearInterval(id)
    }, 100)
    return () => window.clearInterval(id)
  }, [reduced])

  const progress = reduced ? 1 : clamp01(elapsed / GROW_MS)
  const day = Math.round(progress * DAYS)
  const g = growth(progress)

  const trunk = 8 + (TRUNK_MAX - 8) * g
  const top = GROUND - trunk
  const trunkWidth = 3 + 15 * g
  /** Two sprout leaves until the canopy takes over */
  const sprout = clamp01(g / 0.06) * (1 - clamp01((g - 0.12) / 0.08))
  const branches = clamp01((g - 0.15) / 0.15)
  const canopySize = 0.5 + g

  return (
    <figure className="flex flex-col gap-4" aria-hidden="true">
      <svg viewBox="0 0 480 382" className="w-full">
        {/* Ground */}
        <ellipse
          cx={TREE_X - 50}
          cy={GROUND + 6}
          rx="160"
          ry="12"
          className="fill-amber-900/25 dark:fill-amber-700/25"
        />

        {/* Watering can, tilted towards the ground under the tree */}
        <g transform="translate(150 95) rotate(18)">
          <path
            d="M-35 -35 C-35 -78 35 -78 35 -35"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-foreground/25"
          />
          <path
            d="M50 8 L118 -22"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-foreground/25"
          />
          <ellipse
            cx="122"
            cy="-24"
            rx="5"
            ry="10"
            transform="rotate(-24 122 -24)"
            className="fill-foreground/35"
          />
          <rect
            x="-55"
            y="-35"
            width="110"
            height="72"
            rx="14"
            strokeWidth="2"
            className="fill-card stroke-foreground/20"
          />
          <rect
            x="-55"
            y="-6"
            width="110"
            height="6"
            className="fill-sky-500/25 dark:fill-sky-400/25"
          />
        </g>

        {!reduced && DROPS.map((drop) => <Drop key={drop.delay} {...drop} />)}

        {/* Tree */}
        <path
          d={`M${TREE_X} ${GROUND} L${TREE_X} ${top}`}
          strokeWidth={trunkWidth}
          strokeLinecap="round"
          className="stroke-amber-900 dark:stroke-amber-700"
        />
        {branches > 0 && (
          <g
            strokeWidth={2 + 4 * g}
            strokeLinecap="round"
            className="stroke-amber-900 dark:stroke-amber-700"
            opacity={branches}
          >
            <path
              d={`M${TREE_X} ${top + trunk * 0.35} L${TREE_X - 30 * canopySize} ${top + 12}`}
            />
            <path
              d={`M${TREE_X} ${top + trunk * 0.45} L${TREE_X + 30 * canopySize} ${top + 12}`}
            />
          </g>
        )}
        {sprout > 0 &&
          [1, -1].map((side) => (
            <path
              key={side}
              d="M0 0 C8 -10 22 -10 30 0 C22 7 8 7 0 0 Z"
              transform={`translate(${TREE_X} ${top}) scale(${side * sprout} ${sprout}) rotate(-35)`}
              className="fill-emerald-500"
            />
          ))}
        {CANOPY.map((blob, i) => {
          const s = clamp01((g - 0.1 - i * 0.05) / 0.15)
          if (s === 0) return null
          return (
            <circle
              key={i}
              cx={TREE_X + blob.dx * canopySize}
              cy={top + blob.dy * canopySize}
              r={blob.r * canopySize * s}
              className={blob.shade}
            />
          )
        })}
      </svg>

      <figcaption
        className="flex items-baseline justify-between font-mono text-sm
          text-muted-foreground tabular-nums"
      >
        <span>
          Day {day} of {DAYS}
        </span>
        <span>
          1.01<sup>{day}</sup> ={' '}
          <span className="text-foreground">{(1.01 ** day).toFixed(2)}×</span>
        </span>
      </figcaption>
    </figure>
  )
}
