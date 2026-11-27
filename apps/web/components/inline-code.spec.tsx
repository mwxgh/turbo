import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InlineCode } from './inline-code'

describe('InlineCode', () => {
  it('renders backtick spans as code and keeps the rest as text', () => {
    const { container } = render(
      <InlineCode text="Kết quả của `'1' === 1` là gì, còn `typeof null`?" />,
    )
    expect(
      [...container.querySelectorAll('code')].map((c) => c.textContent),
    ).toEqual(["'1' === 1", 'typeof null'])
    expect(container.textContent).toBe(
      "Kết quả của '1' === 1 là gì, còn typeof null?",
    )
  })

  it('leaves a lone backtick as text', () => {
    const { container } = render(<InlineCode text="dấu ` lẻ" />)
    expect(container.querySelector('code')).toBeNull()
    expect(container.textContent).toBe('dấu ` lẻ')
  })
})
