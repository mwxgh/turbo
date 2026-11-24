'use client'

import { useMemo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PlannerTask } from '@repo/types'
import { toast } from '@repo/ui/components/sonner'

import { type ActionState, withToast } from '@/lib/action-toast'
import { plannerKeys } from '@/lib/queries/planner'

import {
  type PlannerTaskInput,
  createTask,
  deleteTask,
  updateTask,
} from './actions'

/** Every cached range of the planner. */
const ranges = { queryKey: plannerKeys.all }

/** Create / edit from the task dialog, with toasts; refresh the planner on success (stable object). */
export function useTaskActions() {
  const queryClient = useQueryClient()
  return useMemo(() => {
    const refresh = async (res: ActionState) => {
      if (!res.errors) await queryClient.invalidateQueries(ranges)
      return res
    }
    return {
      create: async (input: PlannerTaskInput) =>
        refresh(
          await withToast(createTask(input), {
            success: 'Đã thêm việc',
            error: 'Không thêm được việc',
          }),
        ),
      update: async (id: string, input: PlannerTaskInput) =>
        refresh(
          await withToast(updateTask(id, input), {
            success: 'Đã lưu thay đổi',
            error: 'Không lưu được thay đổi',
          }),
        ),
    }
  }, [queryClient])
}

/** Patch the cached tasks as the API will (the date as the API sends it back). */
export function patchTasks(
  tasks: PlannerTask[] | undefined,
  id: string,
  patch: PlannerTaskInput,
): PlannerTask[] | undefined {
  return tasks?.map((task) =>
    task.id === id
      ? {
          ...task,
          ...patch,
          date:
            patch.date === undefined
              ? task.date
              : patch.date && `${patch.date.slice(0, 10)}T00:00:00.000Z`,
        }
      : task,
  )
}

export interface MoveVariables {
  id: string
  patch: PlannerTaskInput
  /** Toast on success, e.g. "Chuyển sang Đang làm" */
  message: string
}

/** Drag and drop, done toggles: the card moves before the API answers, and moves back if it refuses. */
export function useMoveTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, patch }: MoveVariables) => {
      const res = await updateTask(id, patch)
      if (res.errors) throw new Error(res.errors.join(' · '))
    },
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries(ranges)
      const previous = queryClient.getQueriesData<PlannerTask[]>(ranges)
      queryClient.setQueriesData<PlannerTask[]>(ranges, (old) =>
        patchTasks(old, id, patch),
      )
      return { previous }
    },
    onSuccess: (_data, { message }) => toast.success(message),
    onError: (error, _vars, context) => {
      for (const [key, data] of context?.previous ?? [])
        queryClient.setQueryData(key, data)
      toast.error('Không di chuyển được việc', { description: error.message })
    },
    onSettled: () => queryClient.invalidateQueries(ranges),
  })
}

/** Delete with an optimistic update: the task disappears before the API answers. */
export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(ranges)
      const previous = queryClient.getQueriesData<PlannerTask[]>(ranges)
      queryClient.setQueriesData<PlannerTask[]>(ranges, (old) =>
        old?.filter((task) => task.id !== id),
      )
      return { previous }
    },
    onSuccess: () => toast.success('Đã xoá việc'),
    onError: (_error, _id, context) => {
      for (const [key, data] of context?.previous ?? [])
        queryClient.setQueryData(key, data)
      toast.error('Không xoá được việc')
    },
    onSettled: () => queryClient.invalidateQueries(ranges),
  })
}
