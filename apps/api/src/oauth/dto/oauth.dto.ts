import { ApiProperty } from '@nestjs/swagger'

import { EnumField, StringField } from '@repo/nest-common'

export const OAuthClientKind = { Web: 'web', Mobile: 'mobile' } as const
export type OAuthClientKind =
  (typeof OAuthClientKind)[keyof typeof OAuthClientKind]

/** `GET /auth/oauth/:provider` – opened as a page (web) or in the system browser (mobile). */
export class OAuthStartQueryDto {
  /** Web: same-site path to land on afterwards (default `/`). */
  @StringField({ optional: true, maxLength: 2048 })
  next?: string

  @EnumField(OAuthClientKind, { optional: true })
  client?: OAuthClientKind

  /** Mobile: app URL to return to; must be listed in `OAUTH_MOBILE_REDIRECT_URIS`. */
  @StringField({ optional: true, maxLength: 512 })
  redirectUri?: string

  /** Mobile: base64url SHA-256 of the app's verifier (PKCE between app and api). */
  @StringField({ optional: true, pattern: /^[A-Za-z0-9_-]{43}$/ })
  codeChallenge?: string
}

/** Mobile: redeems the one-time code from the app redirect. */
export class OAuthExchangeDto {
  @StringField({ maxLength: 100 })
  code: string

  @StringField({ minLength: 43, maxLength: 128 })
  codeVerifier: string
}

/** How clients may sign in (drives the sign-in screen). */
export class AuthMethodsDto {
  @ApiProperty({
    type: [String],
    example: ['google', 'github'],
    description: 'Enabled providers, as used in `/auth/oauth/:provider`',
  })
  providers: string[]

  @ApiProperty({ description: '`POST /auth/register` is open' })
  registration: boolean
}
