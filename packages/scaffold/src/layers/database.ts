import type { Database, ScaffoldOptions } from '../options.js'

export interface DatabaseProfile {
  label: string
  image: string
  port: number
  /** Connection string for local development (docker-compose.yml). */
  url: (name: string, port?: number) => string
  /** docker-compose service body (indented 4 spaces, below `db:`). */
  compose: (name: string) => string
  /** SQL run once when the volume is created (mounted into /docker-entrypoint-initdb.d). */
  init?: { path: string; content: string }
}

/** Where the init file is mounted in the container (docker-compose and scripts/verify.ts). */
export const DB_INIT_MOUNT = '/docker-entrypoint-initdb.d/init.sql'

const ident = (name: string) => name.replace(/-/g, '_')

export const DATABASE_PROFILES: Record<Database, DatabaseProfile> = {
  postgres: {
    label: 'PostgreSQL',
    image: 'postgres:18-alpine',
    port: 5432,
    url: (name, port = 5432) =>
      `postgresql://app:app@localhost:${port}/${ident(name)}`,
    compose: (name) =>
      [
        '    image: postgres:18-alpine',
        '    environment:',
        '      POSTGRES_USER: app',
        '      POSTGRES_PASSWORD: app',
        `      POSTGRES_DB: ${ident(name)}`,
        '    ports:',
        "      - '127.0.0.1:5432:5432'",
        '    volumes:',
        '      - db-data:/var/lib/postgresql',
        '    healthcheck:',
        `      test: ['CMD-SHELL', 'pg_isready -U app -d ${ident(name)}']`,
        '      interval: 3s',
        '      retries: 20',
      ].join('\n'),
  },
  mysql: {
    label: 'MySQL',
    image: 'mysql:8.4',
    port: 3306,
    url: (name, port = 3306) =>
      `mysql://app:app@localhost:${port}/${ident(name)}`,
    compose: (name) =>
      [
        '    image: mysql:8.4',
        '    environment:',
        '      MYSQL_USER: app',
        '      MYSQL_PASSWORD: app',
        `      MYSQL_DATABASE: ${ident(name)}`,
        '      MYSQL_ROOT_PASSWORD: root',
        '    ports:',
        "      - '127.0.0.1:3306:3306'",
        '    volumes:',
        '      - db-data:/var/lib/mysql',
        `      - ./docker/mysql-init.sql:${DB_INIT_MOUNT}:ro`,
        '    healthcheck:',
        "      test: ['CMD', 'mysqladmin', 'ping', '-h', '127.0.0.1', '-uapp', '-papp']",
        '      interval: 3s',
        '      retries: 30',
      ].join('\n'),
    init: {
      path: 'docker/mysql-init.sql',
      content: [
        '-- Local development only. `prisma migrate dev` creates and drops a temporary',
        '-- "shadow" database, so the app user needs rights beyond its own database.',
        "GRANT ALL PRIVILEGES ON *.* TO 'app'@'%';",
        'FLUSH PRIVILEGES;',
        '',
      ].join('\n'),
    },
  },
  oracle: {
    label: 'Oracle',
    image: 'gvenzl/oracle-free:23-slim',
    port: 1521,
    // Oracle Free has one pluggable database, FREEPDB1; the tables live in the app user's schema
    url: (_name, port = 1521) => `oracle://app:app@localhost:${port}/FREEPDB1`,
    compose: () =>
      [
        '    image: gvenzl/oracle-free:23-slim',
        '    environment:',
        '      ORACLE_PASSWORD: oracle',
        '      APP_USER: app',
        '      APP_USER_PASSWORD: app',
        '    ports:',
        "      - '127.0.0.1:1521:1521'",
        '    volumes:',
        '      - db-data:/opt/oracle/oradata',
        '    healthcheck:',
        "      test: ['CMD', 'healthcheck.sh']",
        '      interval: 5s',
        '      start_period: 30s',
        '      retries: 60',
      ].join('\n'),
  },
  mongodb: {
    label: 'MongoDB',
    image: 'mongo:8',
    port: 27017,
    url: (name, port = 27017) =>
      `mongodb://localhost:${port}/${ident(name)}?directConnection=true`,
    compose: () =>
      [
        '    image: mongo:8',
        '    ports:',
        "      - '127.0.0.1:27017:27017'",
        '    volumes:',
        '      - db-data:/data/db',
        '    healthcheck:',
        "      test: ['CMD', 'mongosh', '--quiet', '--eval', 'db.runCommand({ ping: 1 })']",
        '      interval: 3s',
        '      retries: 20',
      ].join('\n'),
  },
}

export const dockerCompose = (o: ScaffoldOptions) =>
  [
    `# Local ${DATABASE_PROFILES[o.database].label} for development: pnpm db:up`,
    'services:',
    '  db:',
    DATABASE_PROFILES[o.database].compose(o.name),
    '',
    'volumes:',
    '  db-data:',
    '',
  ].join('\n')
