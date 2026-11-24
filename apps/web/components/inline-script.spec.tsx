import { renderToString } from 'react-dom/server'

import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { InlineScript } from './inline-script'

describe('InlineScript', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('is inert in a client render', () => {
    const { container } = render(<InlineScript html="window.ran = true" />)
    const script = container.querySelector('script')!
    expect(script.type).toBe('text/plain')
    expect(script.textContent).toBe('window.ran = true')
  })

  it('runs from the server HTML', () => {
    vi.stubGlobal('window', undefined)
    expect(renderToString(<InlineScript html="1" />)).toBe(
      '<script type="text/javascript">1</script>',
    )
  })
})
