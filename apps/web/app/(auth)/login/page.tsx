import type { Metadata } from 'next'

import { oauthErrorMessage } from '@repo/utils'

import { AuthShell } from '@/app/(auth)/_components/auth-shell'
import { safeNext } from '@/lib/auth'
import { getAuthMethods } from '@/lib/auth-methods'

import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const { next, error } = await searchParams
  const target = safeNext(next)
  return (
    <AuthShell
      mode="login"
      next={target}
      methods={await getAuthMethods()}
      // Set by the api when a provider sign-in did not complete
      error={typeof error === 'string' ? oauthErrorMessage(error) : undefined}
    >
      <LoginForm next={target} />
    </AuthShell>
  )
}
