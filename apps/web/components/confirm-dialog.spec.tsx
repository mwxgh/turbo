import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { type ConfirmOptions, useConfirm } from './confirm-dialog'

function Harness({
  options,
  onResult,
}: {
  options: ConfirmOptions
  onResult: (ok: boolean) => void
}) {
  const [confirm, dialog] = useConfirm()
  return (
    <>
      <button onClick={() => void confirm(options).then(onResult)}>Mở</button>
      {dialog}
    </>
  )
}

const options: ConfirmOptions = {
  title: 'Xoá đề “Đề 01”?',
  description: 'Câu hỏi vẫn được giữ.',
  confirm: 'Xoá đề',
  destructive: true,
}

describe('useConfirm', () => {
  it('resolves true on the confirm button', async () => {
    const user = userEvent.setup()
    const onResult = vi.fn()
    render(<Harness options={options} onResult={onResult} />)
    await user.click(screen.getByRole('button', { name: 'Mở' }))

    const dialog = await screen.findByRole('alertdialog', {
      name: 'Xoá đề “Đề 01”?',
    })
    expect(dialog).toHaveTextContent('Câu hỏi vẫn được giữ.')
    await user.click(screen.getByRole('button', { name: 'Xoá đề' }))
    await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith(true))
  })

  it('resolves false on cancel and on Escape', async () => {
    const user = userEvent.setup()
    const onResult = vi.fn()
    render(<Harness options={options} onResult={onResult} />)

    await user.click(screen.getByRole('button', { name: 'Mở' }))
    await user.click(await screen.findByRole('button', { name: 'Huỷ' }))
    await vi.waitFor(() => expect(onResult).toHaveBeenLastCalledWith(false))

    await user.click(screen.getByRole('button', { name: 'Mở' }))
    await screen.findByRole('alertdialog')
    await user.keyboard('{Escape}')
    await vi.waitFor(() => expect(onResult).toHaveBeenCalledTimes(2))
    expect(onResult).toHaveBeenLastCalledWith(false)
  })
})
