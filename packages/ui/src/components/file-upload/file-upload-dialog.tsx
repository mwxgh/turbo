'use client'

import { type ReactElement, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog'
import {
  FileUpload,
  type FileUploadItem,
  type FileUploadProps,
} from '@repo/ui/components/file-upload/file-upload'

/** A file that reached storage: the picked `File` and what `upload` returned. */
export interface UploadedFile<T = unknown> {
  file: File
  result: T
}

export interface FileUploadDialogProps<T = unknown> extends FileUploadProps<T> {
  /** Element that opens the dialog, e.g. `<Button>Upload</Button>`. */
  trigger: ReactElement
  title?: string
  description?: string
  /**
   * Footer button with the completed files (e.g. attach their keys to a
   * record). The dialog closes when it resolves and stays open if it throws
   * (show the error yourself, e.g. a toast).
   * Without it the dialog has no footer.
   */
  onConfirm?: (files: UploadedFile<T>[]) => void | Promise<void>
  confirmLabel?: string
}

/**
 * `FileUpload` in a shadcn Dialog. Files upload as soon as they are picked;
 * closing without confirming removes the completed ones (`onRemove`) so
 * nothing is left behind in storage, and cancels uploads still running.
 */
export function FileUploadDialog<T = unknown>({
  trigger,
  title = 'Upload files',
  description,
  onConfirm,
  confirmLabel = 'Confirm',
  ...props
}: FileUploadDialogProps<T>) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<FileUploadItem<T>[]>([])
  const [confirming, setConfirming] = useState(false)
  const done = items.filter((item) => item.status === 'done')
  const uploading = items.some((item) => item.status === 'uploading')

  const close = (confirmed: boolean) => {
    if (!confirmed && onConfirm && props.onRemove) {
      for (const item of done)
        void Promise.resolve(props.onRemove(item.result as T, item.file)).catch(
          () => undefined,
        ) // best effort: the dialog is closing anyway
    }
    setItems([])
    setOpen(false)
  }

  const confirm = async () => {
    setConfirming(true)
    try {
      await onConfirm?.(
        done.map((item) => ({ file: item.file, result: item.result as T })),
      )
      close(true)
    } catch {
      // Stay open so the user can retry; onConfirm reports its own error (toast)
    } finally {
      setConfirming(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close(false))}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FileUpload {...props} onItemsChange={setItems} />
        {onConfirm && (
          <DialogFooter>
            <Button variant="outline" onClick={() => close(false)}>
              Cancel
            </Button>
            <Button
              disabled={!done.length || uploading || confirming}
              onClick={() => void confirm()}
            >
              {confirming && <Loader2 className="animate-spin" />}
              {confirmLabel} ({done.length})
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
