import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'

import type { CookieOptions, Request, Response } from 'express'

import { parseCookies } from '@repo/auth'
import { type AuthUser, CurrentUser, Public } from '@repo/auth/nest'
import {
  AUTH_COOKIE,
  AUTH_TRANSPORT_HEADER,
  AUTH_TRANSPORT_TOKEN,
} from '@repo/utils'

import { env } from '../env'
import {
  AuthService,
  type ClientMeta,
  type IssuedSession,
} from './auth.service'
import { AuthResponseDto, UserDto } from './dto/auth-response.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { RegisterDto } from './dto/register.dto'

/** Brute-force guard for credential endpoints (per IP), instead of the default limit. */
const CREDENTIALS_LIMIT = {
  default: { limit: env.AUTH_RATE_LIMIT, ttl: 60_000 },
}

/**
 * Browsers: tokens in httpOnly cookies (SameSite=Lax, path `/` so the web server's proxy can
 * refresh too). Native clients: `x-auth-transport: token` → tokens in the body, sent back as
 * `Authorization: Bearer` and `{ refreshToken }`.
 */
@ApiTags('auth')
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Throttle(CREDENTIALS_LIMIT)
  @Post('register')
  @ApiCreatedResponse({ type: AuthResponseDto })
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.send(req, res, await this.auth.register(dto, meta(req)))
  }

  @Public()
  @Throttle(CREDENTIALS_LIMIT)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.send(req, res, await this.auth.login(dto, meta(req)))
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async refresh(
    @Body() dto: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const session = await this.auth.refresh(
        refreshTokenOf(req, dto),
        meta(req),
      )
      return this.send(req, res, session)
    } catch (error) {
      if (error instanceof UnauthorizedException) this.clearCookies(res)
      throw error
    }
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async logout(
    @Body() dto: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.auth.logout(refreshTokenOf(req, dto))
    this.clearCookies(res)
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  me(@CurrentUser() user: AuthUser) {
    return this.auth.me(user)
  }

  @Post('password')
  @Throttle(CREDENTIALS_LIMIT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  changePassword(
    @CurrentUser() user: AuthUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.auth.changePassword(user, dto)
  }

  /** Body shape: `AuthResponse` from @repo/types (dates become ISO strings in JSON). */
  private send(req: Request, res: Response, session: IssuedSession) {
    const { user, accessToken, refreshToken, expiresIn } = session
    if (req.get(AUTH_TRANSPORT_HEADER) === AUTH_TRANSPORT_TOKEN)
      return { user, expiresIn, accessToken, refreshToken }
    res.cookie(AUTH_COOKIE.Access, accessToken, {
      ...cookieOptions(),
      maxAge: expiresIn * 1000,
    })
    res.cookie(AUTH_COOKIE.Refresh, refreshToken, {
      ...cookieOptions(),
      maxAge: env.REFRESH_TOKEN_TTL_DAYS * 86_400_000,
    })
    return { user, expiresIn }
  }

  private clearCookies(res: Response) {
    res.clearCookie(AUTH_COOKIE.Access, cookieOptions())
    res.clearCookie(AUTH_COOKIE.Refresh, cookieOptions())
  }
}

function cookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.cookieSecure,
    domain: env.COOKIE_DOMAIN || undefined,
    path: '/',
  }
}

const meta = (req: Request): ClientMeta => ({
  ip: req.ip,
  userAgent: req.get('user-agent'),
})

const refreshTokenOf = (req: Request, dto: RefreshDto) =>
  dto.refreshToken ?? parseCookies(req.headers.cookie)[AUTH_COOKIE.Refresh]
