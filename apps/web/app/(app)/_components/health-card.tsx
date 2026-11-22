'use client'

import { useQuery } from '@tanstack/react-query'

import { formatDate } from '@repo/utils'

import { HEALTH_POLL_MS, healthQueryOptions } from '@/lib/queries/health'

/**
 * API status as one quiet line (dot, state, each dependency check, last refresh), prefetched on
 * the server and re-polled by TanStack Query.
 */
export function HealthCard() {
  const { data, isError, isPending, dataUpdatedAt } =
    useQuery(healthQueryOptions())
  const online = !!data && !isError

  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border
        bg-card px-5 py-4 text-sm"
    >
      <span className="flex items-center gap-2 font-medium">
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${
            online
              ? 'bg-emerald-500'
              : isPending
                ? 'bg-muted-foreground/50'
                : 'bg-destructive'
            }`}
        />
        API
        <span className="font-normal text-muted-foreground">
          {online ? 'online' : isPending ? 'checking…' : 'offline'}
        </span>
      </span>
      {online && (
        <ul
          className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs
            text-muted-foreground"
        >
          <li>env: {data.env}</li>
          {Object.entries(data.checks ?? {}).map(([name, state]) => (
            <li
              key={name}
              className={state === 'down' ? 'text-destructive' : undefined}
            >
              {name}: {state}
            </li>
          ))}
        </ul>
      )}
      <span className="ml-auto text-xs text-muted-foreground tabular-nums">
        every {HEALTH_POLL_MS / 1000}s
        {dataUpdatedAt > 0 && ` · ${formatDate(dataUpdatedAt, 'HH:mm:ss')}`}
      </span>
    </div>
  )
}
