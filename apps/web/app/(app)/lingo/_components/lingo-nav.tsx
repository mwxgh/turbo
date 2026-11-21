'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@repo/ui/lib/utils'

import { DEFAULT_EXAM } from '@/lib/lingo'

const LINKS = [
  { href: `/lingo/${DEFAULT_EXAM}/tests`, label: 'Đề thi' },
  { href: `/lingo/${DEFAULT_EXAM}`, label: 'Luyện tập' },
  { href: '/lingo/history', label: 'Lịch sử' },
  { href: '/lingo/review', label: 'Ôn từ vựng' },
  { href: `/lingo/${DEFAULT_EXAM}/mistakes`, label: 'Sổ câu sai' },
  { href: '/lingo/chat', label: 'Hỏi AI' },
]

/** Sections of the learner site; admins also get the way to the teacher site. */
export function LingoNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const links = isAdmin
    ? [...LINKS, { href: '/teach', label: 'Khu ra đề' }]
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
