import Link from 'next/link'

import type { AuthMethods } from '@repo/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Separator } from '@repo/ui/components/separator'
import { enabledSignInProviders } from '@repo/utils'

import { ProviderButtons } from '@/app/(auth)/_components/provider-buttons'
import { FormError } from '@/app/(auth)/_components/submit-button'

export type AuthMode = 'login' | 'register'

const COPY: Record<AuthMode, { title: string; description: string }> = {
  login: {
    title: 'Welcome back',
    description: 'Sign in to continue.',
  },
  register: {
    title: 'Create your account',
    description: 'It takes less than a minute.',
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
 * Sign-in / sign-up page frame: tabs (when registration is open), provider buttons (the ones the
 * api enabled), then the password form (`children`). The tabs are links: each mode has its own URL.
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
    <main
      className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center
        px-4 py-12"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle>
            <h1 className="text-xl font-semibold tracking-tight text-balance">
              {COPY[mode].title}
            </h1>
          </CardTitle>
          <CardDescription>{COPY[mode].description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
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
                    className={`flex min-h-9 items-center justify-center
                    rounded-md px-3 font-medium transition-colors outline-none
                    focus-visible:ring-3 focus-visible:ring-ring/50 ${
                      current
                        ? 'bg-background text-foreground shadow-sm'
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
        </CardContent>
      </Card>
    </main>
  )
}
