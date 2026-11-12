import { useSyncExternalStore } from 'react'

import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

import type { AuthResponse } from '@repo/types'
import {
  AUTH_TRANSPORT_HEADER,
  AUTH_TRANSPORT_TOKEN,
  createApiFetch,
} from '@repo/utils'

import { env } from './env'
import { queryClient } from './query-client'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export type SessionStatus = 'loading' | 'signedIn' | 'signedOut'

const KEY = 'auth.tokens'

/** Keychain (iOS) / Keystore (Android); the web build has no secure store, so localStorage. */
const storage =
  Platform.OS === 'web'
    ? {
        get: () =>
          Promise.resolve(globalThis.localStorage?.getItem(KEY) ?? null),
        set: (value: string) =>
          Promise.resolve(globalThis.localStorage?.setItem(KEY, value)),
        remove: () => Promise.resolve(globalThis.localStorage?.removeItem(KEY)),
      }
    : {
        get: () => SecureStore.getItemAsync(KEY),
        set: (value: string) => SecureStore.setItemAsync(KEY, value),
        remove: () => SecureStore.deleteItemAsync(KEY),
      }

/** Auth endpoints in token mode: the api returns the tokens in the body (no cookies). */
const authFetch = createApiFetch(() => env.apiUrl, {
  headers: () => ({ [AUTH_TRANSPORT_HEADER]: AUTH_TRANSPORT_TOKEN }),
})

let tokens: Tokens | null = null
let status: SessionStatus = 'loading'
const listeners = new Set<() => void>()

function setSession(next: Tokens | null) {
  tokens = next
  status = next ? 'signedIn' : 'signedOut'
  for (const listener of listeners) listener()
}

async function store(res: AuthResponse) {
  if (!res.accessToken || !res.refreshToken)
    throw new Error('The api did not return tokens')
  const next = { accessToken: res.accessToken, refreshToken: res.refreshToken }
  await storage.set(JSON.stringify(next))
  setSession(next)
}

/** Reads the saved tokens at startup (`loading` until then). */
export async function loadSession(): Promise<void> {
  try {
    const saved = JSON.parse((await storage.get()) ?? 'null') as Tokens | null
    setSession(saved?.accessToken && saved.refreshToken ? saved : null)
  } catch {
    setSession(null)
  }
}

export const accessToken = () => tokens?.accessToken

/** Rejects with `ApiError` (401 wrong credentials, 429 too many attempts). */
export async function signIn(login: string, password: string): Promise<void> {
  await store(
    await authFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login, password }),
    }),
  )
}

/** Creates an account and signs in. Rejects with `ApiError` (409 taken, 403 sign-ups closed). */
export async function signUp(input: {
  email: string
  password: string
  name?: string
}): Promise<void> {
  await store(
    await authFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  )
}

/**
 * Provider sign-in, last step: the one-time code the api redirected the app to, plus the PKCE
 * verifier of the flow (`lib/oauth.ts`). Rejects with `ApiError` 401 when it expired or was used.
 */
export async function redeemOAuthCode(
  code: string,
  codeVerifier: string,
): Promise<void> {
  await store(
    await authFetch<AuthResponse>('/auth/oauth/exchange', {
      method: 'POST',
      body: JSON.stringify({ code, codeVerifier }),
    }),
  )
}

let refreshing: Promise<boolean> | undefined

/** Rotates the tokens; `false` (and signed out) when the session is over. One call at a time. */
export function refreshSession(): Promise<boolean> {
  const refreshToken = tokens?.refreshToken
  if (!refreshToken) return Promise.resolve(false)
  refreshing ??= authFetch<AuthResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
    .then(store)
    .then(() => true)
    .catch(async () => {
      await clear()
      return false
    })
    .finally(() => {
      refreshing = undefined
    })
  return refreshing
}

async function clear() {
  await storage.remove()
  queryClient.clear()
  setSession(null)
}

/** Ends the session on the api (best effort) and forgets the tokens. */
export async function signOut(): Promise<void> {
  const refreshToken = tokens?.refreshToken
  if (refreshToken)
    await authFetch('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined)
  await clear()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Re-renders when the user signs in or out (also when a refresh fails). */
export const useSessionStatus = () =>
  useSyncExternalStore(subscribe, () => status)
