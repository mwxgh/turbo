import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiBaseUrl, apiFetch } from './api'
import { publicEnv, serverApiUrl } from './env'

// Request/response handling is covered by createApiFetch in @repo/utils.
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

  it('calls the API base URL', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }))
    await apiFetch('/health')
    expect(fetchMock).toHaveBeenCalledWith(`${publicEnv.apiUrl}/health`, {
      headers: {},
    })
  })
})
