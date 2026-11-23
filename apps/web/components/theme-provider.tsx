'use client'

import * as React from 'react'

import {
  ThemeProvider as BaseThemeProvider,
  useTheme,
} from '@repo/ui/components/theme'

/** Theme (light / dark / system) + the "d" hotkey. First paint: `themeScript()` in the root layout. */
function ThemeProvider(props: React.ComponentProps<typeof BaseThemeProvider>) {
  return (
    <BaseThemeProvider {...props}>
      <ThemeHotkey />
      {props.children}
    </BaseThemeProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      // No `.toLowerCase()`: autofill and extensions fire keydown without `key`
      if (event.key !== 'd' && event.key !== 'D') {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
