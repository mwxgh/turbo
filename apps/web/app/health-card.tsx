'use client'

import { useQuery } from '@tanstack/react-query'

import { Badge } from '@repo/ui/components/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { formatDate } from '@repo/utils'

import { HEALTH_POLL_MS, healthQueryOptions } from '../lib/queries/health'

/** API status, prefetched on the server and re-polled by TanStack Query. */
export function HealthCard() {
  const { data, isError, isPending, dataUpdatedAt } =
    useQuery(healthQueryOptions())
  const online = !!data && !isError

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API
          <Badge
            variant={
              online ? 'default' : isPending ? 'secondary' : 'destructive'
            }
          >
            {online ? 'online' : isPending ? 'checking…' : 'offline'}
          </Badge>
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            refreshes every {HEALTH_POLL_MS / 1000}s
            {dataUpdatedAt > 0 && ` · ${formatDate(dataUpdatedAt, 'HH:mm:ss')}`}
          </span>
        </CardTitle>
      </CardHeader>
      {online && (
        <CardContent>
          <pre
            className="overflow-x-auto rounded-md bg-muted p-3 font-mono
              text-xs"
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  )
}
