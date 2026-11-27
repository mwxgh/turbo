import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SidebarProvider } from '@repo/ui/components/sidebar'

import { StudioNav } from './studio-nav'

let pathname = '/studio'
vi.mock('next/navigation', () => ({ usePathname: () => pathname }))

describe('StudioNav', () => {
  it('lists the learning groups, every category and the generator', () => {
    render(
      <SidebarProvider>
        <StudioNav />
      </SidebarProvider>,
    )
    for (const name of [
      'Tổng quan',
      'Lộ trình',
      'Ngôn ngữ',
      'Framework',
      'Design pattern',
      'Cơ sở dữ liệu',
      'DevOps & Cloud',
      'Khoa học máy tính',
      'Bảo mật',
      'Tạo project',
    ])
      expect(screen.getByRole('link', { name })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Tổng quan' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('marks a section active on its sub-pages, the overview only on itself', () => {
    pathname = '/studio/roadmaps/backend'
    render(
      <SidebarProvider>
        <StudioNav />
      </SidebarProvider>,
    )
    expect(screen.getByRole('link', { name: 'Lộ trình' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Tổng quan' })).not.toHaveAttribute(
      'aria-current',
    )
  })
})
