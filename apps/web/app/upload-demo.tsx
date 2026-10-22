'use client'

import { useState } from 'react'

import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import {
  FileUploadDialog,
  type UploadedFile,
} from '@repo/ui/components/file-upload'
import { toast } from '@repo/ui/components/sonner'
import { formatBytes } from '@repo/utils'

import { deleteFromStorage, uploadToStorage } from '../lib/storage'

const MAX_BYTES = 50 * 1024 * 1024 // = MAX_UPLOAD_BYTES of the API

/**
 * Upload to S3 (presigned POST from the API); removing a file deletes it there.
 * Confirm hands the uploaded files (name, size, storage key) to the next step –
 * here they are just listed.
 */
export function UploadDemo() {
  const [attached, setAttached] = useState<UploadedFile<{ key: string }>[]>([])

  return (
    <Card>
      <CardHeader>
        <CardTitle>File upload</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <FileUploadDialog
          trigger={
            <Button variant="outline" className="self-start">
              Upload files
            </Button>
          }
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'application/pdf': ['.pdf'],
            'video/mp4': ['.mp4'],
          }}
          maxSize={MAX_BYTES}
          upload={uploadToStorage}
          onUploaded={(_, file) => toast.success(`Uploaded ${file.name}`)}
          onRemove={async ({ key }, file) => {
            await deleteFromStorage(key)
            toast.success(`Deleted ${file.name}`)
          }}
          onConfirm={(files) => {
            setAttached((all) => [...all, ...files])
            toast.success(`Attached ${files.length} file(s)`)
          }}
        />
        {attached.length > 0 && (
          <ul
            aria-label="Attached files"
            className="flex flex-col gap-1 text-sm"
          >
            {attached.map(({ file, result }) => (
              <li key={result.key} className="flex flex-wrap gap-x-2">
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground">
                  {formatBytes(file.size)} · <code>{result.key}</code>
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
