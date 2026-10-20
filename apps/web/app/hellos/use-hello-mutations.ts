'use client'

import { useMemo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type Paginated, totalPages } from '@repo/utils'

import { hellosKeys } from '../../lib/queries/hellos'
import type { Hello } from '../../lib/types'
import {
  type ActionState,
  type HelloInput,
  createHello,
  deleteHello,
  updateHello,
} from './actions'

/** Server actions that refresh the cached hello list on success (stable object). */
export function useHelloActions() {
  const queryClient = useQueryClient()
  return useMemo(() => {
    const refresh = async (res: ActionState) => {
      if (!res.errors)
        await queryClient.invalidateQueries({ queryKey: hellosKeys.all })
      return res
    }
    return {
      create: async (input: HelloInput) => refresh(await createHello(input)),
      update: async (id: string, input: HelloInput) =>
        refresh(await updateHello(id, input)),
    }
  }, [queryClient])
}

/** Delete with an optimistic update: the row disappears before the API answers. */
export function useDeleteHello() {
  const queryClient = useQueryClient()
  const key = hellosKeys.list()

  return useMutation({
    mutationFn: (id: string) => deleteHello(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<Paginated<Hello>>(key)
      queryClient.setQueryData<Paginated<Hello>>(
        key,
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
    onError: (_error, _id, context) => {
      queryClient.setQueryData(key, context?.previous)
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: hellosKeys.all }),
  })
}
