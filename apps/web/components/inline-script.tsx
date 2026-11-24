'use client'

/**
 * An inline script that runs while the browser parses the server HTML (before the first paint).
 * React never runs scripts it renders on the client and warns about them, so the client render
 * marks it `text/plain`; `suppressHydrationWarning` accepts the type mismatch. See Next's guide
 * "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
