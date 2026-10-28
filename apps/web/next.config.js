/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server for the Docker image (deploy/web.Dockerfile sets
  // NEXT_OUTPUT=standalone); `next start` keeps working everywhere else.
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
  // @repo/ui and @repo/types ship TypeScript source (no build step)
  transpilePackages: ['@repo/ui', '@repo/types'],
  // Type errors are caught by `check-types`, which turbo runs before every build
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
