import { createHash, randomBytes } from 'node:crypto'

import { Injectable, Logger } from '@nestjs/common'

import { type OAuthProvider, Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { InjectRedis, type Redis } from '@repo/redis'

import {
  AuthService,
  type ClientMeta,
  type IssuedSession,
} from '../auth/auth.service'
import { AuthRegistration, env } from '../env'
import {
  PROVIDERS,
  ProviderError,
  type ProviderProfile,
  credentialsOf,
  slugOf,
} from './oauth.providers'

/** Why a sign-in did not complete; sent to the client as `?error=<code>`. */
export const OAuthErrorCode = {
  /** The user cancelled at the provider. */
  Cancelled: 'cancelled',
  /** Unknown, expired, reused or foreign `state` (or another browser finished the flow). */
  InvalidState: 'invalid_state',
  /** The provider failed or answered something unexpected. */
  ProviderError: 'provider_error',
  /** An account with this email exists, but the provider does not vouch for the email. */
  EmailNotVerified: 'email_not_verified',
  /** No account yet and `AUTH_REGISTRATION=closed`. */
  RegistrationClosed: 'registration_closed',
  AccountDisabled: 'account_disabled',
} as const
export type OAuthErrorCode =
  (typeof OAuthErrorCode)[keyof typeof OAuthErrorCode]

export class OAuthError extends Error {
  constructor(readonly code: OAuthErrorCode) {
    super(code)
  }
}

/** Where the flow returns: the web app (cookies) or a mobile app (one-time exchange code). */
export type OAuthClient =
  | { kind: 'web'; next: string }
  | { kind: 'mobile'; redirectUri: string; codeChallenge: string }

interface PendingFlow {
  provider: OAuthProvider
  codeVerifier: string
  client: OAuthClient
}

interface PendingExchange {
  userId: string
  codeChallenge: string
}

/** The user has this long at the provider before the state expires. */
const STATE_TTL_SECONDS = 600
/** The app has this long to redeem the exchange code after the redirect. */
const EXCHANGE_TTL_SECONDS = 60

const random = () => randomBytes(32).toString('base64url')
const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('base64url')

const stateKey = (state: string) => `auth:oauth-state:${sha256(state)}`
const exchangeKey = (code: string) => `auth:oauth-exchange:${sha256(code)}`

/**
 * Sign-in with external providers: OAuth 2.0 authorization code + PKCE, run by the api (the
 * client secret never leaves it). The flow state lives in Redis for `STATE_TTL_SECONDS` and is
 * bound to the browser by a cookie (`OAuthController`).
 *
 * Linking: a known provider account signs in as its user; otherwise an account with the same
 * email is linked only when the provider verified that email; otherwise a new account is created
 * (when registration is open).
 */
@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /** Providers with credentials, for the sign-in buttons. */
  enabledProviders(): OAuthProvider[] {
    return (Object.keys(PROVIDERS) as OAuthProvider[]).filter((p) =>
      credentialsOf(p),
    )
  }

  isEnabled(provider: OAuthProvider): boolean {
    return !!credentialsOf(provider)
  }

  /** Starts a flow: the provider URL to redirect to and the `state` to bind to the browser. */
  async start(
    provider: OAuthProvider,
    client: OAuthClient,
  ): Promise<{ url: string; state: string }> {
    const credentials = credentialsOf(provider)
    if (!credentials) throw new OAuthError(OAuthErrorCode.ProviderError)
    const config = PROVIDERS[provider]
    const state = random()
    const codeVerifier = random()
    const flow: PendingFlow = { provider, codeVerifier, client }
    await this.redis.set(
      stateKey(state),
      JSON.stringify(flow),
      'EX',
      STATE_TTL_SECONDS,
    )

    const url = new URL(config.authorizeUrl)
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: credentials.clientId,
      redirect_uri: callbackUrl(provider),
      scope: config.scopes.join(' '),
      state,
      code_challenge: sha256(codeVerifier),
      code_challenge_method: 'S256',
      ...config.authorizeParams,
    }).toString()
    return { url: url.toString(), state }
  }

  /**
   * Reads (and forgets) the flow of this `state`. Done before anything else in the callback, so
   * error redirects know which client to return to.
   */
  async takeFlow(
    provider: OAuthProvider,
    state: string | undefined,
  ): Promise<PendingFlow | null> {
    if (!state) return null
    const raw = await this.redis.getdel(stateKey(state))
    const flow = raw ? (JSON.parse(raw) as PendingFlow) : null
    return flow?.provider === provider ? flow : null
  }

  /** Finishes the flow: the signed-in user's id. */
  async complete(flow: PendingFlow, code: string): Promise<string> {
    let profile: ProviderProfile
    try {
      const accessToken = await this.exchangeCode(flow, code)
      profile = await PROVIDERS[flow.provider].profile(accessToken)
    } catch (error) {
      if (!(error instanceof ProviderError)) throw error
      this.logger.warn(`${flow.provider}: ${error.message}`)
      throw new OAuthError(OAuthErrorCode.ProviderError)
    }
    return this.userFor(flow.provider, profile)
  }

  /** New web session for the user (cookies set by the controller). */
  issueSession(userId: string, meta: ClientMeta): Promise<IssuedSession> {
    return this.auth.issueFor(userId, meta)
  }

  /** One-time code the mobile app redeems with its PKCE verifier (`redeem`). */
  async createExchangeCode(
    userId: string,
    codeChallenge: string,
  ): Promise<string> {
    const code = random()
    const pending: PendingExchange = { userId, codeChallenge }
    await this.redis.set(
      exchangeKey(code),
      JSON.stringify(pending),
      'EX',
      EXCHANGE_TTL_SECONDS,
    )
    return code
  }

  /** Mobile: the exchange code + the verifier of the challenge sent at start → a session. */
  async redeem(
    code: string,
    codeVerifier: string,
    meta: ClientMeta,
  ): Promise<IssuedSession | null> {
    const raw = await this.redis.getdel(exchangeKey(code))
    if (!raw) return null
    const pending = JSON.parse(raw) as PendingExchange
    if (sha256(codeVerifier) !== pending.codeChallenge) return null
    return this.auth.issueFor(pending.userId, meta)
  }

  private async exchangeCode(flow: PendingFlow, code: string) {
    const credentials = credentialsOf(flow.provider)
    if (!credentials) throw new ProviderError('provider disabled meanwhile')
    const res = await fetch(PROVIDERS[flow.provider].tokenUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl(flow.provider),
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        code_verifier: flow.codeVerifier,
      }),
    })
    // GitHub answers 200 with `{ error }` on failure
    const body = (await res.json().catch(() => ({}))) as {
      access_token?: string
      error?: string
    }
    if (!res.ok || !body.access_token)
      throw new ProviderError(
        `token endpoint answered ${res.status} ${body.error ?? ''}`.trim(),
      )
    return body.access_token
  }

  private async userFor(
    provider: OAuthProvider,
    profile: ProviderProfile,
  ): Promise<string> {
    const identity = await this.prisma.userIdentity.findUnique({
      where: { provider_subject: { provider, subject: profile.subject } },
      include: { user: { select: { id: true, disabledAt: true } } },
    })
    if (identity) {
      if (identity.user.disabledAt)
        throw new OAuthError(OAuthErrorCode.AccountDisabled)
      if (identity.email !== (profile.email ?? null))
        await this.prisma.userIdentity.update({
          where: { id: identity.id },
          data: { email: profile.email ?? null },
        })
      return identity.user.id
    }

    const identityData = {
      provider,
      subject: profile.subject,
      email: profile.email,
    }
    const existing = profile.email
      ? await this.prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, disabledAt: true },
        })
      : null
    if (existing) {
      // Linking by an email the provider does not vouch for would hand the account to whoever
      // typed that address at the provider
      if (!profile.emailVerified)
        throw new OAuthError(OAuthErrorCode.EmailNotVerified)
      if (existing.disabledAt)
        throw new OAuthError(OAuthErrorCode.AccountDisabled)
      await this.prisma.userIdentity.create({
        data: { ...identityData, userId: existing.id },
      })
      return existing.id
    }

    if (env.AUTH_REGISTRATION !== AuthRegistration.Open)
      throw new OAuthError(OAuthErrorCode.RegistrationClosed)
    try {
      const user = await this.prisma.user.create({
        data: {
          // An unverified email stays off the account (it would block its real owner)
          email: profile.emailVerified ? profile.email : null,
          name: profile.name,
          identities: { create: identityData },
        },
        select: { id: true },
      })
      return user.id
    } catch (error) {
      // The same provider account finishing two flows at once: the other one created it
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        return this.userFor(provider, profile)
      throw error
    }
  }
}

/** The redirect URI registered at the provider: `<PUBLIC_API_URL>/auth/oauth/<provider>/callback`. */
export const callbackUrl = (provider: OAuthProvider) =>
  `${env.PUBLIC_API_URL.replace(/\/+$/, '')}/auth/oauth/${slugOf(provider)}/callback`
