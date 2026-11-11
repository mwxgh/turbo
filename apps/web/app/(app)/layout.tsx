import { cookies } from 'next/headers'

import type { User } from '@repo/types'
import { ModeToggle } from '@repo/ui/components/mode-toggle'
import { AUTH_COOKIE } from '@repo/utils'

import { UserMenu } from '@/components/user-menu'
import { apiFetch } from '@/lib/api'

/** The signed-in user, or null (expired session: proxy.ts redirects pages). */
async function currentUser(): Promise<User | null> {
  if (!(await cookies()).has(AUTH_COOKIE.Access)) return null
  return apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(() => null)
}

/** Signed-in area: every page here needs a session (proxy.ts). */
export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()
  return (
    <>
      <header className="flex items-center justify-end gap-4 px-4 pt-4">
        {user && <UserMenu user={user} />}
        <ModeToggle />
      </header>
      {children}
    </>
  )
}
