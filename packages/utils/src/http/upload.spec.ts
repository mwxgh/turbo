import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { formatBytes } from '../format/number.js'
import { UploadError, uploadFile } from './upload.js'

describe('formatBytes', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [55_296, '54 KB'],
    [1_258_291, '1.2 MB'],
    [50 * 1024 * 1024, '50 MB'],
    [3 * 1024 ** 3, '3 GB'],
  ])('%d → %s', (bytes, text) => {
    expect(formatBytes(bytes)).toBe(text)
  })
})

/** Just enough XMLHttpRequest for uploadFile; the test drives its events. */
class FakeXhr {
  static last: FakeXhr
  method = ''
  url = ''
  status = 0
  responseText = ''
  withCredentials = false
  headers: Record<string, string> = {}
  sent?: FormData
  upload: { onprogress?: (e: ProgressEvent) => void } = {}
  onload?: () => void
  onerror?: () => void
  onabort?: () => void
  constructor() {
    FakeXhr.last = this
  }
  open(method: string, url: string) {
    this.method = method
    this.url = url
  }
  setRequestHeader(name: string, value: string) {
    this.headers[name] = value
  }
  send(body: FormData) {
    this.sent = body
  }
  abort() {
    this.onabort?.()
  }
  respond(status: number, body: string) {
    this.status = status
    this.responseText = body
    this.onload?.()
  }
}

describe('uploadFile', () => {
  const file = new File(['hello'], 'cv.pdf', { type: 'application/pdf' })

  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', FakeXhr)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts multipart form data, reports progress and resolves with JSON', async () => {
    const onProgress = vi.fn()
    const done = uploadFile<{ id: string }>('/api/files', file, {
      onProgress,
      fields: { folder: 'cv' },
      headers: { 'x-request-id': '1' },
      withCredentials: true,
    })
    const xhr = FakeXhr.last
    expect(xhr.method).toBe('POST')
    expect(xhr.withCredentials).toBe(true)
    expect(xhr.headers).toEqual({ 'x-request-id': '1' })
    expect(xhr.sent?.get('file')).toBeInstanceOf(File)
    expect(xhr.sent?.get('folder')).toBe('cv')

    xhr.upload.onprogress?.({
      lengthComputable: true,
      loaded: 25,
      total: 100,
    } as ProgressEvent)
    expect(onProgress).toHaveBeenLastCalledWith(0.25)
    xhr.respond(201, '{"id":"f1"}')
    await expect(done).resolves.toEqual({ id: 'f1' })
  })

  it('rejects with the API message on an error status', async () => {
    const done = uploadFile('/api/files', file)
    FakeXhr.last.respond(413, '{"statusCode":413,"message":["File too large"]}')
    await expect(done).rejects.toEqual(
      expect.objectContaining({
        name: 'UploadError',
        status: 413,
        message: 'File too large',
      }),
    )
  })

  it('rejects on network errors and on abort', async () => {
    const offline = uploadFile('/api/files', file)
    FakeXhr.last.onerror?.()
    await expect(offline).rejects.toBeInstanceOf(UploadError)

    const controller = new AbortController()
    const aborted = uploadFile('/api/files', file, {
      signal: controller.signal,
    })
    controller.abort()
    await expect(aborted).rejects.toMatchObject({ name: 'AbortError' })
  })
})
