import { randomUUID } from 'node:crypto'

import { AccessTokens } from '@repo/auth'

/** Same secret as vitest.e2e.config.ts (and apps/api/test/auth-env.ts). */
export const TEST_JWT_SECRET = 'test-jwt-secret-at-least-32-characters-long'

/** Access token as the api would issue it. */
export function testToken(): Promise<string> {
  return new AccessTokens(TEST_JWT_SECRET, 60).sign({
    id: randomUUID(),
    sessionId: randomUUID(),
    role: 'USER',
  })
}
