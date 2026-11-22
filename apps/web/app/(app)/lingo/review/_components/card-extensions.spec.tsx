import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithQuery } from '@/lib/test-utils'

import { CardExtensions, toExtensions } from './card-extensions'

const learnExtensions = vi.fn((_id: string) =>
  Promise.resolve({ data: { deckId: 'd1', added: 2, known: 0 } }),
)
vi.mock('@/lib/lingo-actions', () => ({
  learnExtensions: (id: string) => learnExtensions(id),
}))
const success = vi.fn((..._args: unknown[]) => undefined)
vi.mock('@repo/ui/components/sonner', () => ({
  toast: { success: (...args: unknown[]) => success(...args), error: vi.fn() },
}))

const extensions = [
  { term: 'acceptance', pos: 'n', meaningVi: 'sự chấp nhận' },
  { term: 'accept responsibilities for', meaningVi: 'nhận trách nhiệm về' },
  { meaningVi: 'accept đi với tân ngữ trực tiếp' },
  { term: 'meet the needs' },
]

describe('CardExtensions', () => {
  it('lists words, phrases and notes, and learns the words with a meaning', async () => {
    const user = userEvent.setup()
    renderWithQuery(<CardExtensions cardId="c1" extensions={extensions} />)
    const section = screen.getByRole('region', { name: 'Từ mở rộng' })
    expect(section).toHaveTextContent('acceptance (n): sự chấp nhận')
    expect(section).toHaveTextContent('accept đi với tân ngữ trực tiếp')
    await user.click(screen.getByRole('button', { name: 'Học 2 từ mở rộng' }))
    expect(learnExtensions).toHaveBeenCalledWith('c1')
    expect(success).toHaveBeenCalledWith(
      'Đã thêm 2 từ vào "Từ mở rộng của tôi"',
      {},
    )
  })

  it('renders nothing for a card without extensions', () => {
    const { container } = renderWithQuery(
      <CardExtensions cardId="c1" extensions={toExtensions(null)} />,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
