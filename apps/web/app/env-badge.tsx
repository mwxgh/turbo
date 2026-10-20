import { Badge } from '@repo/ui/components/badge'
import { cn } from '@repo/ui/lib/utils'
import { type AppEnv, AppEnv as Env } from '@repo/utils'

import { publicEnv } from '../lib/env'

const COLORS: Record<Exclude<AppEnv, 'prod'>, string> = {
  dev: 'bg-blue-600 text-white',
  stg: 'bg-amber-600 text-white',
}

/** Corner label so nobody mistakes dev/stg for production. Hidden on prod. */
export function EnvBadge({ env = publicEnv.appEnv }: { env?: AppEnv }) {
  if (env === Env.Prod) return null
  return (
    <Badge
      aria-label={`Environment: ${env}`}
      className={cn(
        `pointer-events-none fixed right-3 bottom-3 z-50 font-mono
        tracking-widest`,
        COLORS[env],
      )}
    >
      {env.toUpperCase()}
    </Badge>
  )
}
