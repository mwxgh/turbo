import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiBaseUrl, apiFetch, setServerHeaders } from './api'
import { publicEnv, serverApiUrl } from './env'

// Request/response handling is covered by createApiFetch in @repo/utils.
describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    setServerHeaders(undefined)
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
      // the browser sends the auth cookies to the api
      credentials: 'include',
      headers: {},
    })
  })

  it('forwards the registered request headers on the server, from any copy of the module', async () => {
    vi.stubGlobal('window', undefined)
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }))
    // Another bundle's copy of lib/api (instrumentation) registers the headers
    vi.resetModules()
    const other = await import('./api')
    expect(other.setServerHeaders).not.toBe(setServerHeaders)
    other.setServerHeaders(() => Promise.resolve({ cookie: 'access_token=a' }))

    await apiFetch('/auth/me')
    expect(fetchMock).toHaveBeenCalledWith(`${serverApiUrl}/auth/me`, {
      credentials: 'include',
      headers: { cookie: 'access_token=a' },
    })
  })
})
