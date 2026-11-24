export type Theme = 'light' | 'dark' | 'system'

/** localStorage key of the chosen theme (same as next-themes used: saved choices carry over). */
export const THEME_STORAGE_KEY = 'theme'

/**
 * Inline script for the document head: puts `dark` / `light` on <html> before the first paint, so a
 * dark page never flashes white. The root layout renders it with `InlineScript` (apps/web), so it
 * runs from the server HTML only.
 */
export function themeScript(defaultTheme: Theme = 'system'): string {
  const key = JSON.stringify(THEME_STORAGE_KEY)
  const fallback = JSON.stringify(defaultTheme)
  return `(function(){try{var t=localStorage.getItem(${key})||${fallback};var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(d?'dark':'light');e.style.colorScheme=d?'dark':'light'}catch(_){}})()`
}
