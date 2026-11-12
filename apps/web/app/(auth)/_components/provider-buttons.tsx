'use client'

import { useEffect, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import type { SignInProvider } from '@repo/utils'

import { ProviderIcon } from '@/app/(auth)/_components/provider-icon'
import { publicEnv } from '@/lib/env'

/**
 * One link per enabled provider: a full page load to the api, which redirects there and back.
 * The chosen one shows a spinner and the others stop responding, so a slow redirect cannot start
 * two flows.
 */
export function ProviderButtons({
  providers,
  verb,
  next,
}: {
  providers: SignInProvider[]
  verb: string
  next: string
}) {
  const [pending, setPending] = useState<string>()

  // Back from the provider (bfcache restores this page as it was): buttons usable again
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setPending(undefined)
    }
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => {
        const busy = pending === provider.id
        return (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            className="h-10 w-full cursor-pointer gap-2.5
              aria-disabled:pointer-events-none aria-disabled:opacity-50"
            nativeButton={false}
            aria-disabled={pending !== undefined && !busy ? true : undefined}
            aria-busy={busy || undefined}
            render={
              <a
                href={`${publicEnv.apiUrl}/auth/oauth/${provider.id}?next=${encodeURIComponent(next)}`}
                onClick={(event) => {
                  if (pending) event.preventDefault()
                  else setPending(provider.id)
                }}
              />
            }
          >
            {busy ? (
              <Loader2
                aria-hidden="true"
                className="size-4.5 animate-spin motion-reduce:animate-none"
              />
            ) : (
              <ProviderIcon provider={provider} />
            )}
            {verb} with {provider.label}
          </Button>
        )
      })}
    </div>
  )
}
