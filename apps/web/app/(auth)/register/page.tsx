import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AuthShell } from '@/app/(auth)/_components/auth-shell'
import { safeNext } from '@/lib/auth'
import { getAuthMethods } from '@/lib/auth-methods'

import { RegisterForm } from './register-form'

export const metadata: Metadata = { title: 'Create account' }

export default async function RegisterPage({
  searchParams,
}: PageProps<'/register'>) {
  const { next } = await searchParams
  const target = safeNext(next)
  const methods = await getAuthMethods()
  // Sign-ups closed (AUTH_REGISTRATION=closed): accounts come from admins
  if (!methods.registration) redirect('/login')
  return (
    <AuthShell mode="register" next={target} methods={methods}>
      <RegisterForm next={target} />
    </AuthShell>
  )
}
