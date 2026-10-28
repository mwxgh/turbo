import { afterEach, describe, expect, it, vi } from 'vitest'

import { ApiError, createApiFetch } from './api-fetch.js'

const BASE = 'http://api.test/api'
const apiFetch = createApiFetch(() => BASE)

const respond = (status: number, body?: unknown) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(body === undefined ? null : JSON.stringify(body), {
      status,
    }),
  )

describe('createApiFetch', () => {
  afterEach(() => vi.restoreAllMocks())

  it('calls the base URL with JSON headers and returns the body', async () => {
    const fetchMock = respond(200, { id: 1 })

    await expect(
      apiFetch('/hellos', {
        method: 'POST',
        body: '{}',
        headers: { 'x-trace': 't1' },
      }),
    ).resolves.toEqual({ id: 1 })
    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/hellos`, {
      method: 'POST',
      body: '{}',
      headers: { 'content-type': 'application/json', 'x-trace': 't1' },
    })
  })

  it('sends no content-type on GET (no CORS preflight)', async () => {
    const fetchMock = respond(200, {})
    await apiFetch('/health')
    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/health`, { headers: {} })
  })

  it('returns null for 204 No Content', async () => {
    respond(204)
    await expect(
      apiFetch('/hellos/1', { method: 'DELETE' }),
    ).resolves.toBeNull()
  })

  it('throws ApiError with status, body and the Nest message', async () => {
    respond(400, {
      statusCode: 400,
      message: ['message should not be empty', 'too long'],
    })

    const error = await apiFetch('/hellos').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({
      status: 400,
      message: 'message should not be empty, too long',
      body: { message: ['message should not be empty', 'too long'] },
    })
  })

  it('falls back to the status when the body has no message', async () => {
    respond(502)
    await expect(apiFetch('/hellos')).rejects.toThrow(
      'API request failed with status 502',
    )
  })
})
