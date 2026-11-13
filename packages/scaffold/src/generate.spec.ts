import { describe, expect, it } from 'vitest'

import { ScaffoldError, generate, supportedCombinations } from './generate.js'
import {
  DEFAULT_OPTIONS,
  ORMS_BY_STACK,
  incompatibilities,
  monorepoUnavailable,
  ormsFor,
} from './options.js'

describe('generate', () => {
  it('builds a turbo monorepo with api, web and shared types', () => {
    const tree = generate(DEFAULT_OPTIONS)
    for (const path of [
      'package.json',
      'pnpm-workspace.yaml',
      'turbo.json',
      'docker-compose.yml',
      'README.md',
      'packages/types/src/index.ts',
      'apps/api/src/main.ts',
      'apps/api/prisma/schema.prisma',
      'apps/web/app/page.tsx',
    ])
      expect(tree).toHaveProperty([path])
    expect(JSON.parse(tree['package.json']!).name).toBe('my-app')
  })

  it('wires the chosen ORM, database and frontend', () => {
    const tree = generate({
      ...DEFAULT_OPTIONS,
      orm: 'drizzle',
      database: 'mysql',
      frontend: 'react',
    })
    expect(tree['apps/api/src/db/schema.ts']).toContain('mysqlTable')
    expect(
      JSON.parse(tree['apps/api/package.json']!).dependencies,
    ).toMatchObject({
      'drizzle-orm': expect.any(String),
      mysql2: expect.any(String),
    })
    expect(tree['docker-compose.yml']).toContain('mysql:8.4')
    // prisma migrate dev needs a shadow database: the app user may create databases locally
    expect(tree['docker-compose.yml']).toContain('./docker/mysql-init.sql:')
    expect(tree['docker/mysql-init.sql']).toContain(
      "GRANT ALL PRIVILEGES ON *.* TO 'app'@'%'",
    )
    expect(tree['apps/web/vite.config.ts']).toBeDefined()
    expect(tree).not.toHaveProperty(['apps/api/prisma/schema.prisma'])
  })

  it('lists folders before files, like a file explorer', () => {
    const paths = Object.keys(generate(DEFAULT_OPTIONS))
    expect(paths.indexOf('apps/api/src/main.ts')).toBeLessThan(
      paths.indexOf('package.json'),
    )
  })

  it('refuses invalid names, planned stacks and impossible pairs, with the reasons', () => {
    expect(() => generate({ ...DEFAULT_OPTIONS, name: 'My App' })).toThrow(
      ScaffoldError,
    )
    expect(
      incompatibilities({ ...DEFAULT_OPTIONS, backend: 'spring' }),
    ).toEqual([
      'Backend: Spring Boot is not available yet.',
      'Repository: Turborepo needs a TypeScript backend (NestJS or Express). Pick No monorepo.',
      'ORM: Prisma does not fit Spring Boot. Pick Spring Data JPA or MyBatis.',
    ])
  })

  it('offers the ORMs of the chosen database only', () => {
    expect(ormsFor('nest', 'postgres').map((c) => c.value)).toEqual([
      'prisma',
      'drizzle',
      'typeorm',
    ])
    expect(ormsFor('express', 'mongodb').map((c) => c.value)).toEqual([
      'mongoose',
      'none',
    ])
    for (const orm of ['prisma', 'drizzle', 'typeorm'] as const)
      expect(
        incompatibilities({ ...DEFAULT_OPTIONS, database: 'mongodb', orm }),
      ).toEqual([
        expect.stringMatching(
          /does not fit MongoDB\. Pick Mongoose or No ORM\./,
        ),
      ])
    for (const orm of ['mongoose', 'none'] as const)
      expect(
        incompatibilities({ ...DEFAULT_OPTIONS, database: 'postgres', orm }),
      ).toHaveLength(1)
  })

  it('picks the ORMs from the backend language and the database', () => {
    expect(ormsFor('spring', 'postgres').map((c) => c.value)).toEqual([
      'jpa',
      'mybatis',
    ])
    expect(ormsFor('fastapi', 'mongodb').map((c) => c.value)).toEqual([
      'beanie',
    ])
    expect(ormsFor('go', 'oracle')).toEqual([])
    // An ORM of another language does not fit the backend
    expect(incompatibilities({ ...DEFAULT_OPTIONS, orm: 'jpa' })).toContain(
      'ORM: Spring Data JPA does not fit NestJS. Pick Prisma or Drizzle or TypeORM.',
    )
    // Planned backends and ORMs are listed but refused
    expect(
      incompatibilities({ ...DEFAULT_OPTIONS, backend: 'spring', orm: 'jpa' }),
    ).toEqual([
      'Backend: Spring Boot is not available yet.',
      'ORM: Spring Data JPA is not available yet.',
      'Repository: Turborepo needs a TypeScript backend (NestJS or Express). Pick No monorepo.',
    ])
  })

  it('offers TypeORM only for Oracle and wires the oracledb driver', () => {
    expect(ormsFor('nest', 'oracle').map((c) => c.value)).toEqual(['typeorm'])
    expect(
      incompatibilities({
        ...DEFAULT_OPTIONS,
        database: 'oracle',
        orm: 'prisma',
      }),
    ).toEqual(['ORM: Prisma does not fit Oracle. Pick TypeORM.'])

    const tree = generate({
      ...DEFAULT_OPTIONS,
      database: 'oracle',
      orm: 'typeorm',
    })
    expect(
      JSON.parse(tree['apps/api/package.json']!).dependencies,
    ).toHaveProperty('oracledb')
    expect(tree['apps/api/src/database/database.ts']).toContain(
      '...oracleConnection(url)',
    )
    // Oracle has no boolean / varchar types in TypeORM's driver
    expect(tree['apps/api/src/database/todo.entity.ts']).toContain(
      'type: Boolean',
    )
    expect(tree['apps/api/src/database/todo.entity.ts']).toContain("'varchar2'")
    expect(tree['docker-compose.yml']).toContain('gvenzl/oracle-free')
  })

  it('wires Mongoose or the plain driver for MongoDB, without migrations', () => {
    const mongoose = generate({
      ...DEFAULT_OPTIONS,
      database: 'mongodb',
      orm: 'mongoose',
    })
    expect(mongoose['apps/api/src/database/todo.schema.ts']).toContain(
      'new Schema<TodoDoc>',
    )
    expect(
      JSON.parse(mongoose['apps/api/package.json']!).dependencies,
    ).toHaveProperty('mongoose')
    expect(mongoose['docker-compose.yml']).toContain('mongo:8')

    const plain = generate({
      ...DEFAULT_OPTIONS,
      database: 'mongodb',
      orm: 'none',
    })
    expect(plain['apps/api/src/database/database.ts']).toContain('MongoClient')
    const deps = JSON.parse(plain['apps/api/package.json']!)
      .dependencies as Record<string, string>
    expect(deps).toHaveProperty('mongodb')
    expect(deps).not.toHaveProperty('mongoose')

    for (const tree of [mongoose, plain])
      expect(JSON.parse(tree['package.json']!).scripts).not.toHaveProperty(
        'db:migrate',
      )
  })

  it('lists every supported combination: 3 repos × 2 backends × database / ORM pairs × 2 frontends', () => {
    const combos = supportedCombinations()
    const pairs = Object.values(ORMS_BY_STACK.typescript).flat().length
    expect(combos).toHaveLength(3 * 2 * pairs * 2)
    expect(combos[0]!.name).toBe('app-turbo-nest-postgres-prisma-next')
    expect(new Set(combos.map((c) => c.name)).size).toBe(combos.length)
    for (const c of combos) expect(incompatibilities(c), c.name).toEqual([])
  })

  it('keeps the data layer free of NestJS, so both backends share it', () => {
    for (const options of supportedCombinations().filter(
      (c) => c.repo === 'turbo' && c.frontend === 'next',
    )) {
      const tree = generate(options)
      for (const [path, content] of Object.entries(tree))
        if (
          path.startsWith('apps/api/src/database/') &&
          !path.endsWith('database.module.ts')
        )
          expect(content, `${options.name}: ${path}`).not.toContain('@nestjs')
    }
  })

  it('builds an Express api on the same data layer', () => {
    const tree = generate({ ...DEFAULT_OPTIONS, backend: 'express' })
    const pkg = JSON.parse(tree['apps/api/package.json']!) as {
      scripts: Record<string, string>
      dependencies: Record<string, string>
    }
    expect(pkg.dependencies).toHaveProperty('express')
    expect(
      Object.keys(pkg.dependencies).some((d) => d.startsWith('@nestjs')),
    ).toBe(false)
    expect(pkg.scripts.build).toBe(
      'prisma generate && tsc -p tsconfig.build.json',
    )
    expect(tree['apps/api/src/todos/todos.router.ts']).toContain(
      "router.patch('/:id'",
    )
    expect(tree['apps/api/src/database/database.ts']).toContain(
      'connectDatabase',
    )
    expect(tree).not.toHaveProperty(['apps/api/src/app.module.ts'])
  })

  it('offers a monorepo only with a TypeScript backend', () => {
    expect(monorepoUnavailable('nest')).toBeUndefined()
    expect(monorepoUnavailable('express')).toBeUndefined()
    expect(monorepoUnavailable('spring')).toMatch(/TypeScript backend/)
    expect(
      incompatibilities({
        ...DEFAULT_OPTIONS,
        backend: 'go',
        orm: 'gorm',
        repo: 'nx',
      }),
    ).toContain(
      'Repository: Nx needs a TypeScript backend (NestJS or Express). Pick No monorepo.',
    )
    expect(
      incompatibilities({
        ...DEFAULT_OPTIONS,
        backend: 'go',
        orm: 'gorm',
        repo: 'single',
      }).some((r) => r.startsWith('Repository:')),
    ).toBe(false)
  })

  it('makes an Nx workspace with nx run-many instead of turbo', () => {
    const tree = generate({ ...DEFAULT_OPTIONS, repo: 'nx' })
    const pkg = JSON.parse(tree['package.json']!) as {
      scripts: Record<string, string>
      devDependencies: Record<string, string>
    }
    expect(pkg.scripts.build).toBe('nx run-many -t build')
    expect(pkg.devDependencies).toHaveProperty('nx')
    expect(pkg.devDependencies).not.toHaveProperty('turbo')
    expect(tree).toHaveProperty(['nx.json'])
    expect(tree).not.toHaveProperty(['turbo.json'])
    expect(tree['pnpm-workspace.yaml']).toContain("'nx': true")
  })

  it('without a monorepo, writes api/ and web/ as independent projects', () => {
    const tree = generate({ ...DEFAULT_OPTIONS, repo: 'single' })
    const paths = Object.keys(tree)
    expect(
      paths.some((p) => p.startsWith('apps/') || p.startsWith('packages/')),
    ).toBe(false)
    expect(tree).not.toHaveProperty(['package.json'])
    expect(tree).not.toHaveProperty(['pnpm-workspace.yaml'])
    for (const app of ['api', 'web']) {
      const pkg = JSON.parse(tree[`${app}/package.json`]!) as {
        packageManager: string
        dependencies: Record<string, string>
      }
      expect(pkg.packageManager).toMatch(/^pnpm@/)
      expect(pkg.dependencies).not.toHaveProperty('@app/types')
      expect(tree).toHaveProperty([`${app}/pnpm-workspace.yaml`])
    }
    // each app has its own copy of the types, found through tsconfig paths
    expect(tree['api/src/types.ts']).toContain('export interface Todo')
    expect(tree['web/types.ts']).toContain('export interface Todo')
    expect(
      JSON.parse(tree['api/tsconfig.json']!).compilerOptions.paths,
    ).toEqual({
      '@app/types': ['./src/types.ts'],
    })
    expect(tree['README.md']).toContain('cd api && pnpm install')
  })

  it('produces valid JSON for every supported combination', () => {
    for (const options of supportedCombinations()) {
      const tree = generate(options)
      for (const [path, content] of Object.entries(tree))
        if (path.endsWith('.json'))
          expect(() => JSON.parse(content) as unknown, path).not.toThrow()
    }
  })
})
