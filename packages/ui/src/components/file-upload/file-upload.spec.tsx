import { act, render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@repo/ui/components/button'
import {
  FileUpload,
  FileUploadDialog,
  type UploadFn,
} from '@repo/ui/components/file-upload'

/** An upload the test finishes by hand. */
function fakeUpload() {
  const calls: {
    file: File
    signal: AbortSignal
    onProgress: (fraction: number) => void
    resolve: (result: { id: string }) => void
    reject: (error: Error) => void
  }[] = []
  const upload = vi.fn<UploadFn<{ id: string }>>(
    (file, { onProgress, signal }) =>
      new Promise((resolve, reject) =>
        calls.push({ file, signal, onProgress, resolve, reject }),
      ),
  )
  return { upload, calls }
}

/** Run fn, then let the promise callbacks it triggered update the UI. */
const settle = (fn: () => void) =>
  act(async () => {
    fn()
    await Promise.resolve()
  })

const pdf = (name = 'my-cv.pdf', size = 120 * 1024) =>
  new File([new Uint8Array(size)], name, { type: 'application/pdf' })
const pick = (...files: File[]) =>
  userEvent.upload(screen.getByLabelText('Upload files'), files, {
    applyAccept: false, // let the dropzone reject, like a real drop
  })

describe('FileUpload', () => {
  it('uploads with progress until completed', async () => {
    const { upload, calls } = fakeUpload()
    const onUploaded = vi.fn()
    render(
      <FileUpload
        upload={upload}
        accept={{ 'application/pdf': ['.pdf'], 'image/png': ['.png'] }}
        maxSize={50 * 1024 * 1024}
        onUploaded={onUploaded}
      />,
    )
    expect(screen.getByText('PDF, PNG formats, up to 50 MB.')).toBeVisible()

    await pick(pdf())
    const item = screen.getByRole('listitem', { name: 'my-cv.pdf' })
    expect(within(item).getByText('Uploading…')).toBeVisible()

    act(() => calls[0]!.onProgress(0.45))
    expect(within(item).getByText(/54 KB of 120 KB/)).toBeVisible()
    expect(within(item).getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '45',
    )

    await settle(() => calls[0]!.resolve({ id: 'f1' }))
    expect(within(item).getByText('Completed')).toBeVisible()
    expect(within(item).getByText(/120 KB of 120 KB/)).toBeVisible()
    expect(onUploaded).toHaveBeenCalledWith({ id: 'f1' }, expect.any(File))
  })

  it('cancels a running upload', async () => {
    const { upload, calls } = fakeUpload()
    render(<FileUpload upload={upload} />)
    await pick(pdf())

    await userEvent.click(
      screen.getByRole('button', { name: 'Cancel my-cv.pdf' }),
    )
    expect(calls[0]!.signal.aborted).toBe(true)
    expect(screen.queryByRole('listitem')).toBeNull()
  })

  it('shows the error of a failed upload and retries it', async () => {
    const { upload, calls } = fakeUpload()
    render(<FileUpload upload={upload} />)
    await pick(pdf())

    await settle(() => calls[0]!.reject(new Error('Server is down')))
    expect(screen.getByRole('alert')).toHaveTextContent('Server is down')

    await userEvent.click(
      screen.getByRole('button', { name: 'Retry my-cv.pdf' }),
    )
    expect(upload).toHaveBeenCalledTimes(2)
    await settle(() => calls[1]!.resolve({ id: 'f1' }))
    expect(screen.getByText('Completed')).toBeVisible()
  })

  it('rejects files outside accept / maxSize without uploading them', async () => {
    const { upload } = fakeUpload()
    render(
      <FileUpload
        upload={upload}
        accept={{ 'application/pdf': ['.pdf'] }}
        maxSize={100 * 1024}
      />,
    )
    await pick(
      pdf('big.pdf', 200 * 1024),
      new File(['x'], 'notes.txt', { type: 'text/plain' }),
    )

    expect(
      within(screen.getByRole('listitem', { name: 'big.pdf' })).getByRole(
        'alert',
      ),
    ).toHaveTextContent('Larger than 100 KB')
    expect(
      within(screen.getByRole('listitem', { name: 'notes.txt' })).getByRole(
        'alert',
      ),
    ).toHaveTextContent('File type not allowed')
    expect(upload).not.toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /Retry/ })).toBeNull()
  })

  it('removes a completed file through onRemove', async () => {
    const { upload, calls } = fakeUpload()
    const onRemove = vi.fn()
    render(<FileUpload upload={upload} onRemove={onRemove} />)
    await pick(pdf())
    await settle(() => calls[0]!.resolve({ id: 'f1' }))

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove my-cv.pdf' }),
    )
    expect(onRemove).toHaveBeenCalledWith({ id: 'f1' }, expect.any(File))
    expect(screen.queryByRole('listitem')).toBeNull()
  })

  it('keeps the file listed when onRemove fails', async () => {
    const { upload, calls } = fakeUpload()
    const onRemove = vi.fn(() => Promise.reject(new Error('storage down')))
    render(<FileUpload upload={upload} onRemove={onRemove} />)
    await pick(pdf())
    await settle(() => calls[0]!.resolve({ id: 'f1' }))

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove my-cv.pdf' }),
    )
    expect(onRemove).toHaveBeenCalled()
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })
})

