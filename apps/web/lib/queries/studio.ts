import { queryOptions } from '@tanstack/react-query'

import { apiFetch } from '@/lib/api'

/** Shapes of the Studio API (apps/api/src/studio). */
export type Repo = 'turbo' | 'nx' | 'single'
export type Backend =
  'nest' | 'express' | 'fastify' | 'spring' | 'go' | 'fastapi'
export type Database = 'postgres' | 'mysql' | 'oracle' | 'mongodb'
export type Frontend = 'next' | 'react' | 'nuxt'
export type Orm = string
export type Language = 'typescript' | 'java' | 'go' | 'python'

export interface ScaffoldOptions {
  name: string
  repo: Repo
  backend: Backend
  database: Database
  orm: Orm
  frontend: Frontend
}

export interface Choice<T extends string> {
  value: T
  label: string
  description: string
  /** Listed for the roadmap, never selectable */
  planned?: boolean
}

/** GET /api/studio/options: the choices and the rules between them. */
export interface StudioCatalog {
  namePattern: string
  defaults: ScaffoldOptions
  repos: Choice<Repo>[]
  databases: Choice<Database>[]
  backends: (Choice<Backend> & {
    language: Language
    /** Why it cannot sit in a monorepo; null: it can */
    monorepoUnavailable: string | null
  })[]
  orms: Choice<Orm>[]
  frontends: Choice<Frontend>[]
  /** ORMs of a language × database, first = default */
  ormsByStack: Record<Language, Record<Database, Orm[]>>
}

/** path → content of a generated project. */
export type FileTree = Record<string, string>

export const studioKeys = {
  options: ['studio', 'options'] as const,
}

export const studioOptionsQueryOptions = () =>
  queryOptions({
    queryKey: studioKeys.options,
    queryFn: () => apiFetch<StudioCatalog>('/studio/options'),
    // Changes only with a deploy
    staleTime: Infinity,
  })

export const languageOf = (catalog: StudioCatalog, backend: Backend) =>
  catalog.backends.find((b) => b.value === backend)?.language ?? 'typescript'

/** ORM ids for a backend and a database, in display order (planned ones included). */
export const ormIdsFor = (
  catalog: StudioCatalog,
  backend: Backend,
  database: Database,
): Orm[] => catalog.ormsByStack[languageOf(catalog, backend)]?.[database] ?? []

export const ormsFor = (
  catalog: StudioCatalog,
  backend: Backend,
  database: Database,
): Choice<Orm>[] =>
  ormIdsFor(catalog, backend, database).flatMap(
    (id) => catalog.orms.find((o) => o.value === id) ?? [],
  )

/** The first ORM that can be generated today for a backend + database. */
export const defaultOrm = (
  catalog: StudioCatalog,
  backend: Backend,
  database: Database,
) => ormsFor(catalog, backend, database).find((o) => !o.planned)?.value

export const monorepoUnavailable = (catalog: StudioCatalog, backend: Backend) =>
  catalog.backends.find((b) => b.value === backend)?.monorepoUnavailable ??
  undefined
