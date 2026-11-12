/** One shape of a provider logo: SVG path data on a 24×24 view box. */
export interface ProviderIconPath {
  d: string
  /** Brand colour, or `currentColor` (follows the text colour, e.g. GitHub in dark mode). */
  fill: string
}

export interface SignInProvider {
  /** As in `/auth/oauth/:provider` and `GET /auth/methods`. */
  id: string
  label: string
  icon: ProviderIconPath[]
}

/** Sign-in providers the api may enable, in button order (web and mobile render the same list). */
export const SIGN_IN_PROVIDERS: SignInProvider[] = [
  {
    id: 'google',
    label: 'Google',
    // Four-colour "G" for sign-in buttons; check against Google's branding guidelines before release
    icon: [
      {
        fill: '#4285F4',
        d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z',
      },
      {
        fill: '#34A853',
        d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z',
      },
      {
        fill: '#FBBC05',
        d: 'M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84Z',
      },
      {
        fill: '#EA4335',
        d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z',
      },
    ],
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: [
      {
        // simple-icons 16.36.0 (CC0), Meta brand blue
        fill: '#0866FF',
        d: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
      },
    ],
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: [
      {
        // simple-icons 16.36.0 (CC0); follows the text colour (black / white mark)
        fill: 'currentColor',
        d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
      },
    ],
  },
]

/** Providers to show: the api's enabled list, in `SIGN_IN_PROVIDERS` order. */
export const enabledSignInProviders = (enabled: readonly string[]) =>
  SIGN_IN_PROVIDERS.filter((provider) => enabled.includes(provider.id))

/** Text for `?error=<code>` of a provider sign-in that did not complete (api `OAuthErrorCode`). */
export function oauthErrorMessage(code: string): string {
  switch (code) {
    case 'cancelled':
      return 'Sign-in was cancelled.'
    case 'invalid_state':
      return 'The sign-in link expired or was opened in another browser. Please try again.'
    case 'email_not_verified':
      return 'An account with this email already exists. Sign in with your password, or verify the email with the provider first.'
    case 'registration_closed':
      return 'No account is linked to this sign-in, and new sign-ups are closed.'
    case 'account_disabled':
      return 'This account is disabled.'
    default:
      return 'Could not sign in with this provider. Please try again.'
  }
}
