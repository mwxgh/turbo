'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'

import { cn } from 'cn'
import {
  CircleAlert,
  CircleCheck,
  CloudUpload,
  File as FileIcon,
  Loader2,
  RotateCw,
  Trash2,
  X,
} from 'lucide-react'
import {
  type Accept,
  ErrorCode,
  type FileRejection,
  useDropzone,
} from 'react-dropzone'

import { Button } from '@repo/ui/components/button'
import { Progress } from '@repo/ui/components/progress'
import { formatBytes } from '@repo/utils'

/** Sends one file; report progress (0 → 1) and stop when `signal` aborts. */
export type UploadFn<T = unknown> = (
  file: File,
  options: { onProgress: (fraction: number) => void; signal: AbortSignal },
) => Promise<T>

export interface FileUploadProps<T = unknown> {
  /** e.g. `(file, opts) => uploadFile('/api/files', file, opts)` from @repo/utils. */
  upload: UploadFn<T>
  /** react-dropzone format: `{ 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg'] }`. */
  accept?: Accept
  /** Bytes. */
  maxSize?: number
  /** Files per drop. Default 10. */
  maxFiles?: number
  /** Text under the title; default lists `accept` extensions and `maxSize`. */
  hint?: string
  onUploaded?: (result: T, file: File) => void
  /** Called before a completed file leaves the list (e.g. delete it on the server). */
  onRemove?: (result: T, file: File) => void | Promise<void>
  /** Every change of the list (status, progress, results). */
  onItemsChange?: (items: FileUploadItem<T>[]) => void
  className?: string
}

export interface FileUploadItem<T = unknown> {
  id: string
  file: File
  status: 'uploading' | 'done' | 'error'
  progress: number
  error?: string
  result?: T
  /** Rejected by accept / maxSize / maxFiles: never uploaded, cannot be retried. */
  rejected?: boolean
}

const extensionOf = (name: string) =>
  name.includes('.') ? (name.split('.').pop() ?? '').toUpperCase() : ''

function defaultHint(accept?: Accept, maxSize?: number) {
  const extensions = [
    ...new Set(
      Object.values(accept ?? {})
        .flat()
        .map((ext) => ext.replace(/^\./, '').toUpperCase()),
    ),
  ]
  const types = extensions.length
    ? `${extensions.join(', ')} formats`
    : 'Any file'
  return maxSize ? `${types}, up to ${formatBytes(maxSize)}.` : `${types}.`
}

function rejectionMessage(rejection: FileRejection, maxSize?: number): string {
  const error = rejection.errors[0]
  switch (error?.code) {
    case ErrorCode.FileTooLarge:
      return `Larger than ${formatBytes(maxSize ?? 0)}`
    case ErrorCode.FileInvalidType:
      return 'File type not allowed'
    case ErrorCode.TooManyFiles:
      return 'Too many files'
    default:
      return error?.message ?? 'File rejected'
  }
}

/** Badge color by kind, like the PDF icon in most upload UIs. */
function FileBadge({ file }: { file: File }) {
  const ext = extensionOf(file.name)
  const color = file.type.startsWith('image/')
    ? 'bg-blue-500'
    : file.type.startsWith('video/')
      ? 'bg-purple-500'
      : ext === 'PDF'
        ? 'bg-red-500'
        : 'bg-muted-foreground'
  return (
    <div className="relative shrink-0" aria-hidden>
      <FileIcon
        className="size-10 text-muted-foreground/60"
        strokeWidth={1.25}
      />
      {ext && (
        <span
          className={cn(
            `absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-sm px-1
            text-[9px] leading-3.5 font-bold text-white`,
            color,
          )}
        >
          {ext.slice(0, 4)}
        </span>
      )}
    </div>
  )
}

/**
 * Drop zone + list of files uploading through `upload` (progress, cancel,
 * retry, remove). Built on shadcn Button / Progress and react-dropzone.
 */
