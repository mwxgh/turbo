import { publicEnv, serverApiUrl } from './env'

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    // Nest error bodies carry the reason: { message: string | string[] }
    const message = (body as { message?: unknown } | null)?.message
    super(
      Array.isArray(message)
        ? message.join(', ')
        : typeof message === 'string'
          ? message
          : `API request failed with status ${status}`,
    )
  }
}

/**
 * Base URL of the NestJS API: internal URL on the server (Server Components,
 * Server Actions), public URL in the browser (TanStack Query).
 */
export const apiBaseUrl = () =>
  typeof window === 'undefined' ? serverApiUrl : publicEnv.apiUrl

/** Typed fetch wrapper for the NestJS API (server and browser). */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${apiBaseUrl()}${path}`, {
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
