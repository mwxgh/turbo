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

export interface ApiFetchOptions {
  /** Extra headers for every request: `Authorization` (mobile), forwarded `Cookie` (SSR). */
  headers?: () => HeadersInit | undefined | Promise<HeadersInit | undefined>
  /** `include` sends the auth cookies cross-origin (browser → api). */
  credentials?: RequestCredentials
  /**
   * Called on a 401 (with the request path): refresh the session and resolve `true` to retry the
   * request once. Concurrent 401s share one call (single flight).
   */
  onUnauthorized?: (path: string) => Promise<boolean>
}

/** Typed `fetch` for the NestJS API: JSON in/out, `ApiError` on failure, `null` on 204. */
export function createApiFetch(
  baseUrl: () => string,
  options: ApiFetchOptions = {},
) {
  let refreshing: Promise<boolean> | undefined
  const refreshOnce = (path: string) => {
    refreshing ??= options.onUnauthorized!(path).finally(() => {
      refreshing = undefined
    })
    return refreshing
  }

  async function send(path: string, init?: RequestInit) {
    return fetch(`${baseUrl()}${path}`, {
      credentials: options.credentials,
      ...init,
      // Only requests with a body declare JSON: a bare GET stays a "simple"
      // CORS request from the browser (no OPTIONS preflight).
      headers: {
        ...(init?.body ? { 'content-type': 'application/json' } : {}),
        ...Object.fromEntries(new Headers(await options.headers?.())),
        ...init?.headers,
      },
    })
  }

  return async function apiFetch<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    let res = await send(path, init)
    if (
      res.status === 401 &&
      options.onUnauthorized &&
      (await refreshOnce(path))
    )
      res = await send(path, init)
    const body: unknown =
      res.status === 204 ? null : await res.json().catch(() => null)
    if (!res.ok) throw new ApiError(res.status, body)
    return body as T
  }
}
