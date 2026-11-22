import { describe, expect, it, vi } from 'vitest'

import { askTutor } from './lingo-chat'

const { raw } = vi.hoisted(() => ({ raw: vi.fn() }))
vi.mock('@/lib/api', () => ({ apiFetch: { raw } }))

describe('askTutor', () => {
  it('posts the question and yields the streamed text', async () => {
    raw.mockResolvedValue(
      new Response(
        new ReadableStream({
          start(controller) {
            const encoder = new TextEncoder()
            controller.enqueue(encoder.encode('Xin '))
            controller.enqueue(encoder.encode('chào'))
            controller.close()
          },
        }),
      ),
    )
    const signal = new AbortController().signal
    let answer = ''
    for await (const piece of askTutor('c 1', 'Hi', signal)) answer += piece

    expect(answer).toBe('Xin chào')
    expect(raw).toHaveBeenCalledWith('/lingo/chats/c%201/messages', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hi' }),
      signal,
    })
  })

  it('passes API errors on', async () => {
    const error = new Error('503')
    raw.mockImplementation(() => Promise.reject(error))
    const caught: unknown = await askTutor('c', 'Hi')
      .next()
      .then(
        () => undefined,
        (reason: unknown) => reason,
      )
    expect(caught).toBe(error)
  })
})
