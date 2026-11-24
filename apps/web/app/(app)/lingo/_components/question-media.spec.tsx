import { renderToString } from 'react-dom/server'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ListeningPlayer } from './question-media'

const lines = [{ speaker: 'M' as const, text: 'Shall we meet at noon?' }]

// jsdom has no speechSynthesis: a browser without voices
describe('ListeningPlayer', () => {
  it('renders the player in the server HTML, like the first client render', () => {
    const html = renderToString(<ListeningPlayer lines={lines} />)
    expect(html).toContain('Nghe')
    expect(html).not.toContain('không đọc được')
  })

  it('tells a browser without voices to switch', () => {
    render(<ListeningPlayer lines={lines} />)
    expect(screen.getByText(/không đọc được âm thanh/)).toBeInTheDocument()
  })
})
