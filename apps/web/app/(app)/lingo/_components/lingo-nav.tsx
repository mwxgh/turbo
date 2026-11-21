'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@repo/ui/lib/utils'

import { DEFAULT_EXAM } from '@/lib/lingo'

const LINKS = [
  { href: `/lingo/${DEFAULT_EXAM}`, label: 'Tổng quan' },
  { href: '/lingo/review', label: 'Ôn từ vựng' },
  { href: `/lingo/${DEFAULT_EXAM}/mistakes`, label: 'Sổ câu sai' },
  { href: '/lingo/chat', label: 'Hỏi AI' },
]

/** Sections of Lingo; the admin link only for admins. */
export function LingoNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const links = isAdmin
    ? [...LINKS, { href: '/lingo/admin', label: 'Quản trị' }]
    : LINKS
  return (
    <nav aria-label="Lingo" className="border-b">
      <ul className="mx-auto flex w-full max-w-5xl gap-1 overflow-x-auto px-4">
        {links.map((link) => {
          const active = pathname === link.href
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
                    ? 'border-primary text-foreground'
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
