import { describe, expect, it } from 'vitest'

import { sseDeltas } from './tutor-model'

async function* chunks(...parts: string[]) {
  const encoder = new TextEncoder()
  for (const part of parts) yield await Promise.resolve(encoder.encode(part))
}

const event = (content: string | null) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`

describe('sseDeltas', () => {
  it('yields the text of each event and stops at [DONE]', async () => {
    const out: string[] = []
    for await (const text of sseDeltas(
      chunks(
        event('Xin '),
        event(null),
        event('chào'),
        'data: [DONE]\n\n',
        event('late'),
      ),
    ))
      out.push(text)
    expect(out).toEqual(['Xin ', 'chào'])
  })

  it('joins lines split across network chunks, incl. multi-byte characters', async () => {
    const line = event('tiếng Việt')
    const bytes = new TextEncoder().encode(line)
    const cut = bytes.indexOf(0xe1) + 1 // inside "ế"
    async function* split() {
      for (const part of [bytes.slice(0, cut), bytes.slice(cut)])
        yield await Promise.resolve(part)
    }
    const out: string[] = []
    for await (const text of sseDeltas(split())) out.push(text)
    expect(out).toEqual(['tiếng Việt'])
  })
})
