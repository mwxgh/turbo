import { cn } from '@repo/ui/lib/utils'

import { percent } from '@/lib/lingo'

export interface DonutSegment {
  label: string
  value: number
  /** Stroke + legend swatch color (theme token classes) */
  className: string
}

const R = 40
const C = 2 * Math.PI * R
/** Surface gap between two filled segments, in SVG units */
const GAP = 2

/**
 * A ring of segments with the share of the first one in the middle. Each segment has a hover
 * tooltip; the legend (two or more named segments) keeps identity from relying on color alone.
 */
export function ProgressDonut({
  title,
  segments,
  caption,
  legend = false,
}: {
  title: string
  segments: DonutSegment[]
  caption: string
  legend?: boolean
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const share = total > 0 ? (segments[0]?.value ?? 0) / total : null
  const filled = segments.filter((s) => s.value > 0).length
  let start = 0
  return (
    <figure
      className="flex flex-col items-center gap-3 rounded-xl border bg-card p-5
        shadow-xs"
    >
      <figcaption className="self-start text-sm text-muted-foreground">
        {title}
      </figcaption>
      <div className="relative size-32">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${title}: ${share === null ? 'chưa có dữ liệu' : percent(share)}. ${caption}`}
          className="size-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="10"
            className="stroke-muted"
          />
          {total > 0 &&
            segments.map((s) => {
              const length = (s.value / total) * C
              const offset = start
              start += length
              if (s.value <= 0) return null
              const dash = Math.max(length - (filled > 1 ? GAP : 0), 0)
              return (
                <circle
                  key={s.label}
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  strokeWidth="10"
                  strokeDasharray={`${dash} ${C - dash}`}
                  strokeDashoffset={-offset}
                  className={cn(
                    'transition-opacity hover:opacity-80',
                    s.className,
                  )}
                >
                  <title>{`${s.label}: ${s.value} (${percent(s.value / total)})`}</title>
                </circle>
              )
            })}
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-2xl
            font-medium tabular-nums"
        >
          {share === null ? '–' : percent(share)}
        </span>
      </div>
      <p className="text-center text-xs text-muted-foreground tabular-nums">
        {caption}
      </p>
      {legend && (
        <ul
          className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs
            text-muted-foreground"
        >
          {segments.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-1.5 tabular-nums"
            >
              <svg aria-hidden="true" viewBox="0 0 8 8" className="size-2">
                {/* A thick stroke fills the dot, so the swatch reuses the ring's stroke class */}
                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  fill="none"
                  strokeWidth="4"
                  className={s.className}
                />
              </svg>
              {s.label} {s.value}
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}
