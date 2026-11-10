'use client'

import { useState } from 'react'

import type { User } from '@repo/types'
import { Button } from '@repo/ui/components/button'

import { apiFetch } from '../lib/api'

/** Who is signed in, and sign-out (session revoked, cookies cleared, full reload). */
export function UserMenu({ user }: { user: User }) {
  const [pending, setPending] = useState(false)
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">
        {user.name ?? user.username ?? user.email}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => {
          setPending(true)
          void apiFetch('/auth/logout', { method: 'POST' })
            .catch(() => undefined)
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full load drops the signed-in caches and socket
            .finally(() => window.location.assign('/login'))
        }}
      >
        Sign out
      </Button>
    </div>
  )
}
