import type { ApiErrorBody } from '@repo/types'

import type { ActionState } from '@/lib/action-toast'
import { ApiError } from '@/lib/api'

/** Result of a Server Action that returns data: the data, or the API's messages. */
export type Result<T> = ActionState & { data?: T }

/** Runs an API call inside a Server Action: API errors become `errors`, others are rethrown. */
export async function run<T>(call: () => Promise<T>): Promise<Result<T>> {
  try {
    return { data: await call() }
  } catch (error) {
    if (error instanceof ApiError) {
      const message = (error.body as ApiErrorBody | null)?.message
      return { errors: [message ?? error.message].flat() }
    }
    throw error
  }
}
