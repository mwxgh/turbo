import { AppEnv } from '../env/app-env.js'

/** Cookies the api sets for browsers (httpOnly): short-lived access JWT, rotating refresh token. */
export interface AuthCookieNames {
  access: string
  refresh: string
}

/**
 * Cookie names per environment. prod keeps the plain names; every other env gets a prefix
 * (`stg_access_token`), because prod cookies are set on the parent domain
 * (`COOKIE_DOMAIN=example.com`) and browsers also send them to `*.stg.example.com`:
 * same names would mix sessions (and hand prod tokens to stg).
 */
export function authCookieNames(appEnv: AppEnv): AuthCookieNames {
  const prefix = appEnv === AppEnv.Prod ? '' : `${appEnv}_`
  return { access: `${prefix}access_token`, refresh: `${prefix}refresh_token` }
}

/**
 * Native clients (mobile) send `x-auth-transport: token` to get the tokens in the response body
 * (and send them back as `Authorization: Bearer` / `{ refreshToken }`); browsers use the cookies.
 */
export const AUTH_TRANSPORT_HEADER = 'x-auth-transport'
export const AUTH_TRANSPORT_TOKEN = 'token'
