import { Injectable } from '@nestjs/common'

import { env } from '../env'

export interface TutorMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Text pieces of an OpenAI-style SSE stream (`data: {choices:[{delta:{content}}]}` … `data: [DONE]`).
 * Lines may be split across network chunks: the tail of each chunk waits for the next one.
 */
export async function* sseDeltas(
  body: AsyncIterable<Uint8Array>,
): AsyncGenerator<string> {
  const decoder = new TextDecoder()
  let buffer = ''
  for await (const chunk of body) {
    buffer += decoder.decode(chunk, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const data = line.trim()
      if (!data.startsWith('data:')) continue
      const payload = data.slice(5).trim()
      if (payload === '[DONE]') return
      const json = JSON.parse(payload) as {
        choices?: { delta?: { content?: string | null } }[]
      }
      const text = json.choices?.[0]?.delta?.content
      if (text) yield text
    }
  }
}

/** The AI tutor's language model: BytePlus ModelArk chat completions (OpenAI-compatible). */
@Injectable()
export class TutorModel {
  get enabled(): boolean {
    return Boolean(env.ARK_API_KEY && env.ARK_MODEL)
  }

  async *stream(
    messages: TutorMessage[],
    signal?: AbortSignal,
  ): AsyncGenerator<string> {
    const res = await fetch(`${env.ARK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.ARK_API_KEY}`,
      },
      body: JSON.stringify({ model: env.ARK_MODEL, messages, stream: true }),
      signal,
    })
    if (!res.ok || !res.body)
      throw new Error(
        `ModelArk ${res.status}: ${(await res.text()).slice(0, 500)}`,
      )
    yield* sseDeltas(res.body)
  }
}
