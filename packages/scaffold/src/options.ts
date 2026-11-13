/**
 * What a generated project is made of. One value per axis, picked in this order: database,
 * backend, ORM, frontend, repository. The ORM depends on both the database and the backend's
 * language (`ormsFor(backend, database)`); `incompatibilities()` refuses every other pair.
 */
export interface ScaffoldOptions {
  /** npm-style name: lowercase letters, digits and dashes (folder name, package scope). */
  name: string
  /** Monorepo tool, or `single`: two independent projects (api/, web/). */
  repo: Repo
  backend: Backend
  database: Database
  /** Data access layer; `none` = the database's own driver, no ORM / ODM. */
  orm: Orm
  frontend: Frontend
}

export type Repo = 'turbo' | 'nx' | 'single'
export type Backend =
  'nest' | 'express' | 'fastify' | 'spring' | 'go' | 'fastapi'
export type Orm =
  // TypeScript
  | 'prisma'
  | 'drizzle'
  | 'typeorm'
  | 'mongoose'
  // Java
  | 'jpa'
  | 'mybatis'
  | 'spring-data-mongodb'
  // Go
  | 'gorm'
  | 'ent'
  // Python
  | 'sqlalchemy'
  | 'sqlmodel'
  | 'beanie'
  /** The database's official driver, any language. */
  | 'none'
/** A backend's language decides which ORMs exist for it. */
export type Language = 'typescript' | 'java' | 'go' | 'python'
export type Database = 'postgres' | 'mysql' | 'oracle' | 'mongodb'
export type Frontend = 'next' | 'react'

export interface Choice<T extends string> {
  value: T
  label: string
  description: string
  /** Not generated yet: listed so the roadmap is visible, never selectable. */
  planned?: boolean
}

export const REPOS: Choice<Repo>[] = [
  {
    value: 'turbo',
    label: 'Turborepo',
    description:
      'pnpm workspace + Turborepo: apps/api, apps/web, packages/types.',
  },
  {
    value: 'nx',
    label: 'Nx',
    description:
      'pnpm workspace + Nx (package-based, nx run-many): same folders.',
  },
  {
    value: 'single',
    label: 'No monorepo',
    description:
      'Two independent projects, api/ and web/, each installed on its own.',
  },
]

/** The monorepo tools (REPOS without `single`). */
export const MONOREPO_TOOLS = REPOS.filter((r) => r.value !== 'single')

/**
 * Why this backend cannot sit in a monorepo here (undefined: it can). The generated monorepo is a
 * pnpm workspace whose packages/types is shared by api and web: it only makes sense for a
 * TypeScript backend. (Nx itself can host Java, Go or Python through plugins; not generated here.)
 */
export const monorepoUnavailable = (backend: Backend): string | undefined =>
  LANGUAGE_OF[backend] === 'typescript'
    ? undefined
    : 'Needs a TypeScript backend (NestJS or Express)'

export const BACKENDS: Choice<Backend>[] = [
  {
    value: 'nest',
    label: 'NestJS',
    description: 'TypeScript, modules + dependency injection, decorators.',
  },
  {
    value: 'express',
    label: 'Express',
    description: 'Minimal TypeScript HTTP server: a router, no framework.',
  },
  {
    value: 'fastify',
    label: 'Fastify',
    description: 'Fast TypeScript HTTP server with schemas.',
    planned: true,
  },
  {
    value: 'spring',
    label: 'Spring Boot',
    description: 'Java 21, Spring Web.',
    planned: true,
  },
  {
    value: 'go',
    label: 'Go',
    description: 'Go, net/http with chi.',
    planned: true,
  },
  {
    value: 'fastapi',
    label: 'FastAPI',
    description: 'Python, async, Pydantic models.',
    planned: true,
  },
]

export const LANGUAGE_OF: Record<Backend, Language> = {
  nest: 'typescript',
  express: 'typescript',
  fastify: 'typescript',
  spring: 'java',
  go: 'go',
  fastapi: 'python',
}

export const ORMS: Choice<Orm>[] = [
  {
    value: 'prisma',
    label: 'Prisma',
    description: 'Schema file, generated client, migrations.',
  },
  {
    value: 'drizzle',
    label: 'Drizzle',
    description: 'SQL-first schema in TypeScript, drizzle-kit migrations.',
  },
  {
    value: 'typeorm',
    label: 'TypeORM',
    description: 'Decorated entities and repositories.',
  },
  {
    value: 'mongoose',
    label: 'Mongoose',
    description: 'MongoDB ODM: schemas, models and validation.',
  },
  {
    value: 'jpa',
    label: 'Spring Data JPA',
    description: 'Hibernate entities and repository interfaces.',
    planned: true,
  },
  {
    value: 'mybatis',
    label: 'MyBatis',
    description: 'SQL in mappers, mapped to Java objects.',
    planned: true,
  },
  {
    value: 'spring-data-mongodb',
    label: 'Spring Data MongoDB',
    description: 'Documents and repository interfaces.',
    planned: true,
  },
  {
    value: 'gorm',
    label: 'GORM',
    description: 'Structs as models, auto-migrate.',
    planned: true,
  },
  {
    value: 'ent',
    label: 'Ent',
    description: 'Schema as Go code, generated client.',
    planned: true,
  },
  {
    value: 'sqlalchemy',
    label: 'SQLAlchemy',
    description: 'Declarative models, Alembic migrations.',
    planned: true,
  },
  {
    value: 'sqlmodel',
    label: 'SQLModel',
    description: 'Pydantic + SQLAlchemy in one model.',
    planned: true,
  },
  {
    value: 'beanie',
    label: 'Beanie',
    description: 'Async MongoDB ODM on Pydantic.',
    planned: true,
  },
  {
    value: 'none',
    label: 'No ORM',
    description: "The database's official driver, queries written by hand.",
  },
]

