import Link from 'next/link'

import type { AuthMethods } from '@repo/types'
import { Separator } from '@repo/ui/components/separator'
import { enabledSignInProviders } from '@repo/utils'

import { AuthPanel } from '@/app/(auth)/_components/auth-panel'
import { ProviderButtons } from '@/app/(auth)/_components/provider-buttons'
import { FormError } from '@/app/(auth)/_components/submit-button'
import { Wordmark } from '@/components/wordmark'

export type AuthMode = 'login' | 'register'

const COPY: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: 'Sign in to your account',
    description: 'Pick up where you left off',
  },
  register: {
    title: 'Create an account',
    description: 'Takes less than a minute',
  },
}

const TABS = [
  { mode: 'login', path: '/login', label: 'Sign in' },
  { mode: 'register', path: '/register', label: 'Create account' },
] as const

/** `?next=` kept when switching tabs (only when it is not the default). */
const withNext = (path: '/login' | '/register', next: string) =>
  next === '/' ? path : `${path}?next=${encodeURIComponent(next)}`

/**
 * Sign-in / sign-up page: the form column (tabs when registration is open, provider buttons the
 * api enabled, then the password form in `children`) and, from `lg`, the product panel. The tabs are links: each mode has its own URL.
 */
export function AuthShell({
  mode,
  next,
  methods,
  error,
  children,
}: {
  mode: AuthMode
  next: string
  methods: AuthMethods
  error?: string
  children: React.ReactNode
}) {
  const providers = enabledSignInProviders(methods.providers)
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <main className="flex flex-col justify-center px-4 py-16 sm:px-8">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div className="mb-4 lg:hidden">
            <Wordmark />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-medium tracking-tight text-balance">
              {COPY[mode].title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {COPY[mode].description}
            </p>
          </div>

          {methods.registration && (
            <nav
              aria-label="Sign in or create an account"
              className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-sm"
            >
              {TABS.map((tab) => {
                const current = tab.mode === mode
                return (
                  <Link
                    key={tab.mode}
                    href={withNext(tab.path, next)}
                    aria-current={current ? 'page' : undefined}
                    className={`flex min-h-8 items-center justify-center
                    rounded-md px-3 font-medium transition-colors outline-none
                    focus-visible:ring-3 focus-visible:ring-ring/50 ${
                      current
                        ? `bg-background text-foreground ring-1
                          ring-foreground/10`
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          )}

          {error && <FormError message={error} />}

          {providers.length > 0 && (
            <>
              <ProviderButtons
                providers={providers}
                verb={mode === 'login' ? 'Continue' : 'Sign up'}
                next={next}
              />
              <div
                className="flex items-center gap-3 text-xs
                  text-muted-foreground"
                aria-hidden="true"
              >
                <Separator className="flex-1" />
                or with email
                <Separator className="flex-1" />
              </div>
            </>
          )}

          {children}
        </div>
      </main>

      <AuthPanel />
    </div>
  )
}
