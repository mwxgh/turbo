import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ModeToggle } from '@repo/ui/components/mode-toggle'

describe('ModeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    // jsdom has no matchMedia; next-themes reads it for "system" (OS: dark)
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    )
  })

  const toggle = () =>
    userEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))

  it('switches light ↔ dark in one click and remembers it', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ModeToggle />
      </ThemeProvider>,
    )
    const html = document.documentElement

    await toggle()
    await waitFor(() => expect(html).toHaveClass('dark'))
    expect(localStorage.getItem('theme')).toBe('dark')

    await toggle()
    await waitFor(() => expect(html).toHaveClass('light'))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('starts from the OS theme when the choice is "system"', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModeToggle />
      </ThemeProvider>,
    )
    const html = document.documentElement
    await waitFor(() => expect(html).toHaveClass('dark')) // OS prefers dark

    await toggle()
    await waitFor(() => expect(html).toHaveClass('light'))
  })
})
