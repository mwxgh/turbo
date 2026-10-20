import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { cn } from '@repo/ui/lib/utils'

import { EnvBadge } from './env-badge'

import './globals.css'

import { Providers } from './providers'

// Variables consumed by the theme in @repo/tailwind-config (font-sans / font-mono)
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Web',
  description: 'Turborepo base web app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // next-themes sets the `dark` class before hydration
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'font-sans antialiased',
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body>
        <Providers>
          {children}
          <EnvBadge />
        </Providers>
      </body>
    </html>
  )
}
