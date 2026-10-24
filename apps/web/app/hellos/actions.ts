'use server'

// Mutations for /hellos. The page's data lives in the TanStack Query cache:
// callers invalidate `hellosKeys.all` after success (see use-hello-mutations).
import { ApiError, apiFetch } from '../../lib/api'
import type {
  ActionState,
  ApiErrorBody,
  Hello,
  HelloInput,
} from '../../lib/types'

/** Validation lives in the API's DTOs; surface its error messages to the form. */
function toState(error: unknown): ActionState {
  if (error instanceof ApiError) {
    const message = (error.body as ApiErrorBody | null)?.message
    return { errors: [message ?? error.message].flat() }
  }
  throw error
}

export async function createHello(input: HelloInput): Promise<ActionState> {
  try {
    await apiFetch<Hello>('/hellos', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  } catch (error) {
    return toState(error)
  }
  return {}
}

export async function updateHello(
  id: string,
  input: HelloInput,
): Promise<ActionState> {
  try {
    await apiFetch<Hello>(`/hellos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
  } catch (error) {
    return toState(error)
  }
  return {}
}

export async function deleteHello(id: string): Promise<void> {
  await apiFetch(`/hellos/${id}`, { method: 'DELETE' })
}
