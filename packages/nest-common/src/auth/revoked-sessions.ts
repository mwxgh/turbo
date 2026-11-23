/** The Redis commands `RevokedSessions` needs (an ioredis client fits). */
export interface RevocationStore {
  exists(key: string): Promise<number>
  set(key: string, value: string, mode: 'EX', seconds: number): Promise<unknown>
}

const key = (sessionId: string) => `auth:revoked-session:${sessionId}`

/**
 * Access JWTs are stateless: without this list a signed-out session keeps working until its
 * access token expires. Each entry lives as long as the longest access token of that session
 * could, so the list never grows past the sessions ended in the last `accessTtlSeconds`.
 */
export class RevokedSessions {
  constructor(
    private readonly store: RevocationStore,
    private readonly accessTtlSeconds: number,
  ) {}

  async revoke(...sessionIds: string[]): Promise<void> {
    await Promise.all(
      sessionIds.map((id) =>
        this.store.set(key(id), '1', 'EX', this.accessTtlSeconds),
      ),
    )
  }

  /** Throws when the store is unreachable: callers fail closed. */
  async isRevoked(sessionId: string): Promise<boolean> {
    return (await this.store.exists(key(sessionId))) > 0
  }
}
