import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner-native'

import type { Hello } from '@repo/types'

import type { HelloInput } from '../components/hello-form'
import { apiFetch } from './api'
import { hellosKeys } from './queries/hellos'

/** Create / update / delete a hello: toast the outcome, then refetch the list. */
export function useHelloMutations() {
  const queryClient = useQueryClient()
  const options = (success: string) => ({
    onSuccess: () => toast.success(success),
    onError: (error: Error) => toast.error(error.message),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: hellosKeys.all }),
  })

  return {
    create: useMutation({
      mutationFn: (input: HelloInput) =>
        apiFetch<Hello>('/hellos', {
          method: 'POST',
          body: JSON.stringify(input),
        }),
      ...options('Hello created'),
    }),
    update: useMutation({
      mutationFn: ({ id, ...input }: HelloInput & { id: string }) =>
        apiFetch<Hello>(`/hellos/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(input),
        }),
      ...options('Hello updated'),
    }),
    remove: useMutation({
      mutationFn: (id: string) =>
        apiFetch<null>(`/hellos/${id}`, { method: 'DELETE' }),
      ...options('Hello deleted'),
    }),
  }
}
