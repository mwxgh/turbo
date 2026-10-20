import { afterEach, describe, expect, it, vi } from 'vitest'

import { ApiError, apiBaseUrl, apiFetch } from './api'
import { publicEnv, serverApiUrl } from './env'

const respond = (status: number, body?: unknown) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(body === undefined ? null : JSON.stringify(body), {
      status,
    }),
  )

describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses the public URL in the browser and API_URL on the server', () => {
    expect(apiBaseUrl()).toBe(publicEnv.apiUrl) // jsdom = browser
    vi.stubGlobal('window', undefined)
    expect(apiBaseUrl()).toBe(serverApiUrl)
  })

  it('calls the API base URL with JSON headers and returns the body', async () => {
    const fetchMock = respond(200, { id: 1 })

    await expect(
      apiFetch('/hellos', {
        method: 'POST',
        body: '{}',
        headers: { 'x-trace': 't1' },
      }),
    ).resolves.toEqual({ id: 1 })
    expect(fetchMock).toHaveBeenCalledWith(`${publicEnv.apiUrl}/hellos`, {
      method: 'POST',
      body: '{}',
      headers: { 'content-type': 'application/json', 'x-trace': 't1' },
    })
  })

  it('sends no content-type on GET (no CORS preflight)', async () => {
    const fetchMock = respond(200, {})
    await apiFetch('/health')
    expect(fetchMock).toHaveBeenCalledWith(`${publicEnv.apiUrl}/health`, {
      headers: {},
    })
  })

  it('returns null for 204 No Content', async () => {
    respond(204)
    await expect(
      apiFetch('/hellos/1', { method: 'DELETE' }),
    ).resolves.toBeNull()
  })

  it('throws ApiError with status and body on failure', async () => {
    respond(400, { statusCode: 400, message: ['message should not be empty'] })

    const error = await apiFetch('/hellos').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({
      status: 400,
      body: { message: ['message should not be empty'] },
    })
  })
})
