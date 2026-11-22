import { apiFetch } from '@/lib/api'

/**
 * Asks the AI tutor and yields its answer piece by piece (the API streams plain text). Runs in
 * the browser, not as a Server Action, so the pieces reach the page as they arrive.
 */
export async function* askTutor(
  chatId: string,
  text: string,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const res = await apiFetch.raw(
    `/lingo/chats/${encodeURIComponent(chatId)}/messages`,
    { method: 'POST', body: JSON.stringify({ text }), signal },
  )
  if (!res.body) return
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) return
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}
