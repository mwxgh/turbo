export type ProbeStatus = 'up' | 'down'

/**
 * Health-check helper: `'up'` when `check` resolves within `timeoutMs`, else
 * `'down'` (never throws). `onError` receives the failure, e.g. to log it.
 */
export async function probe(
  check: () => Promise<unknown>,
  timeoutMs: number,
  onError?: (error: unknown) => void,
): Promise<ProbeStatus> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      check(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`timed out after ${timeoutMs}ms`)),
          timeoutMs,
        )
      }),
    ])
    return 'up'
  } catch (error) {
    onError?.(error)
    return 'down'
  } finally {
    clearTimeout(timer)
  }
}
