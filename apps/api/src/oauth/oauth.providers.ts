import { OAuthProvider } from '@repo/db'

import { env } from '../env'

/** What the api needs from a provider account. */
export interface ProviderProfile {
  /** Stable provider user id (never the email). */
  subject: string
  /** Lowercase. */
  email?: string
  /** The provider vouches that the user controls `email` (only then may it link to an account). */
  emailVerified: boolean
  name?: string
}

export interface ProviderConfig {
  authorizeUrl: string
  tokenUrl: string
  scopes: string[]
  /** Extra authorize parameters. */
  authorizeParams?: Record<string, string>
  /** Reads the profile with the provider's access token. */
  profile(accessToken: string): Promise<ProviderProfile>
}

/** A provider call that failed (network, HTTP status, unexpected body). */
export class ProviderError extends Error {}

async function getJson<T>(url: string, accessToken: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      accept: 'application/json',
      // GitHub rejects requests without a User-Agent
      'user-agent': 'oauth-client',
    },
  })
  if (!res.ok) throw new ProviderError(`${url} answered ${res.status}`)
  return (await res.json()) as T
}

const lower = (email: unknown) =>
  typeof email === 'string' && email ? email.toLowerCase() : undefined

const text = (value: unknown) =>
  typeof value === 'string' && value ? value.slice(0, 100) : undefined

export const PROVIDERS: Record<OAuthProvider, ProviderConfig> = {
  [OAuthProvider.GOOGLE]: {
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['openid', 'email', 'profile'],
    authorizeParams: { prompt: 'select_account' },
    async profile(accessToken) {
      const info = await getJson<{
        sub?: string
        email?: string
        email_verified?: boolean
        name?: string
      }>('https://openidconnect.googleapis.com/v1/userinfo', accessToken)
      if (!info.sub) throw new ProviderError('Google: no sub')
      return {
        subject: info.sub,
        email: lower(info.email),
        emailVerified: info.email_verified === true,
        name: text(info.name),
      }
    },
  },

  [OAuthProvider.GITHUB]: {
    authorizeUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scopes: ['read:user', 'user:email'],
    async profile(accessToken) {
      const [user, emails] = await Promise.all([
        getJson<{ id?: number; name?: string; login?: string }>(
          'https://api.github.com/user',
          accessToken,
        ),
        getJson<{ email: string; primary: boolean; verified: boolean }[]>(
          'https://api.github.com/user/emails',
          accessToken,
        ),
      ])
      if (typeof user.id !== 'number') throw new ProviderError('GitHub: no id')
      const primary = emails.find((e) => e.primary)
      return {
        subject: String(user.id),
        email: lower(primary?.email),
        emailVerified: primary?.verified === true,
        name: text(user.name) ?? text(user.login),
      }
    },
  },

  // Unversioned Graph URLs use the app's default API version (set in the Meta app dashboard)
  [OAuthProvider.FACEBOOK]: {
    authorizeUrl: 'https://www.facebook.com/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/oauth/access_token',
    scopes: ['email', 'public_profile'],
    async profile(accessToken) {
      const me = await getJson<{ id?: string; name?: string; email?: string }>(
        'https://graph.facebook.com/me?fields=id,name,email',
        accessToken,
      )
      if (!me.id) throw new ProviderError('Facebook: no id')
      return {
        subject: me.id,
        email: lower(me.email),
        // Graph API has no verified flag: never link existing accounts by a Facebook email
        emailVerified: false,
        name: text(me.name),
      }
    },
  },
}

/** Client credentials of a provider, or `undefined` when it is not configured. */
export function credentialsOf(
  provider: OAuthProvider,
): { clientId: string; clientSecret: string } | undefined {
  const [clientId, clientSecret] = {
    [OAuthProvider.GOOGLE]: [
      env.OAUTH_GOOGLE_CLIENT_ID,
      env.OAUTH_GOOGLE_CLIENT_SECRET,
    ],
    [OAuthProvider.FACEBOOK]: [
      env.OAUTH_FACEBOOK_CLIENT_ID,
      env.OAUTH_FACEBOOK_CLIENT_SECRET,
    ],
    [OAuthProvider.GITHUB]: [
      env.OAUTH_GITHUB_CLIENT_ID,
      env.OAUTH_GITHUB_CLIENT_SECRET,
    ],
  }[provider]
  return clientId && clientSecret ? { clientId, clientSecret } : undefined
}

/** URL path segment ↔ enum: `/auth/oauth/google`. */
export const providerFromSlug = (slug: string): OAuthProvider | undefined =>
  Object.values(OAuthProvider).find((p) => p.toLowerCase() === slug)

export const slugOf = (provider: OAuthProvider) => provider.toLowerCase()
