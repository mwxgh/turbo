import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { themeScript } from '@repo/ui/lib/theme-script'
import { cn } from '@repo/ui/lib/utils'

import { EnvBadge } from '@/components/env-badge'

import './globals.css'

import { Providers } from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: { default: 'Turbo Dev', template: '%s · Turbo Dev' },
  description: 'Build faster with Studio, keep learning with Lingo',
}

/**
 * Document shell only. Route groups add their chrome:
 *   (app)  – signed-in pages (proxy.ts redirects to /login), header with the user menu
 *   (auth) – public pages: /login
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'font-sans antialiased',
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <head>
        {/* Dark / light class before the first paint (server-rendered, runs at once) */}
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <EnvBadge />
        </Providers>
      </body>
    </html>
  )
}