/**
 * Which ORMs fit a language and a database, the first one being the default. SQL ORMs map tables,
 * so they are not offered for MongoDB, and document mappers only speak MongoDB. Not every ORM has
 * an Oracle driver: of the TypeScript ones only TypeORM does; none of the Go ones is offered.
 */
export const ORMS_BY_STACK: Record<
  Language,
  Record<Database, readonly Orm[]>
> = {
  typescript: {
    postgres: ['prisma', 'drizzle', 'typeorm'],
    mysql: ['prisma', 'drizzle', 'typeorm'],
    oracle: ['typeorm'],
    mongodb: ['mongoose', 'none'],
  },
  java: {
    postgres: ['jpa', 'mybatis'],
    mysql: ['jpa', 'mybatis'],
    oracle: ['jpa', 'mybatis'],
    mongodb: ['spring-data-mongodb'],
  },
  go: {
    postgres: ['gorm', 'ent'],
    mysql: ['gorm', 'ent'],
    oracle: [],
    mongodb: ['none'],
  },
  python: {
    postgres: ['sqlalchemy', 'sqlmodel'],
    mysql: ['sqlalchemy', 'sqlmodel'],
    oracle: ['sqlalchemy', 'sqlmodel'],
    mongodb: ['beanie'],
  },
}

/** The ORM ids for a backend and a database, in display order (planned ones included). */
export const ormIdsFor = (backend: Backend, database: Database) =>
  ORMS_BY_STACK[LANGUAGE_OF[backend]]?.[database] ?? []

/** The ORM choices for a backend and a database, in display order (planned ones included). */
export const ormsFor = (backend: Backend, database: Database): Choice<Orm>[] =>
  ormIdsFor(backend, database).map((value) =>
    ORMS.find((c) => c.value === value)!,
  )

/** The first ORM of a backend + database that can be generated today (the default to switch to). */
export const defaultOrm = (backend: Backend, database: Database) =>
  ormsFor(backend, database).find((c) => !c.planned)?.value

export const DATABASES: Choice<Database>[] = [
  {
    value: 'postgres',
    label: 'PostgreSQL',
    description: 'Relational, the default choice.',
  },
  { value: 'mysql', label: 'MySQL', description: 'Relational, MySQL 8.' },
  {
    value: 'oracle',
    label: 'Oracle',
    description: 'Relational, Oracle Database 23ai Free.',
  },
  {
    value: 'mongodb',
    label: 'MongoDB',
    description: 'Document database.',
  },
]

export const FRONTENDS: Choice<Frontend>[] = [
  {
    value: 'next',
    label: 'Next.js',
    description: 'React framework: App Router, server rendering.',
  },
  {
    value: 'react',
    label: 'React (Vite)',
    description: 'Single-page app built with Vite.',
  },
]

export const DEFAULT_OPTIONS: ScaffoldOptions = {
  name: 'my-app',
  repo: 'turbo',
  backend: 'nest',
  database: 'postgres',
  orm: 'prisma',
  frontend: 'next',
}

/** Why a combination cannot be generated (empty: it can). */
export function incompatibilities(options: ScaffoldOptions): string[] {
  const reasons: string[] = []
  if (!/^[a-z][a-z0-9-]{1,49}$/.test(options.name))
    reasons.push(
      'Name: 2–50 characters, lowercase letters, digits and dashes, starting with a letter.',
    )
  for (const [axis, list, value] of [
    ['Repository', REPOS, options.repo],
    ['Database', DATABASES, options.database],
    ['Backend', BACKENDS, options.backend],
    ['ORM', ORMS, options.orm],
    ['Frontend', FRONTENDS, options.frontend],
  ] as const) {
    const choice = (list as Choice<string>[]).find((c) => c.value === value)
    if (!choice) reasons.push(`${axis}: unknown value "${value}".`)
    else if (choice.planned)
      reasons.push(`${axis}: ${choice.label} is not available yet.`)
  }
  const label = (list: Choice<string>[], value: string) =>
    list.find((c) => c.value === value)?.label
  const db = label(DATABASES, options.database)
  const backend = label(BACKENDS, options.backend)
  const orm = label(ORMS, options.orm)
  const repo = label(REPOS, options.repo)
  if (
    repo &&
    backend &&
    options.repo !== 'single' &&
    monorepoUnavailable(options.backend)
  )
    reasons.push(
      `Repository: ${repo} needs a TypeScript backend (NestJS or Express). Pick No monorepo.`,
    )
  if (db && backend && orm) {
    const ids = ormIdsFor(options.backend, options.database)
    if (!ids.length)
      reasons.push(`Backend: ${backend} has no ORM for ${db} here.`)
    else if (!ids.includes(options.orm)) {
      const fits = ormsFor(options.backend, options.database)
        .map((c) => c.label)
        .join(' or ')
      // An ORM of another language does not fit the backend; one of the same language, the database
      const sameLanguage = Object.values(
        ORMS_BY_STACK[LANGUAGE_OF[options.backend]],
      ).some((list) => list.includes(options.orm))
      reasons.push(
        `ORM: ${orm} does not fit ${sameLanguage ? db : backend}. Pick ${fits}.`,
      )
    }
  }
  return reasons
}
