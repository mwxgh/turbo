import type { Metadata } from 'next'

import { safeNext } from '../../lib/auth'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const { next } = await searchParams
  return (
    <main
      className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center
        px-4"
    >
      <LoginForm next={safeNext(next)} />
    </main>
  )
}
