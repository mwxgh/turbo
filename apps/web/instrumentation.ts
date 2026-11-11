/** Runs once when the server starts (Next.js instrumentation hook). */
export async function register() {
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- set by Next.js at runtime, not a build input
  if (process.env.NEXT_RUNTIME === 'nodejs') await import('@/lib/api-server')
}
