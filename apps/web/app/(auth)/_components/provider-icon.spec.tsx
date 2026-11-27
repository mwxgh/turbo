import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SIGN_IN_PROVIDERS } from '@repo/utils'

import { ProviderIcon } from './provider-icon'

describe('ProviderIcon', () => {
  it.each(SIGN_IN_PROVIDERS.map((p) => p.id))(
    'draws %s with the pulsoicon brand icon',
    (id) => {
      const provider = SIGN_IN_PROVIDERS.find((p) => p.id === id)!
      const { container } = render(<ProviderIcon provider={provider} />)
      const svg = container.querySelector('svg')!
      expect(svg).toHaveAttribute('aria-hidden', 'true')
      // The provider's own paths are only the fallback
      expect(svg.querySelector(`path[d="${provider.icon[0]!.d}"]`)).toBeNull()
    },
  )

  it('falls back to the provider’s paths', () => {
    const d = 'M0 0h24v24H0z'
    const { container } = render(
      <ProviderIcon
        provider={{ id: 'other', label: 'Other', icon: [{ d, fill: 'red' }] }}
      />,
    )
    expect(container.querySelector(`path[d="${d}"]`)).toHaveAttribute(
      'fill',
      'red',
    )
  })
})
