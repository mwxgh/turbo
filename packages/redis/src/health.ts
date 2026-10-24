import type { Redis } from 'ioredis'

/** For /health: `'up'` when PING answers within `timeoutMs`, else `'down'` (never throws). */
export async function pingRedis(
  redis: Redis,
  timeoutMs = 2_000,
): Promise<'up' | 'down'> {
  let timer: NodeJS.Timeout | undefined
  try {
    await Promise.race([
      redis.ping(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('timeout')), timeoutMs)
      }),
    ])
    return 'up'
  } catch {
    return 'down'
  } finally {
    clearTimeout(timer)
  }
}
