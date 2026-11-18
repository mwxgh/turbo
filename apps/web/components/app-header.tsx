'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRight } from 'lucide-react'

import type { User } from '@repo/types'
import { ModeToggle } from '@repo/ui/components/mode-toggle'

import { UserMenu } from '@/components/user-menu'
import { appOf } from '@/lib/apps'

/** Same on every signed-in page: home (launcher) link, the current app, account and theme. */
export function AppHeader({ user }: { user: User | null }) {
  const app = appOf(usePathname())
  return (
    <header className="border-b">
      <div
        className="mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4"
      >
        <nav
          aria-label="Location"
          className="flex min-w-0 items-center gap-2 text-sm"
        >
          <Link
            href="/"
            aria-current={app ? undefined : 'page'}
            className="flex items-center gap-2 rounded-md font-semibold
              outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-md
                bg-primary text-xs font-bold text-primary-foreground"
            >
              T
            </span>
            Turbo
          </Link>
          {app && (
            <>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
              />
              <span aria-current="page" className="truncate font-medium">
                {app.name}
              </span>
            </>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {user && <UserMenu user={user} />}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
