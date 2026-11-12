/**
 * Exact versions written into generated projects. Same as this repo's catalog where it has them
 * (pnpm-workspace.yaml), otherwise the newest release at least 14 days old when added. Bump
 * together and re-run `pnpm --filter @repo/scaffold verify`.
 */
export const V = {
  node: '24',
  pnpm: '11.25.0',
  turbo: '2.11.9',
  typescript: '6.0.3',
  typesNode: '26.4.1',

  nestCommon: '12.3.2',
  nestCore: '12.3.2',
  nestPlatformExpress: '12.3.2',
  nestCli: '12.0.9',
  nestTypeorm: '12.0.2',
  swcCli: '0.8.1',
  swcCore: '1.16.18',
  classTransformer: '0.5.1',
  classValidator: '0.15.1',
  reflectMetadata: '0.2.2',
  rxjs: '7.8.2',

  prisma: '7.10.1',
  dotenv: '18.0.8',
  drizzleOrm: '0.45.4',
  drizzleKit: '0.31.11',
  typeorm: '1.1.2',
  pg: '8.23.1',
  typesPg: '8.23.1',
  mysql2: '3.24.6',
  mongodb: '7.7.0',

  react: '19.3.0',
  typesReact: '19.3.0',
  next: '16.4.1',
  vite: '8.3.5',
  vitePluginReact: '6.1.2',
} as const
