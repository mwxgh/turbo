import type { Redis } from 'ioredis'

import { type ProbeStatus, probe } from '@repo/utils'

/** For /health: `'up'` when PING answers within `timeoutMs`, else `'down'` (never throws). */
export const pingRedis = (
  redis: Redis,
  timeoutMs = 2_000,
  onError?: (error: unknown) => void,
): Promise<ProbeStatus> => probe(() => redis.ping(), timeoutMs, onError)
