import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError } from '../../lib/api'
import { createHello, deleteHello, updateHello } from './actions'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../../lib/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../lib/api')>()),
  apiFetch,
}))

describe('hello server actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a hello', async () => {
    apiFetch.mockResolvedValue({ id: '1' })

    await expect(createHello({ message: 'Hi' })).resolves.toEqual({})
    expect(apiFetch).toHaveBeenCalledWith('/hellos', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hi' }),
    })
  })

  it('returns API validation messages as form errors', async () => {
    apiFetch.mockRejectedValue(
      new ApiError(400, {
        statusCode: 400,
        message: ['message should not be empty'],
      }),
    )

    await expect(createHello({ message: '' })).resolves.toEqual({
      errors: ['message should not be empty'],
    })
  })

  it('wraps a single error message and falls back to the status text', async () => {
    apiFetch.mockRejectedValueOnce(
      new ApiError(404, { message: 'Record not found' }),
    )
    await expect(updateHello('1', { message: 'x' })).resolves.toEqual({
      errors: ['Record not found'],
    })

    apiFetch.mockRejectedValueOnce(new ApiError(502, null))
    await expect(updateHello('1', { message: 'x' })).resolves.toEqual({
      errors: ['API request failed with status 502'],
    })
  })

  it('rethrows unexpected errors', async () => {
    apiFetch.mockRejectedValue(new TypeError('network down'))
    await expect(createHello({ message: 'Hi' })).rejects.toThrow('network down')
  })

  it('updates and deletes by id', async () => {
    apiFetch.mockResolvedValue(null)

    await updateHello('abc', { message: 'New' })
    expect(apiFetch).toHaveBeenCalledWith('/hellos/abc', {
      method: 'PATCH',
      body: JSON.stringify({ message: 'New' }),
    })

    await deleteHello('abc')
    expect(apiFetch).toHaveBeenLastCalledWith('/hellos/abc', {
      method: 'DELETE',
    })
  })
})
