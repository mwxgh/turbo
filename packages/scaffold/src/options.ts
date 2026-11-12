/** What a generated project is made of. One value per axis; `incompatibilities()` rules out pairs. */
export interface ScaffoldOptions {
  /** npm-style name: lowercase letters, digits and dashes (folder name, package scope). */
  name: string
  backend: Backend
  orm: Orm
  database: Database
  frontend: Frontend
}

export type Backend =
  'nest' | 'express' | 'fastify' | 'spring' | 'go' | 'fastapi'
export type Orm = 'prisma' | 'drizzle' | 'typeorm'
export type Database = 'postgres' | 'mysql' | 'mongodb'
export type Frontend = 'next' | 'react'

export interface Choice<T extends string> {
  value: T
  label: string
  description: string
  /** Not generated yet: listed so the roadmap is visible, never selectable. */
  planned?: boolean
}

export const BACKENDS: Choice<Backend>[] = [
  {
    value: 'nest',
    label: 'NestJS',
    description: 'TypeScript, modules + dependency injection, decorators.',
  },
  {
    value: 'express',
    label: 'Express',
    description: 'Minimal TypeScript HTTP server.',
    planned: true,
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
    description: 'Java, Spring Data JPA.',
    planned: true,
  },
  {
    value: 'go',
    label: 'Go',
    description: 'Go with GORM.',
    planned: true,
  },
  {
    value: 'fastapi',
    label: 'FastAPI',
    description: 'Python with SQLAlchemy.',
    planned: true,
  },
]

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
]

export const DATABASES: Choice<Database>[] = [
  {
    value: 'postgres',
    label: 'PostgreSQL',
    description: 'Relational, the default choice.',
  },
  { value: 'mysql', label: 'MySQL', description: 'Relational, MySQL 8.' },
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
  backend: 'nest',
  orm: 'prisma',
  database: 'postgres',
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
    ['Backend', BACKENDS, options.backend],
    ['ORM', ORMS, options.orm],
    ['Database', DATABASES, options.database],
    ['Frontend', FRONTENDS, options.frontend],
  ] as const) {
    const choice = (list as Choice<string>[]).find((c) => c.value === value)
    if (!choice) reasons.push(`${axis}: unknown value "${value}".`)
    else if (choice.planned)
      reasons.push(`${axis}: ${choice.label} is not available yet.`)
  }
  for (const rule of RULES) if (rule.when(options)) reasons.push(rule.reason)
  return reasons
}

interface Rule {
  when: (o: ScaffoldOptions) => boolean
  reason: string
}

/** Pairs that do not work together (filled in from the verification runs, scripts/verify.ts). */
const RULES: Rule[] = [
  {
    when: (o) => o.orm === 'drizzle' && o.database === 'mongodb',
    reason:
      'Drizzle supports SQL databases only: pick PostgreSQL or MySQL, or another ORM.',
  },
]
