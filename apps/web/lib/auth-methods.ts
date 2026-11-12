import type { AuthMethods } from '@repo/types'

import { apiFetch } from './api'

/** How users may sign in; the password form alone if the api cannot be reached. */
export async function getAuthMethods(): Promise<AuthMethods> {
  try {
    return await apiFetch<AuthMethods>('/auth/methods', { cache: 'no-store' })
  } catch {
    return { providers: [], registration: false }
  }
}
