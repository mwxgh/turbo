'use client'

import { useState } from 'react'

import Link from 'next/link'

export interface ChartPoint {
  id: string
  value: number
  /** Axis and tooltip label (a date) */
  label: string
  detail: string
  href: string
}

const W = 640
const H = 220
const PAD = { top: 16, right: 16, bottom: 28, left: 40 }

/**
 * One series over time: a 2px line, 8px points, recessive grid. Hover or focus a point for its
 * value; each point links to its result. The list under the chart is the table view.
 */
export function ProgressChart({
  points,
  max,
  format,
  label,
}: {
  points: ChartPoint[]
  max: number
  format: (value: number) => string
  label: string
}) {
  const [active, setActive] = useState<number>()
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const x = (i: number) =>
    PAD.left +
    (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW)
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)
  const line = points.map((p, i) => `${x(i)},${y(p.value)}`).join(' ')
  const point = active === undefined ? undefined : points[active]
  // Label the first and last date; the rest are in the tooltip
  const axisLabels = new Set([0, points.length - 1])

  return (
    <figure className="relative flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={label}
        className="h-auto w-full overflow-visible"
        onMouseLeave={() => setActive(undefined)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={y(t)}
              dy="0.32em"
              textAnchor="end"
              className="fill-muted-foreground font-mono text-[11px]
                tabular-nums"
            >
              {format(t)}
            </text>
          </g>
        ))}
        {point && (
          <line
            x1={x(active!)}
            x2={x(active!)}
            y1={PAD.top}
            y2={PAD.top + innerH}
            className="stroke-muted-foreground/40"
            strokeWidth={1}
          />
        )}
        <polyline
          points={line}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <g key={p.id}>
            {axisLabels.has(i) && (
              <text
                x={x(i)}
                y={H - 8}
                textAnchor={
                  points.length === 1 ? 'middle' : i === 0 ? 'start' : 'end'
                }
                className="fill-muted-foreground font-mono text-[11px]"
              >
                {p.label}
              </text>
            )}
            <circle
              cx={x(i)}
              cy={y(p.value)}
              r={active === i ? 6 : 4}
              className="fill-primary stroke-card"
              strokeWidth={2}
            />
            {/* Hit target larger than the mark */}
            <Link
              href={p.href}
              aria-label={`${p.label}: ${format(p.value)}, ${p.detail}`}
            >
              <circle
                cx={x(i)}
                cy={y(p.value)}
                r={14}
                fill="transparent"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(undefined)}
              />
            </Link>
          </g>
        ))}
      </svg>
      {point && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 flex -translate-x-1/2
            -translate-y-full flex-col rounded-lg border bg-popover px-3 py-2
            text-xs text-popover-foreground shadow-md"
          style={{
            left: `${(x(active!) / W) * 100}%`,
            top: `calc(${(y(point.value) / H) * 100}% - 10px)`,
          }}
        >
          <span className="text-sm font-medium tabular-nums">
            {format(point.value)}
          </span>
          <span className="text-muted-foreground">{point.label}</span>
          <span className="whitespace-nowrap">{point.detail}</span>
        </div>
      )}
    </figure>
  )
}
