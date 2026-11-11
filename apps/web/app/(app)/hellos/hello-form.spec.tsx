import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { HelloForm, validateMessage } from './hello-form'

describe('validateMessage', () => {
  it.each([
    ['', 'Message is required'],
    ['   ', 'Message is required'],
    ['x'.repeat(256), 'Message must be at most 255 characters'],
    ['  ok  ', undefined],
  ])('%j → %s', (value, error) => {
    expect(validateMessage(value)).toBe(error)
  })
})

describe('HelloForm', () => {
  const setup = (props: Partial<Parameters<typeof HelloForm>[0]> = {}) => {
    const action = vi.fn().mockResolvedValue({})
    render(
      <HelloForm
        action={action}
        submitLabel="Add"
        inputLabel="New hello"
        placeholder="New hello…"
        {...props}
      />,
    )
    return { action, input: screen.getByLabelText('New hello') }
  }

  it('submits the trimmed message and resets after creating', async () => {
    const onSuccess = vi.fn()
    const { action, input } = setup({ onSuccess })

    await userEvent.type(input, '  Hi there  ')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(action).toHaveBeenCalledWith({ message: 'Hi there' })
    expect(onSuccess).toHaveBeenCalledOnce()
    expect(input).toHaveValue('')
  })

  it('validates on the client before calling the API', async () => {
    const { action, input } = setup()

    await userEvent.type(input, '   ')
    expect(await screen.findByText('Message is required')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(action).not.toHaveBeenCalled()
  })

  it('shows errors returned by the API and keeps the value', async () => {
    const { input } = setup({
      action: vi.fn().mockResolvedValue({ errors: ['Record already exists'] }),
    })

    await userEvent.type(input, 'dup')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Record already exists',
    )
    expect(input).toHaveValue('dup')
  })

  it('edits an existing message and supports cancel', async () => {
    const onCancel = vi.fn()
    const onSuccess = vi.fn()
    const action = vi.fn().mockResolvedValue({})
    render(
      <HelloForm
        action={action}
        defaultMessage="Old"
        submitLabel="Save"
        inputLabel="Edit message"
        onCancel={onCancel}
        onSuccess={onSuccess}
      />,
    )
    const input = screen.getByLabelText('Edit message')
    expect(input).toHaveValue('Old')

    await userEvent.clear(input)
    await userEvent.type(input, 'New')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(action).toHaveBeenCalledWith({ message: 'New' })
    expect(onSuccess).toHaveBeenCalledOnce()

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})
