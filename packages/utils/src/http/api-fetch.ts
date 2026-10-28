/** Nest error bodies: `{ message: string | string[] }`. */
export function messageOf(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null || !('message' in body)) return
  const { message } = body
  return Array.isArray(message) ? message.join(', ') : String(message)
}

/** Non-2xx response of the API, with the parsed body. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(messageOf(body) ?? `API request failed with status ${status}`)
    this.name = 'ApiError'
  }
}

/** Typed `fetch` for the NestJS API: JSON in/out, `ApiError` on failure, `null` on 204. */
export function createApiFetch(baseUrl: () => string) {
  return async function apiFetch<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${baseUrl()}${path}`, {
      ...init,
      // Only requests with a body declare JSON: a bare GET stays a "simple"
      // CORS request from the browser (no OPTIONS preflight).
      headers: {
        ...(init?.body ? { 'content-type': 'application/json' } : {}),
        ...init?.headers,
      },
    })
    const body: unknown =
      res.status === 204 ? null : await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, body)
    return body as T
  }
}
