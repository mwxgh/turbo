import { SubscribeMessage } from '@nestjs/websockets'

import type { ClientToServerEvents } from '@repo/socket-events'

/**
 * `@SubscribeMessage` restricted to events declared in `@repo/socket-events`,
 * so renaming or removing an event there breaks the gateway at compile time.
 */
export const SubscribeEvent = <E extends keyof ClientToServerEvents>(
  event: E,
) => SubscribeMessage(event)
