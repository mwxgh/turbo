import type { PresignedUpload } from '@repo/types'
import type { UploadFn } from '@repo/ui/components/file-upload'
import { uploadFile } from '@repo/utils'

import { apiFetch } from './api'

/**
 * Upload to S3 through a presigned POST from the API: the file goes straight
 * from the browser to storage (progress included); resolves with its key.
 */
export const uploadToStorage: UploadFn<{ key: string }> = async (
  file,
  { onProgress, signal },
) => {
  const { url, fields, key } = await apiFetch<PresignedUpload>(
    '/files/uploads',
    {
      method: 'POST',
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        size: file.size,
      }),
      signal,
    },
  )
  await uploadFile(url, file, { fields, onProgress, signal })
  return { key }
}

export const deleteFromStorage = (key: string) =>
  apiFetch<void>(`/files?key=${encodeURIComponent(key)}`, { method: 'DELETE' })