export function FileUpload<T = unknown>({
  upload,
  accept,
  maxSize,
  maxFiles = 10,
  hint,
  onUploaded,
  onRemove,
  onItemsChange,
  className,
}: FileUploadProps<T>) {
  const [items, setItems] = useState<FileUploadItem<T>[]>([])
  const notify = useEffectEvent((all: FileUploadItem<T>[]) =>
    onItemsChange?.(all),
  )
  useEffect(() => notify(items), [items])
  const patch = (id: string, change: Partial<FileUploadItem<T>>) =>
    setItems((all) => all.map((i) => (i.id === id ? { ...i, ...change } : i)))

  // Running uploads by item id; leaving (e.g. closing the dialog) stops them
  const controllers = useRef(new Map<string, AbortController>())
  useEffect(() => {
    const running = controllers.current
    return () => running.forEach((controller) => controller.abort())
  }, [])

  const start = (id: string, file: File) => {
    const controller = new AbortController()
    controllers.current.set(id, controller)
    patch(id, { status: 'uploading', progress: 0, error: undefined })
    upload(file, {
      signal: controller.signal,
      onProgress: (fraction) => patch(id, { progress: fraction }),
    })
      .then(
        (result) => {
          patch(id, { status: 'done', progress: 1, result })
          onUploaded?.(result, file)
        },
        (error: unknown) => {
          if (controller.signal.aborted) return // cancelled: already removed
          patch(id, {
            status: 'error',
            error: error instanceof Error ? error.message : 'Upload failed',
          })
        },
      )
      .finally(() => controllers.current.delete(id))
  }

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    noClick: true, // the Browse button opens the picker
    onDrop: (accepted, rejections) => {
      const added: FileUploadItem<T>[] = [
        ...accepted.map((file) => ({
          id: crypto.randomUUID(),
          file,
          status: 'uploading' as const,
          progress: 0,
        })),
        ...rejections.map((rejection) => ({
          id: crypto.randomUUID(),
          file: rejection.file,
          status: 'error' as const,
          progress: 0,
          rejected: true,
          error: rejectionMessage(rejection, maxSize),
        })),
      ]
      setItems((all) => [...added, ...all])
      added.forEach((item) => !item.rejected && start(item.id, item.file))
    },
  })

  const remove = async (item: FileUploadItem<T>) => {
    controllers.current.get(item.id)?.abort()
    if (item.status === 'done' && onRemove)
      await onRemove(item.result as T, item.file)
    setItems((all) => all.filter((i) => i.id !== item.id))
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        {...getRootProps()}
        className={cn(
          `flex flex-col items-center gap-1 rounded-xl border-2 border-dashed
          px-6 py-8 text-center transition-colors`,
          isDragActive && 'border-primary bg-primary/5',
        )}
      >
        <input {...getInputProps({ 'aria-label': 'Upload files' })} />
        <span
          className="mb-2 flex size-11 items-center justify-center rounded-full
            border-2 border-dashed text-muted-foreground"
        >
          <CloudUpload className="size-5" />
        </span>
        <p className="font-medium">
          {isDragActive
            ? 'Drop the files here'
            : 'Choose a file or drag & drop it here'}
        </p>
        <p className="text-sm text-muted-foreground">
          {hint ?? defaultHint(accept, maxSize)}
        </p>
        <Button variant="outline" className="mt-3" onClick={open}>
          Browse File
        </Button>
      </div>

      {items.length > 0 && (
        <ul aria-label="Files" className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              aria-label={item.file.name}
              className="flex items-center gap-3 rounded-xl border bg-muted/30
                p-3"
            >
              <FileBadge file={item.file} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate text-sm font-medium">{item.file.name}</p>
                <p
                  className="flex items-center gap-1.5 text-xs
                    text-muted-foreground"
                >
                  {item.status !== 'error' && (
                    <span>
                      {formatBytes(item.file.size * item.progress)} of{' '}
                      {formatBytes(item.file.size)} ·
                    </span>
                  )}
                  {item.status === 'uploading' && (
                    <>
                      <Loader2 className="size-3.5 animate-spin text-primary" />
                      Uploading…
                    </>
                  )}
                  {item.status === 'done' && (
                    <span
                      className="flex items-center gap-1 text-green-600
                        dark:text-green-400"
                    >
                      <CircleCheck className="size-3.5" /> Completed
                    </span>
                  )}
                  {item.status === 'error' && (
                    <span
                      role="alert"
                      className="flex items-center gap-1 text-destructive"
                    >
                      <CircleAlert className="size-3.5" /> {item.error}
                    </span>
                  )}
                </p>
                {item.status === 'uploading' && (
                  <Progress
                    value={Math.round(item.progress * 100)}
                    aria-label={`${item.file.name} upload progress`}
                  />
                )}
              </div>
              {item.status === 'error' && !item.rejected && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Retry ${item.file.name}`}
                  onClick={() => start(item.id, item.file)}
                >
                  <RotateCw />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`${item.status === 'uploading' ? 'Cancel' : 'Remove'} ${item.file.name}`}
                onClick={() => void remove(item)}
              >
                {item.status === 'done' ? <Trash2 /> : <X />}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
