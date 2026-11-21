import { Injectable } from '@nestjs/common'

import { env } from '../env'

export interface ArkMessage {
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

/**
 * The JSON a model answered with: drops reasoning (`<think>…</think>`), Markdown fences and any
 * prose around the outermost object / array. Throws when there is none or it does not parse.
 */
export function extractJson(text: string): unknown {
  const body = text.replace(/<think>[\s\S]*?<\/think>/g, '')
  const start = body.search(/[[{]/)
  const end = Math.max(body.lastIndexOf('}'), body.lastIndexOf(']'))
  if (start < 0 || end < start) throw new Error('The model answered no JSON')
  return JSON.parse(body.slice(start, end + 1))
}

/** Generation budget of one non-streamed answer (a batch of items can be long). */
const COMPLETE_TIMEOUT_MS = 5 * 60_000

/** Language model of Lingo (tutor chat, content generation): BytePlus ModelArk, OpenAI-compatible. */
@Injectable()
export class ArkModel {
  get enabled(): boolean {
    return Boolean(env.ARK_API_KEY && env.ARK_MODEL)
  }

  private async request(
    messages: ArkMessage[],
    stream: boolean,
    signal?: AbortSignal,
  ) {
    const res = await fetch(`${env.ARK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.ARK_API_KEY}`,
      },
      body: JSON.stringify({ model: env.ARK_MODEL, messages, stream }),
      signal,
    })
    if (!res.ok || !res.body)
      throw new Error(
        `ModelArk ${res.status}: ${(await res.text()).slice(0, 500)}`,
      )
    return res
  }

  async *stream(
    messages: ArkMessage[],
    signal?: AbortSignal,
  ): AsyncGenerator<string> {
    const res = await this.request(messages, true, signal)
    yield* sseDeltas(res.body!)
  }

  /** The whole answer at once (background generation). */
  async complete(messages: ArkMessage[]): Promise<string> {
    const res = await this.request(
      messages,
      false,
      AbortSignal.timeout(COMPLETE_TIMEOUT_MS),
    )
    const json = (await res.json()) as {
      choices?: { message?: { content?: string | null } }[]
    }
    const content = json.choices?.[0]?.message?.content
    if (!content) throw new Error('ModelArk answered nothing')
    return content
  }
}
