import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'

import type { User } from '@repo/types'
import { ModeToggle } from '@repo/ui/components/mode-toggle'
import { cn } from '@repo/ui/lib/utils'
import { AUTH_COOKIE } from '@repo/utils'

import { UserMenu } from '../components/user-menu'
import { apiFetch } from '../lib/api'
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

/** The signed-in user, or null (login page, expired session: proxy.ts redirects pages). */
async function currentUser(): Promise<User | null> {
  if (!(await cookies()).has(AUTH_COOKIE.Access)) return null
  return apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(() => null)
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()
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
          <header className="flex items-center justify-end gap-4 px-4 pt-4">
            {user && <UserMenu user={user} />}
            <ModeToggle />
          </header>
          {children}
          <EnvBadge />
        </Providers>
      </body>
    </html>
  )
}
