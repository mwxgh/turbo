'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BookOpen,
  Cloud,
  Code,
  Cpu,
  Database,
  FolderPlus,
  Layers,
  LayoutDashboard,
  type PulsoIcon,
  Puzzle,
  Route,
  ShieldCheck,
  Wrench,
} from 'pulsoicon-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@repo/ui/components/sidebar'

import { CATEGORIES, type CategoryInfo } from '@/lib/studio'

interface StudioLink {
  href: string
  label: string
  icon: PulsoIcon
}

const CATEGORY_ICONS: Record<CategoryInfo['segment'], PulsoIcon> = {
  languages: Code,
  frameworks: Layers,
  patterns: Puzzle,
  fundamentals: BookOpen,
  tools: Wrench,
  databases: Database,
  devops: Cloud,
  'computer-science': Cpu,
  security: ShieldCheck,
}

export const STUDIO_GROUPS: { label: string; links: StudioLink[] }[] = [
  {
    label: 'Học',
    links: [
      { href: '/studio', label: 'Tổng quan', icon: LayoutDashboard },
      { href: '/studio/roadmaps', label: 'Lộ trình', icon: Route },
    ],
  },
  {
    label: 'Chủ đề',
    links: CATEGORIES.map((c) => ({
      href: `/studio/${c.segment}`,
      label: c.label,
      icon: CATEGORY_ICONS[c.segment],
    })),
  },
  {
    label: 'Công cụ',
    links: [
      { href: '/studio/generator', label: 'Tạo project', icon: FolderPlus },
    ],
  },
]

/** The overview matches only itself, the other sections their sub-pages too. */
const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== '/studio' && pathname.startsWith(`${href}/`))

/**
 * Sections of Studio as a sidebar below the app header: collapses to icons on desktop,
 * a sheet on mobile (closed again after picking a link).
 */
export function StudioNav() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  return (
    <Sidebar
      collapsible="icon"
      className="top-[calc(3.5rem+1px)] h-[calc(100svh-3.5rem-1px)]"
    >
      <SidebarContent>
        <nav aria-label="Studio">
          {STUDIO_GROUPS.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.links.map(({ href, label, icon: Icon }) => {
                    const active = isActive(pathname, href)
                    return (
                      <SidebarMenuItem key={href}>
                        <SidebarMenuButton
                          isActive={active}
                          tooltip={label}
                          render={
                            <Link
                              href={href}
                              aria-current={active ? 'page' : undefined}
                              onClick={() => isMobile && setOpenMobile(false)}
                            />
                          }
                        >
                          <Icon aria-hidden="true" />
                          <span>{label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </nav>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
