import { messageOf } from './api-fetch.js'

/** Largest file a presigned upload accepts (api policy, client pickers). */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024

/** Upload refused by the server: `status` 0 means it never answered (network). */
export class UploadError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
    message?: string,
  ) {
    super(message ?? messageOf(body) ?? `Upload failed (${status})`)
    this.name = 'UploadError'
  }
}

export interface UploadOptions {
  /** 0 → 1 while the request body is sent. */
  onProgress?: (fraction: number) => void
  /** Aborting rejects with a DOMException named `AbortError`. */
  signal?: AbortSignal
  /** Form field of the file. Default `file`. */
  field?: string
  /** Extra form fields sent with the file. */
  fields?: Record<string, string>
  method?: 'POST' | 'PUT'
  headers?: Record<string, string>
  /** Send cookies cross-origin (the API's CORS allows credentials). */
  withCredentials?: boolean
}

/**
 * multipart/form-data upload with progress (fetch cannot report upload
 * progress, XMLHttpRequest can). Resolves with the parsed JSON response.
 */
export function uploadFile<T = unknown>(
  url: string,
  file: File,
  options: UploadOptions = {},
): Promise<T> {
  const {
    onProgress,
    signal,
    field = 'file',
    fields = {},
    headers = {},
  } = options
  return new Promise<T>((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException('Upload aborted', 'AbortError'))

    const xhr = new XMLHttpRequest()
    xhr.open(options.method ?? 'POST', url)
    xhr.withCredentials = options.withCredentials ?? false
    for (const [name, value] of Object.entries(headers))
      xhr.setRequestHeader(name, value)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total)
    }
    xhr.onload = () => {
      let body: unknown
      try {
        body = xhr.responseText ? JSON.parse(xhr.responseText) : null
      } catch {
        body = xhr.responseText
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(body as T)
      else reject(new UploadError(xhr.status, body))
    }
    xhr.onerror = () => reject(new UploadError(0, null, 'Network error'))
    xhr.onabort = () => reject(new DOMException('Upload aborted', 'AbortError'))
    signal?.addEventListener('abort', () => xhr.abort(), { once: true })

    const body = new FormData()
    for (const [name, value] of Object.entries(fields)) body.append(name, value)
    body.append(field, file)
    xhr.send(body)
  })
}
