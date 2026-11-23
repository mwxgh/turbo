import type { Client } from '@elastic/elasticsearch'

import { type ProbeStatus, probe } from '@repo/utils'

/** For /health: `'up'` when the cluster answers a ping within `timeoutMs`, else `'down'` (never throws). */
export const pingElasticsearch = (
  client: Client,
  timeoutMs = 2_000,
  onError?: (error: unknown) => void,
): Promise<ProbeStatus> => probe(() => client.ping(), timeoutMs, onError)