describe('FileUploadDialog', () => {
  const open = async (
    props: Partial<Parameters<typeof FileUploadDialog>[0]>,
  ) => {
    const { upload, calls } = fakeUpload()
    render(
      <FileUploadDialog
        trigger={<Button>Upload</Button>}
        title="Upload documents"
        upload={upload}
        {...props}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Upload' }))
    const dialog = await screen.findByRole('dialog', {
      name: 'Upload documents',
    })
    return { dialog, calls }
  }

  it('opens from its trigger, without a footer by default', async () => {
    const { dialog } = await open({})
    expect(
      within(dialog).getByRole('button', { name: 'Browse File' }),
    ).toBeVisible()
    expect(within(dialog).queryByRole('button', { name: /Confirm/ })).toBeNull()
  })

  it('confirms with the completed files once nothing is uploading', async () => {
    const onConfirm = vi.fn()
    const { dialog, calls } = await open({ onConfirm })
    const confirm = () =>
      within(dialog).getByRole('button', { name: /Confirm/ })
    expect(confirm()).toHaveTextContent('Confirm (0)')
    expect(confirm()).toBeDisabled()

    await pick(pdf('a.pdf'), pdf('b.pdf'))
    await settle(() => calls[0]!.resolve({ id: 'f1' }))
    expect(confirm()).toHaveTextContent('Confirm (1)')
    expect(confirm()).toBeDisabled() // b.pdf still uploading

    await settle(() => calls[1]!.resolve({ id: 'f2' }))
    await userEvent.click(confirm())
    expect(onConfirm).toHaveBeenCalledWith([
      {
        file: expect.objectContaining({ name: 'a.pdf' }),
        result: { id: 'f1' },
      },
      {
        file: expect.objectContaining({ name: 'b.pdf' }),
        result: { id: 'f2' },
      },
    ])
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('cancel removes what was uploaded, so storage keeps no orphans', async () => {
    const onRemove = vi.fn()
    const { dialog, calls } = await open({ onConfirm: vi.fn(), onRemove })
    await pick(pdf('a.pdf'))
    await settle(() => calls[0]!.resolve({ id: 'f1' }))

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Cancel' }),
    )
    expect(onRemove).toHaveBeenCalledWith({ id: 'f1' }, expect.any(File))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('still reports items to the consumer', async () => {
    const onItemsChange = vi.fn()
    const { calls } = await open({ onItemsChange })
    await pick(pdf('a.pdf'))
    await settle(() => calls[0]!.resolve({ id: 'f1' }))
    expect(onItemsChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ status: 'done', result: { id: 'f1' } }),
    ])
  })

  it('stays open when onConfirm fails', async () => {
    const onConfirm = vi.fn(() => Promise.reject(new Error('save failed')))
    const { dialog, calls } = await open({ onConfirm })
    await pick(pdf('a.pdf'))
    await settle(() => calls[0]!.resolve({ id: 'f1' }))

    await userEvent.click(
      within(dialog).getByRole('button', { name: /Confirm/ }),
    )
    expect(onConfirm).toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeVisible()
  })
})
