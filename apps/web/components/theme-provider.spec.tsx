import { fireEvent, render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ThemeProvider } from './theme-provider'

const isDark = () => document.documentElement.classList.contains('dark')

describe('ThemeProvider hotkey', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    // jsdom has no matchMedia; next-themes reads it for "system"
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
  })

  it('toggles dark mode with "d" and ignores keydown events without a key', async () => {
    render(<ThemeProvider defaultTheme="light" />)

    // Autofill / extensions dispatch a plain Event (no `key`); a throwing
    // listener does not throw from dispatchEvent, it reports an `error` event
    const errors: unknown[] = []
    const onError = (e: ErrorEvent) => {
      e.preventDefault()
      errors.push(e.error)
    }
    window.addEventListener('error', onError)
    window.dispatchEvent(new Event('keydown'))
    window.removeEventListener('error', onError)
    expect(errors).toEqual([])
    expect(isDark()).toBe(false)

    fireEvent.keyDown(window, { key: 'D' })
    await waitFor(() => expect(isDark()).toBe(true))
  })
})
