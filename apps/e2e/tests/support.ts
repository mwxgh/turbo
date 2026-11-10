/** Shared by playwright.config.ts and the tests. */
export const WEB_URL = process.env.E2E_WEB_URL ?? 'http://localhost:3000'
export const API_URL = process.env.E2E_API_URL ?? 'http://localhost:4000/api'
export const SOCKET_URL = process.env.E2E_SOCKET_URL ?? 'http://localhost:4001'

/** Cookies of the signed-in test user (written by auth.setup.ts). */
export const AUTH_FILE = '.auth/user.json'

/** Test account: E2E_USER / E2E_PASSWORD (remote targets), else registered on the fly. */
export const TEST_USER = {
  email: process.env.E2E_USER ?? 'e2e-user@example.com',
  password: process.env.E2E_PASSWORD ?? 'e2e password 123',
}
