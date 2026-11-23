'use client'

import { type ReactNode, useCallback, useRef, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/alert-dialog'

export interface ConfirmOptions {
  title: string
  description?: ReactNode
  /** Label of the confirm button (default "Đồng ý") */
  confirm?: string
  /** Label of the cancel button (default "Huỷ") */
  cancel?: string
  /** Red confirm button: deleting, leaving with unsaved work… */
  destructive?: boolean
}

/**
 * An in-app confirm dialog instead of `window.confirm()`:
 *
 *   const [confirm, dialog] = useConfirm()
 *   if (await confirm({ title: 'Xoá đề?', destructive: true })) …
 *   return <>{dialog}…</>
 *
 * `confirm` resolves true on the confirm button, false on cancel, Esc or a click outside.
 */
export function useConfirm() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolve = useRef<(ok: boolean) => void>(undefined)

  const confirm = useCallback(
    (next: ConfirmOptions) =>
      new Promise<boolean>((done) => {
        resolve.current?.(false) // a dialog already open counts as cancelled
        resolve.current = done
        setOptions(next)
      }),
    [],
  )

  const close = (ok: boolean) => {
    resolve.current?.(ok)
    resolve.current = undefined
    setOptions(null)
  }

  const dialog = (
    <AlertDialog
      open={options !== null}
      onOpenChange={(open) => {
        if (!open) close(false)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options?.title}</AlertDialogTitle>
          {options?.description && (
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{options?.cancel ?? 'Huỷ'}</AlertDialogCancel>
          <AlertDialogAction
            variant={options?.destructive ? 'destructive' : 'default'}
            onClick={() => close(true)}
          >
            {options?.confirm ?? 'Đồng ý'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return [confirm, dialog] as const
}
