import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EnvBadge } from './env-badge'

describe('EnvBadge', () => {
  it.each(['dev', 'stg'] as const)('labels %s', (env) => {
    render(<EnvBadge env={env} />)
    expect(screen.getByLabelText(`Environment: ${env}`)).toHaveTextContent(
      env.toUpperCase(),
    )
  })

  it('is hidden on prod', () => {
    const { container } = render(<EnvBadge env="prod" />)
    expect(container).toBeEmptyDOMElement()
  })
})
