import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button, buttonVariants } from '@repo/ui/components/button'

describe('Button', () => {
  it('renders a clickable button with variant classes', async () => {
    const onClick = vi.fn()
    render(
      <Button variant="outline" size="sm" onClick={onClick}>
        Save
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('data-slot', 'button')
    expect(button.className).toContain('border-border')

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('merges custom classes with cn (later wins)', () => {
    render(<Button className="h-12">Tall</Button>)
    const { className } = screen.getByRole('button', { name: 'Tall' })
    expect(className).toContain('h-12')
    expect(className).not.toContain('h-8')
    expect(buttonVariants()).toContain('h-8') // default size
  })
})
