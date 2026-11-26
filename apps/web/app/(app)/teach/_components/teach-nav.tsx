'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BookOpen,
  ExternalLink,
  FilePlus2,
  FileStack,
  LayoutDashboard,
  ListChecks,
  Upload,
} from 'pulsoicon-react'

import { cn } from '@repo/ui/lib/utils'

const LINKS = [
  { href: '/teach', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/teach/tests', label: 'Bộ đề', icon: FileStack },
  { href: '/teach/lessons', label: 'Bài học', icon: BookOpen },
  { href: '/teach/items', label: 'Ngân hàng câu hỏi', icon: ListChecks },
  { href: '/teach/ai', label: 'Sinh bằng AI', icon: FilePlus2 },
  { href: '/teach/import', label: 'Nhập dữ liệu', icon: Upload },
] as const

const linkClass = `flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm
  font-medium whitespace-nowrap transition-colors outline-none
  focus-visible:ring-3 focus-visible:ring-ring/50`

/** Teacher site sections: a sidebar on wide screens, a scrolling row on phones. */
export function TeachNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Ra đề"
      className="flex gap-1 overflow-x-auto border-b px-4 py-2 lg:sticky
        lg:top-0 lg:h-fit lg:flex-col lg:overflow-visible lg:border-b-0 lg:px-3
        lg:py-6"
    >
      <p
        className="hidden px-3 pb-3 text-xs font-medium text-muted-foreground
          lg:block"
      >
        Lingo · Khu ra đề
      </p>
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== '/teach' && pathname.startsWith(`${href}/`))
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              linkClass,
              active
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </Link>
        )
      })}
      <Link
        href="/lingo"
        className={cn(
          linkClass,
          'text-muted-foreground hover:bg-muted hover:text-foreground lg:mt-4',
        )}
      >
        <ExternalLink aria-hidden="true" className="size-4" />
        Trang học viên
      </Link>
    </nav>
  )
}
