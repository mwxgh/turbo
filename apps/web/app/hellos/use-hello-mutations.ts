'use client'

import { useMemo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Hello } from '@repo/types'
import { toast } from '@repo/ui/components/sonner'
import { type Paginated, totalPages } from '@repo/utils'

import { withToast } from '../../lib/action-toast'
import { hellosKeys } from '../../lib/queries/hellos'
import type { ActionState } from '../../lib/types'
import { createHello, deleteHello, updateHello } from './actions'
import type { HelloInput } from './hello-form'

/** Server actions with toasts; refresh the cached hello list on success (stable object). */
export function useHelloActions() {
  const queryClient = useQueryClient()
  return useMemo(() => {
    const refresh = async (res: ActionState) => {
      if (!res.errors)
        await queryClient.invalidateQueries({ queryKey: hellosKeys.all })
      return res
    }
    return {
      create: async (input: HelloInput) =>
        refresh(
          await withToast(createHello(input), {
            success: 'Hello created',
            error: 'Could not create hello',
          }),
        ),
      update: async (id: string, input: HelloInput) =>
        refresh(
          await withToast(updateHello(id, input), {
            success: 'Hello updated',
            error: 'Could not update hello',
          }),
        ),
    }
  }, [queryClient])
}

/** Delete with an optimistic update: the row disappears before the API answers. */
export function useDeleteHello() {
  const queryClient = useQueryClient()
  // Every cached page / filter of the list
  const lists = { queryKey: hellosKeys.lists() }

  return useMutation({
    mutationFn: (id: string) => deleteHello(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(lists)
      const previous = queryClient.getQueriesData<Paginated<Hello>>(lists)
      queryClient.setQueriesData<Paginated<Hello>>(
        lists,
        (old) =>
          old && {
            ...old,
            items: old.items.filter((hello) => hello.id !== id),
            total: old.total - 1,
            totalPages: totalPages(old.total - 1, old.pageSize),
          },
      )
      return { previous }
    },
    // Put the row back if the API refused
    onSuccess: () => toast.success('Hello deleted'),
    onError: (_error, _id, context) => {
      for (const [key, data] of context?.previous ?? [])
        queryClient.setQueryData(key, data)
      toast.error('Could not delete hello')
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: hellosKeys.all }),
  })
}
