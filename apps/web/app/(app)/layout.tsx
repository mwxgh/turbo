import { cookies } from 'next/headers'

import type { User } from '@repo/types'

import { AppHeader } from '@/components/app-header'
import { apiFetch } from '@/lib/api'
import { authCookies } from '@/lib/env'

/** The signed-in user, or null (expired session: proxy.ts redirects pages). */
async function currentUser(): Promise<User | null> {
  if (!(await cookies()).has(authCookies.access)) return null
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
      <AppHeader user={user} />
      {children}
    </>
  )
}
