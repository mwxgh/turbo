import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  ApiFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import type { CookieOptions, Request, Response } from 'express'

import { parseCookies } from '@repo/auth'
import { Public } from '@repo/auth/nest'
import type { OAuthProvider } from '@repo/db'

import { AuthResponseDto } from '../auth/dto/auth-response.dto'
import { clientMeta, setSessionCookies } from '../auth/session-http'
import { AuthRegistration, env } from '../env'
import {
  AuthMethodsDto,
  OAuthClientKind,
  OAuthExchangeDto,
  OAuthStartQueryDto,
} from './dto/oauth.dto'
import { providerFromSlug, slugOf } from './oauth.providers'
import {
  type OAuthClient,
  OAuthError,
  OAuthErrorCode,
  OAuthService,
} from './oauth.service'

/** Binds a flow to the browser that started it (login CSRF): host-only, cleared at the callback. */
const STATE_COOKIE = 'oauth_state'

const stateCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: 'lax', // sent on the provider's top-level redirect back
  secure: env.cookieSecure,
  path: '/',
})

/** Only same-site paths (`/x`, never `//evil.com` or `https://…`): no open redirect. */
const safePath = (next: unknown) =>
  typeof next === 'string' && /^\/(?![/\\])/.test(next) ? next : '/'

/** A query value the provider sent once (repeated keys arrive as arrays). */
const single = (value: unknown) =>
  typeof value === 'string' && value.length <= 2048 ? value : undefined

/**
 * Sign-in with Google / Facebook / GitHub. Web: the login page links to `GET /auth/oauth/:provider`;
 * the callback sets the session cookies and redirects to `WEB_URL` + `next`. Mobile: the app opens
 * the same URL with `client=mobile` in the system browser; the callback redirects to the app with a
 * one-time code that `POST /auth/oauth/exchange` turns into tokens (with the app's PKCE verifier).
 * Errors come back as `?error=<OAuthErrorCode>`.
 */
@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Public()
@Controller('auth')
export class OAuthController {
  constructor(private readonly oauth: OAuthService) {}

  @Get('methods')
  @ApiOkResponse({ type: AuthMethodsDto })
  methods(): AuthMethodsDto {
    return {
      providers: this.oauth.enabledProviders().map(slugOf),
      registration: env.AUTH_REGISTRATION === AuthRegistration.Open,
    }
  }

  @Get('oauth/:provider')
  @ApiFoundResponse({ description: 'Redirect to the provider' })
  async start(
    @Param('provider') slug: string,
    @Query() query: OAuthStartQueryDto,
    @Res() res: Response,
  ) {
    const provider = this.enabledProvider(slug)
    const { url, state } = await this.oauth.start(provider, clientOf(query))
    res.cookie(STATE_COOKIE, state, {
      ...stateCookieOptions(),
      maxAge: 600_000,
    })
    res.redirect(HttpStatus.FOUND, url)
  }

  @Get('oauth/:provider/callback')
  @ApiQuery({ name: 'code', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'error', required: false })
  @ApiFoundResponse({ description: 'Redirect to the web app or mobile app' })
  async callback(
    @Param('provider') slug: string,
    // Single params, not a DTO: providers add their own (`scope`, `authuser`…), which the global
    // ValidationPipe (forbidNonWhitelisted) would reject
    @Query('code') rawCode: unknown,
    @Query('state') rawState: unknown,
    @Query('error') rawError: unknown,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const provider = providerFromSlug(slug)
    const state = single(rawState)
    const boundState = parseCookies(req.headers.cookie)[STATE_COOKIE]
    res.clearCookie(STATE_COOKIE, stateCookieOptions())

    const flow = provider ? await this.oauth.takeFlow(provider, state) : null
    if (!flow)
      return res.redirect(
        HttpStatus.FOUND,
        errorUrl({ kind: 'web', next: '/' }, OAuthErrorCode.InvalidState),
      )
    const fail = (code: OAuthErrorCode) =>
      res.redirect(HttpStatus.FOUND, errorUrl(flow.client, code))

    if (boundState !== state) return fail(OAuthErrorCode.InvalidState)
    const code = single(rawCode)
    if (!code)
      return fail(
        single(rawError) === 'access_denied'
          ? OAuthErrorCode.Cancelled
          : OAuthErrorCode.ProviderError,
      )

    let userId: string
    try {
      userId = await this.oauth.complete(flow, code)
    } catch (error) {
      if (error instanceof OAuthError) return fail(error.code)
      throw error
    }

    if (flow.client.kind === 'mobile') {
      const url = new URL(flow.client.redirectUri)
      url.searchParams.set(
        'code',
        await this.oauth.createExchangeCode(userId, flow.client.codeChallenge),
      )
      return res.redirect(HttpStatus.FOUND, url.toString())
    }
    setSessionCookies(
      res,
      await this.oauth.issueSession(userId, clientMeta(req)),
    )
    res.redirect(HttpStatus.FOUND, webUrl(flow.client.next))
  }

  /** Mobile: one-time code + PKCE verifier → tokens in the body (like `x-auth-transport: token`). */
  @Post('oauth/exchange')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async exchange(@Body() dto: OAuthExchangeDto, @Req() req: Request) {
    const session = await this.oauth.redeem(
      dto.code,
      dto.codeVerifier,
      clientMeta(req),
    )
    if (!session) throw new UnauthorizedException()
    const { user, expiresIn, accessToken, refreshToken } = session
    return { user, expiresIn, accessToken, refreshToken }
  }

  private enabledProvider(slug: string): OAuthProvider {
    const provider = providerFromSlug(slug)
    if (!provider || !this.oauth.isEnabled(provider))
      throw new NotFoundException('Unknown or disabled sign-in provider')
    return provider
  }
}

function clientOf(query: OAuthStartQueryDto): OAuthClient {
  if (query.client !== OAuthClientKind.Mobile)
    return { kind: 'web', next: safePath(query.next) }
  if (
    !query.redirectUri ||
    !env.oauthMobileRedirectUris.includes(query.redirectUri)
  )
    throw new BadRequestException('redirectUri is not an allowed app URL')
  if (!query.codeChallenge)
    throw new BadRequestException('codeChallenge is required for mobile')
  return {
    kind: 'mobile',
    redirectUri: query.redirectUri,
    codeChallenge: query.codeChallenge,
  }
}

const webUrl = (path: string) =>
  new URL(path, env.WEB_URL.replace(/\/+$/, '') + '/').toString()

function errorUrl(client: OAuthClient, code: OAuthErrorCode): string {
  if (client.kind === 'mobile') {
    const url = new URL(client.redirectUri)
    url.searchParams.set('error', code)
    return url.toString()
  }
  const url = new URL(webUrl('/login'))
  url.searchParams.set('error', code)
  if (client.next !== '/') url.searchParams.set('next', client.next)
  return url.toString()
}
