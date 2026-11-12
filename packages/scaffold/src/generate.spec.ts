import { describe, expect, it } from 'vitest'

import { ScaffoldError, generate, supportedCombinations } from './generate.js'
import { DEFAULT_OPTIONS, incompatibilities } from './options.js'

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
    ).toEqual(['Backend: Spring Boot is not available yet.'])
    expect(
      incompatibilities({
        ...DEFAULT_OPTIONS,
        orm: 'drizzle',
        database: 'mongodb',
      }),
    ).toHaveLength(1)
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
