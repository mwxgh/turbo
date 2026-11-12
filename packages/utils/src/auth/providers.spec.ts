import { describe, expect, it } from 'vitest'

import { enabledSignInProviders, oauthErrorMessage } from './providers.js'

describe('sign-in providers', () => {
  it('keeps the button order and drops unknown ids', () => {
    expect(
      enabledSignInProviders(['github', 'google', 'myspace']).map((p) => p.id),
    ).toEqual(['google', 'github'])
  })

  it('has a message for every error code, and a fallback', () => {
    expect(oauthErrorMessage('cancelled')).toMatch(/cancelled/)
    expect(oauthErrorMessage('something_new')).toMatch(/try again/)
  })
})
