'use client'

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react'

import { THEME_STORAGE_KEY, type Theme } from '@repo/ui/lib/theme-script'

export type { Theme } from '@repo/ui/lib/theme-script'

interface ThemeContextValue {
  /** What the user chose (`system` follows the OS) */
  theme: Theme
  /** What is shown */
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const DARK_QUERY = '(prefers-color-scheme: dark)'
const themeListeners = new Set<() => void>()
// This page's choice when storage is blocked (private window, blocked site data)
let pageTheme: Theme | null = null

const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system'

function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(saved) ? saved : null
  } catch {
    return pageTheme // storage blocked
  }
}

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener)
  // Another tab changed it
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    themeListeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function subscribeSystem(listener: () => void) {
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}

const systemIsDark = () => window.matchMedia(DARK_QUERY).matches

/** Stops CSS transitions for one frame so the whole page switches at once. */
function withoutTransitions(apply: () => void) {
  const style = document.createElement('style')
  style.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.appendChild(style)
  apply()
  // Force a style recalc before the transitions come back
  void window.getComputedStyle(document.body).opacity
  setTimeout(() => style.remove(), 1)
}

/**
 * Light / dark / system theme on <html> (class + color-scheme), remembered in localStorage.
 * Renders no <script>: the first paint is handled by `themeScript()` in the root layout.
 */
export function ThemeProvider({
  defaultTheme = 'system',
  children,
}: {
  defaultTheme?: Theme
  children?: ReactNode
}) {
  const stored = useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    () => null,
  )
  const dark = useSyncExternalStore(subscribeSystem, systemIsDark, () => false)
  const theme = stored ?? defaultTheme
  const resolvedTheme = theme === 'system' ? (dark ? 'dark' : 'light') : theme

  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains(resolvedTheme)) return
    withoutTransitions(() => {
      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)
      root.style.colorScheme = resolvedTheme
    })
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    pageTheme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // not remembered: storage blocked
    }
    themeListeners.forEach((listener) => listener())
  }, [])

  return (
    <ThemeContext value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext>
  )
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme needs a <ThemeProvider> above it')
  return value
}
