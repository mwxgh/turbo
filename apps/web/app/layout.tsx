import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ModeToggle } from '@repo/ui/components/mode-toggle'
import { cn } from '@repo/ui/lib/utils'

import { EnvBadge } from './env-badge'

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
  title: 'Web',
  description: 'Turborepo base web app',
}

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
      <body suppressHydrationWarning>
        <Providers>
          <header className="flex justify-end px-4 pt-4">
            <ModeToggle />
          </header>
          {children}
          <EnvBadge />
        </Providers>
      </body>
    </html>
  )
}
