import { queryOptions } from '@tanstack/react-query'

import type { StudioCategory, StudioLevel } from '@repo/types'

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

// ─── Learning (apps/api/src/studio/learn.*) ───────────────────────────────────────────────────

export interface TrackSummary {
  id: string
  slug: string
  category: StudioCategory
  title: string
  summary: string
  lessons: number
  done: number
  /** Counts per level present in the track, easiest first */
  levels: { level: StudioLevel; lessons: number; done: number }[]
}

export interface TrackLesson {
  id: string
  slug: string
  title: string
  summary: string
  minutes: number
  level: StudioLevel
  done: boolean
  quizScore: number | null
  quizTotal: number | null
}

export interface TrackDetail extends Omit<
  TrackSummary,
  'lessons' | 'done' | 'levels'
> {
  lessons: TrackLesson[]
}

export interface LessonLink {
  slug: string
  title: string
}

export interface LessonDetail {
  id: string
  slug: string
  title: string
  summary: string
  /** Markdown (GFM) */
  content: string
  minutes: number
  level: StudioLevel
  updatedAt: string
  /** Without answers: they come back with the quiz result */
  questions: { id: string; prompt: string; choices: string[] }[]
  track: { id: string; slug: string; title: string; category: StudioCategory }
  done: boolean
  quizScore: number | null
  quizTotal: number | null
  previous: LessonLink | null
  next: LessonLink | null
}

export interface QuizResult {
  score: number
  total: number
  passed: boolean
  done: boolean
  results: {
    id: string
    chosen: number
    answer: number
    correct: boolean
    explanation: string
  }[]
}

export interface RoadmapSummary {
  slug: string
  title: string
  summary: string
  steps: number
  lessons: number
  done: number
}

/** A learner's state on one lesson: finished, opened or quizzed, not touched. */
export type LessonState = 'done' | 'started' | 'todo'

export interface RoadmapStep {
  id: string
  title: string
  description: string
  track: {
    slug: string
    title: string
    category: StudioCategory
    lessons: number
    done: number
    /** Published lessons in order, with the learner's state */
    items: { slug: string; title: string; state: LessonState }[]
  } | null
}

export interface RoadmapDetail {
  slug: string
  title: string
  summary: string
  steps: RoadmapStep[]
}

/** GET /api/studio/garden: what the learner's tree is made of. */
export interface StudioGarden {
  /** One per finished lesson, oldest first */
  leaves: {
    track: { slug: string; title: string }
    slug: string
    title: string
    completedAt: string
  }[]
  /** Tracks with every lesson finished */
  flowers: { slug: string; title: string }[]
  /** Roadmaps with every lesson finished */
  fruits: { slug: string; title: string }[]
  streak: {
    current: number
    best: number
    activeDays: number
    studiedToday: boolean
    /** Days since the last study day; null: never studied */
    idleDays: number | null
    /** The last 7 days, today last; `date` is yyyy-MM-dd */
    week: { date: string; studied: boolean }[]
  }
}

export interface StudioOverview {
  done: number
  recent: {
    track: { slug: string; title: string }
    slug: string
    title: string
    done: boolean
    updatedAt: string
  }[]
}

export const studioKeys = {
  all: ['studio'] as const,
  options: ['studio', 'options'] as const,
  /** Everything that shows the learner's progress */
  learn: ['studio', 'learn'] as const,
  overview: () => [...studioKeys.learn, 'overview'] as const,
  garden: () => [...studioKeys.learn, 'garden'] as const,
  tracks: () => [...studioKeys.learn, 'tracks'] as const,
  track: (slug: string) => [...studioKeys.learn, 'tracks', slug] as const,
  lesson: (track: string, lesson: string) =>
    [...studioKeys.learn, 'tracks', track, 'lessons', lesson] as const,
  roadmaps: () => [...studioKeys.learn, 'roadmaps'] as const,
  roadmap: (slug: string) => [...studioKeys.learn, 'roadmaps', slug] as const,
}

const get = <T>(path: string) => apiFetch<T>(path, { cache: 'no-store' })
const enc = encodeURIComponent

export const overviewQueryOptions = () =>
  queryOptions({
    queryKey: studioKeys.overview(),
    queryFn: () => get<StudioOverview>('/studio/overview'),
  })

export const gardenQueryOptions = () =>
  queryOptions({
    queryKey: studioKeys.garden(),
    queryFn: () => get<StudioGarden>('/studio/garden'),
  })

export const tracksQueryOptions = () =>
  queryOptions({
    queryKey: studioKeys.tracks(),
    queryFn: () => get<TrackSummary[]>('/studio/tracks'),
  })

export const trackQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: studioKeys.track(slug),
    queryFn: () => get<TrackDetail>(`/studio/tracks/${enc(slug)}`),
  })

export const lessonQueryOptions = (track: string, lesson: string) =>
  queryOptions({
    queryKey: studioKeys.lesson(track, lesson),
    queryFn: () =>
      get<LessonDetail>(`/studio/tracks/${enc(track)}/lessons/${enc(lesson)}`),
  })

export const roadmapsQueryOptions = () =>
  queryOptions({
    queryKey: studioKeys.roadmaps(),
    queryFn: () => get<RoadmapSummary[]>('/studio/roadmaps'),
  })

export const roadmapQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: studioKeys.roadmap(slug),
    queryFn: () => get<RoadmapDetail>(`/studio/roadmaps/${enc(slug)}`),
  })

// ─── Project generator (apps/api/src/studio/scaffold) ────────────────────────────────────────

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
