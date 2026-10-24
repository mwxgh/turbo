import { beforeEach, describe, expect, it, vi } from 'vitest'

import { withToast } from './action-toast'

const { toast } = vi.hoisted(() => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))
vi.mock('@repo/ui/components/sonner', () => ({ toast }))

const messages = { success: 'Saved', error: 'Could not save' }

describe('withToast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('toasts success and returns the result', async () => {
    await expect(withToast(Promise.resolve({}), messages)).resolves.toEqual({})
    expect(toast.success).toHaveBeenCalledWith('Saved')
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('toasts API errors and still returns them for the form', async () => {
    const res = { errors: ['message is required', 'too long'] }
    await expect(withToast(Promise.resolve(res), messages)).resolves.toBe(res)
    expect(toast.error).toHaveBeenCalledWith('Could not save', {
      description: 'message is required · too long',
    })
  })

  it('turns a request that failed into an error, not a rejection', async () => {
    await expect(
      withToast(Promise.reject(new Error('fetch failed')), messages),
    ).resolves.toEqual({ errors: ['Could not reach the server'] })
    expect(toast.error).toHaveBeenCalledWith('Could not save', {
      description: 'Could not reach the server',
    })
  })
})
