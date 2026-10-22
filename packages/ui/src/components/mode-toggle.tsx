'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { IconButton } from '@repo/ui/components/icon-button'

/**
 * One click switches light ↔ dark (from whatever is shown now, including the
 * OS theme). Needs next-themes' ThemeProvider above it. The icon swaps through
 * the `dark:` variant, so the server render never depends on the theme.
 */
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <IconButton
      label="Toggle theme"
      variant="ghost"
      className="relative"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun
        className="scale-100 rotate-0 transition-all dark:scale-0
          dark:-rotate-90"
      />
      <Moon
        className="absolute scale-0 rotate-90 transition-all dark:scale-100
          dark:rotate-0"
      />
    </IconButton>
  )
}
