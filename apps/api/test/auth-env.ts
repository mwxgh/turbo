/** Auth config for tests: a fixed secret (also used by the socket tests) and open registration. */
export const TEST_JWT_SECRET = 'test-jwt-secret-at-least-32-characters-long'

export const testAuthEnv = {
  JWT_SECRET: TEST_JWT_SECRET,
  AUTH_REGISTRATION: 'open',
  // Every request comes from one IP
  AUTH_RATE_LIMIT: '100000',
}
