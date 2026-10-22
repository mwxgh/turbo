import { toast } from '@repo/ui/components/sonner'

import type { ActionState } from './types'

/**
 * Await a Server Action and toast its outcome. API errors are still returned,
 * so a form keeps showing them next to its fields; a request that never got an
 * answer (network, server down) becomes an error instead of an unhandled rejection.
 */
export async function withToast(
  action: Promise<ActionState>,
  messages: { success: string; error: string },
): Promise<ActionState> {
  let res: ActionState
  try {
    res = await action
  } catch {
    res = { errors: ['Could not reach the server'] }
  }
  if (res.errors)
    toast.error(messages.error, { description: res.errors.join(' · ') })
  else toast.success(messages.success)
  return res
}
