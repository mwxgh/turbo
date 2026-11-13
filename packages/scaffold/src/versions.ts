/**
 * Exact versions written into generated projects. Same as this repo's catalog where it has them
 * (pnpm-workspace.yaml), otherwise the newest release at least 14 days old when added. Bump
 * together and re-run `pnpm --filter @repo/scaffold verify`.
 */
export const V = {
  node: '24',
  pnpm: '11.25.0',
  turbo: '2.11.9',
  nx: '24.0.3',
  typescript: '6.0.3',
  typesNode: '26.4.1',

  nestCommon: '12.3.2',
  nestCore: '12.3.2',
  nestPlatformExpress: '12.3.2',
  nestCli: '12.0.9',
  swcCli: '0.8.1',
  swcCore: '1.16.18',
  classTransformer: '0.5.1',
  classValidator: '0.15.1',
  reflectMetadata: '0.2.2',
  rxjs: '7.8.2',

  express: '5.3.0',
  typesExpress: '5.0.6',
  cors: '2.8.6',
  typesCors: '2.8.19',
  tsx: '4.23.15',

  prisma: '7.10.1',
  dotenv: '18.0.8',
  drizzleOrm: '0.45.4',
  drizzleKit: '0.31.11',
  typeorm: '1.1.2',
  pg: '8.23.1',
  typesPg: '8.23.1',
  mysql2: '3.24.6',
  // thin mode: no Oracle Instant Client needed
  oracledb: '7.0.1',
  mongodb: '7.7.0',
  // mongoose 9.11 pins mongodb ~7.7, same driver as the no-ORM layer
  mongoose: '9.11.4',

  // Monorepo setup (repo turbo / nx): the same tooling as this repository
  eslint: '10.9.1',
  eslintJs: '10.0.1',
  typescriptEslint: '8.72.0',
  eslintConfigPrettier: '10.1.8',
  eslintPluginOnlyWarn: '1.2.1',
  eslintPluginReactHooks: '7.1.1',
  eslintPluginTurbo: '2.11.9',
  nextEslintPlugin: '16.4.1',
  globals: '17.12.0',
  prettier: '3.9.6',
  prettierSortImports: '6.0.2',
  prettierSortJson: '4.2.0',
  husky: '9.1.7',
  lintStaged: '17.6.0',
  commitlint: '21.2.4',
  nestSwagger: '12.0.2',
  nestThrottler: '6.7.1',
  nestjsPino: '5.3.1',
  pino: '10.4.0',
  pinoHttp: '11.0.0',
  pinoPretty: '13.2.0',
  helmet: '8.3.0',
  expressRateLimit: '8.7.2',
  swaggerUiExpress: '5.0.1',
  typesSwaggerUiExpress: '4.1.8',

  react: '19.3.0',
  typesReact: '19.3.0',
  next: '16.4.1',
  vite: '8.3.5',
  vitePluginReact: '6.1.2',
} as const
