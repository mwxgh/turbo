import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithQuery } from '@/lib/test-utils'

import { TutorBubble } from './tutor-bubble'

const { pathname } = vi.hoisted(() => ({ pathname: { current: '/lingo' } }))
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }))
vi.mock('@/lib/lingo-actions', () => ({ createChat: vi.fn() }))

// jsdom has no layout
Element.prototype.scrollIntoView = vi.fn()

describe('TutorBubble', () => {
  it('opens and closes the tutor panel', async () => {
    pathname.current = '/lingo/TOEIC_LR'
    const user = userEvent.setup()
    renderWithQuery(<TutorBubble />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Hỏi gia sư AI' }))
    expect(screen.getByRole('dialog', { name: 'Gia sư AI' })).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Câu hỏi' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Mở toàn trang' }),
    ).toHaveAttribute('href', '/lingo/chat')

    await user.keyboard('{Escape}')
    expect(
      screen.getByRole('button', { name: 'Hỏi gia sư AI' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('is not shown on the full chat page', () => {
    pathname.current = '/lingo/chat'
    renderWithQuery(<TutorBubble />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
