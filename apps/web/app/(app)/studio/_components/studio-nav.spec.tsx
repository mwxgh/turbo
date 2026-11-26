import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StudioNav } from './studio-nav'

let pathname = '/studio'
vi.mock('next/navigation', () => ({ usePathname: () => pathname }))

describe('StudioNav', () => {
  it('lists the learning groups and the generator', () => {
    render(<StudioNav />)
    for (const name of [
      'Tổng quan',
      'Lộ trình',
      'Ngôn ngữ',
      'Framework',
      'Design pattern',
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
    render(<StudioNav />)
    expect(screen.getByRole('link', { name: 'Lộ trình' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Tổng quan' })).not.toHaveAttribute(
      'aria-current',
    )
  })
})
