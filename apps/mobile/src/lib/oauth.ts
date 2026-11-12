import * as Crypto from 'expo-crypto'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

import { env } from './env'
import { redeemOAuthCode } from './session'

/** A provider sign-in that did not complete; `code` is the api's `OAuthErrorCode`. */
export class OAuthSignInError extends Error {
  constructor(readonly code: string) {
    super(code)
  }
}

/** PKCE verifier: 64 hex characters (two v4 UUIDs, 244 random bits). */
const createVerifier = () =>
  `${Crypto.randomUUID()}${Crypto.randomUUID()}`.replace(/-/g, '')

/** base64url SHA-256 of the verifier (`S256`). */
async function challengeOf(verifier: string) {
  const base64 = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    verifier,
    { encoding: Crypto.CryptoEncoding.BASE64 },
  )
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Signs in with Google / Facebook / GitHub through the api, in the system browser (the provider
 * never sees the app). The api returns to `<scheme>://oauth?code=…`, which only this app can redeem:
 * the exchange needs the verifier that never left the device.
 *
 * Resolves `false` when the user closed the browser. The redirect URL must be listed in the api's
 * `OAUTH_MOBILE_REDIRECT_URIS` (`turbobase://oauth` in builds; Expo Go uses an `exp://` URL).
 */
export async function signInWithProvider(provider: string): Promise<boolean> {
  const verifier = createVerifier()
  const redirectUri = Linking.createURL('oauth')
  const query = new URLSearchParams({
    client: 'mobile',
    redirectUri,
    codeChallenge: await challengeOf(verifier),
  })
  const result = await WebBrowser.openAuthSessionAsync(
    `${env.apiUrl}/auth/oauth/${provider}?${query.toString()}`,
    redirectUri,
  )
  if (result.type !== 'success') return false

  const { queryParams } = Linking.parse(result.url)
  const code = queryParams?.code
  if (typeof code !== 'string')
    throw new OAuthSignInError(
      typeof queryParams?.error === 'string'
        ? queryParams.error
        : 'provider_error',
    )
  await redeemOAuthCode(code, verifier)
  return true
}
