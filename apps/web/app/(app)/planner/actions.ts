'use server'

// Mutations for /planner. Callers update / invalidate `plannerKeys.all` (see use-planner-mutations).
import type { ApiErrorBody, PlannerTask } from '@repo/types'

import type { ActionState } from '@/lib/action-toast'
import { ApiError, apiFetch } from '@/lib/api'

/** Body of POST /planner/tasks (PATCH takes any subset); `date` is `yyyy-MM-dd` or null. */
export type PlannerTaskInput = Partial<
  Pick<
    PlannerTask,
    | 'title'
    | 'note'
    | 'status'
    | 'priority'
    | 'date'
    | 'startMinute'
    | 'durationMinutes'
    | 'color'
    | 'position'
  >
>

/** Validation lives in the API's DTOs; surface its messages to the caller. */
function toState(error: unknown): ActionState {
  if (error instanceof ApiError) {
    const message = (error.body as ApiErrorBody | null)?.message
    return { errors: [message ?? error.message].flat() }
  }
  throw error
}

export async function createTask(
  input: PlannerTaskInput,
): Promise<ActionState> {
  try {
    await apiFetch<PlannerTask>('/planner/tasks', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  } catch (error) {
    return toState(error)
  }
  return {}
}

export async function updateTask(
  id: string,
  input: PlannerTaskInput,
): Promise<ActionState> {
  try {
    await apiFetch<PlannerTask>(`/planner/tasks/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
  } catch (error) {
    return toState(error)
  }
  return {}
}

export async function deleteTask(id: string): Promise<void> {
  await apiFetch(`/planner/tasks/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}
