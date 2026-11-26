'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@repo/ui/lib/utils'

import { CATEGORIES } from '@/lib/studio'

export const STUDIO_LINKS = [
  { href: '/studio', label: 'Tổng quan' },
  { href: '/studio/roadmaps', label: 'Lộ trình' },
  ...CATEGORIES.map((c) => ({ href: `/studio/${c.segment}`, label: c.label })),
  { href: '/studio/generator', label: 'Tạo project' },
]

/** Sections of Studio; the overview matches only itself, the others their sub-pages too. */
export function StudioNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Studio" className="border-b">
      <ul className="mx-auto flex w-full max-w-5xl gap-1 overflow-x-auto px-4">
        {STUDIO_LINKS.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== '/studio' && pathname.startsWith(`${link.href}/`))
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  `inline-flex h-11 items-center border-b-2 px-3 text-sm
                  font-medium whitespace-nowrap transition-colors outline-none
                  focus-visible:ring-3 focus-visible:ring-ring/50`,
                  active
                    ? `border-emerald-600 text-foreground
                      dark:border-emerald-400`
                    : `border-transparent text-muted-foreground
                      hover:text-foreground`,
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
