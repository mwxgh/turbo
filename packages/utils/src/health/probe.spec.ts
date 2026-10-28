import { describe, expect, it, vi } from 'vitest'

import { probe } from './probe.js'

describe('probe', () => {
  it('is up when the check resolves in time', async () => {
    expect(await probe(() => Promise.resolve('PONG'), 100)).toBe('up')
  })

  it('is down and reports the error when the check fails', async () => {
    const onError = vi.fn()
    const error = new Error('refused')
    expect(await probe(() => Promise.reject(error), 100, onError)).toBe('down')
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('is down when the check takes longer than the timeout', async () => {
    const onError = vi.fn()
    const never = () => new Promise(() => {})
    expect(await probe(never, 10, onError)).toBe('down')
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'timed out after 10ms' }),
    )
  })
})
