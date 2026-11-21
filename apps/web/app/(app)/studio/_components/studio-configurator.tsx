'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Check,
  Download,
  FolderTree,
  Loader2,
  Sparkles,
} from 'lucide-react'
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'

import { Button } from '@repo/ui/components/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import { ApiError, apiFetch } from '@/lib/api'
import {
  type Backend,
  type Database,
  type FileTree,
  type Orm,
  type Repo,
  type ScaffoldOptions,
  type StudioCatalog,
  defaultOrm,
  languageOf,
  monorepoUnavailable,
  ormIdsFor,
  ormsFor,
  studioOptionsQueryOptions,
} from '@/lib/queries/studio'

import { FilePreview } from './file-preview'
import { type OptionChoice, OptionGroup } from './option-group'
import { WizardStep } from './wizard-step'

const labelOf = (list: { value: string; label: string }[], value: string) =>
  list.find((c) => c.value === value)?.label ?? value

/**
 * The steps, in order. The ORM comes after the backend (it depends on its language), the
 * repository last (a monorepo needs a TypeScript backend).
 */
const STEPS = ['database', 'backend', 'orm', 'frontend', 'repo'] as const
type Step = (typeof STEPS)[number]
const TITLES: Record<Step, string> = {
  repo: 'Repository',
  database: 'Database',
  backend: 'Backend',
  orm: 'ORM',
  frontend: 'Frontend',
}

/** Monorepo or not; the tool comes second, only for a monorepo. */
const LAYOUTS: OptionChoice<'monorepo' | 'single'>[] = [
  {
    value: 'monorepo',
    label: 'Monorepo',
    description:
      'One pnpm workspace: apps/api, apps/web and a shared types package.',
  },
  {
    value: 'single',
    label: 'Separate folders',
    description:
      'api/ and web/ side by side, each its own project. Nothing shared.',
  },
]

const keyOf = (options: ScaffoldOptions) => JSON.stringify(options)

/** Steps along the top: done, current, still to do, and the final Generate. */
function Progress({
  done,
  open,
  generated,
}: {
  done: ReadonlySet<Step>
  open: Step | null
  generated: boolean
}) {
  const items = [
    ...STEPS.map((step) => ({
      label: TITLES[step],
      state:
        done.has(step) && open !== step
          ? 'done'
          : open === step
            ? 'current'
            : 'todo',
    })),
    {
      label: 'Generate',
      state: generated
        ? 'done'
        : done.size === STEPS.length && !open
          ? 'current'
          : 'todo',
    },
  ]
  return (
    <ol
      aria-label="Steps"
      className="flex flex-wrap items-center gap-x-1 gap-y-2"
    >
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-1">
          <span
            aria-current={item.state === 'current' ? 'step' : undefined}
            className={cn(
              `flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs
              font-medium`,
              item.state === 'done' && 'bg-primary/10 text-primary',
              item.state === 'current' && 'bg-primary text-primary-foreground',
              item.state === 'todo' && 'text-muted-foreground',
            )}
          >
            {item.state === 'done' ? (
              <Check aria-hidden className="size-3" />
            ) : (
              <span aria-hidden className="tabular-nums">
                {i + 1}
              </span>
            )}
            {item.label}
          </span>
          {i < items.length - 1 && (
            <span aria-hidden className="h-px w-3 bg-border" />
          )}
        </li>
      ))}
    </ol>
  )
}

/** Loads the choices from the api; the form works on them. */
export function StudioConfigurator() {
  const { data: catalog, isError } = useQuery(studioOptionsQueryOptions())
  if (!catalog)
    return (
      <p role="status" className="text-muted-foreground">
        {isError
          ? 'Could not load the Studio options. Reload the page.'
          : 'Loading…'}
      </p>
    )
  return <Configurator catalog={catalog} />
}

/**
 * Studio: name, then one step at a time (database, backend, ORM, frontend, repository). A picked
 * step collapses and the next opens; Change reopens one. When every step is picked, a review
 * card offers Generate: the api builds the project, its files are shown and can be downloaded.
 */
function Configurator({ catalog }: { catalog: StudioCatalog }) {
  const { defaults } = catalog
  /**
   * The choices live in the URL: a combination can be shared or bookmarked. No defaults here: a
   * link that names a choice opens with that step already recorded.
   */
  const parsers = useMemo(
    () => ({
      name: parseAsString.withDefault(defaults.name),
      repo: parseAsStringLiteral(catalog.repos.map((r) => r.value)),
      database: parseAsStringLiteral(catalog.databases.map((d) => d.value)),
      backend: parseAsStringLiteral(
        catalog.backends.filter((b) => !b.planned).map((b) => b.value),
      ),
      orm: parseAsStringLiteral(catalog.orms.map((o) => o.value)),
      frontend: parseAsStringLiteral(catalog.frontends.map((f) => f.value)),
    }),
    [catalog, defaults.name],
  )
  const [query, setQuery] = useQueryStates(parsers)

  const backend: Backend = query.backend ?? defaults.backend
  const database: Database = query.database ?? defaults.database
  // A shared link may hold a pair that does not fit (?database=mongodb&orm=prisma): use the default
  const fits = ormIdsFor(catalog, backend, database)
  const wanted = query.orm ?? defaults.orm
  const orm: Orm = fits.includes(wanted)
    ? wanted
    : (defaultOrm(catalog, backend, database) ?? wanted)
  const options: ScaffoldOptions = {
    name: query.name,
    repo: query.repo ?? defaults.repo,
    database,
    backend,
    orm,
    frontend: query.frontend ?? defaults.frontend,
  }

  const [done, setDone] = useState<ReadonlySet<Step>>(
    () => new Set(STEPS.filter((step) => query[step] !== null)),
  )
  const [open, setOpen] = useState<Step | null>(
    () => STEPS.find((step) => query[step] === null) ?? null,
  )
  const [nameTouched, setNameTouched] = useState(false)
  const [switched, setSwitched] = useState('')
  const [lastTool, setLastTool] = useState<Repo>(
    options.repo === 'single' ? 'turbo' : options.repo,
  )
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<{
    key: string
    files: FileTree
  }>()
  const [showResult, setShowResult] = useState(false)
  const [selected, setSelected] = useState('README.md')
  const [downloading, setDownloading] = useState(false)

  const nameOk = new RegExp(catalog.namePattern).test(options.name)
  const complete = done.size === STEPS.length && !open
  const current = generated?.key === keyOf(options) ? generated : undefined

  // Focus follows the step that opens (not on first render)
  const openRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  useEffect(() => {
    if (!moved.current) return
    const radios = openRef.current?.querySelectorAll<HTMLInputElement>(
      'input[type=radio]:not(:disabled)',
    )
    const target =
      [...(radios ?? [])].find((radio) => radio.checked) ?? radios?.[0]
    target?.focus()
  }, [open])
  useEffect(() => {
    if (showResult) resultRef.current?.focus()
  }, [showResult])

  function goTo(step: Step | null) {
    moved.current = true
    setOpen(step)
  }

  /** Records a step and opens the first one still to do. `patch`: the values just picked. */
  function record(
    step: Step,
    patch: Partial<Record<Step, string>> = {},
    alsoUndo: Step[] = [],
  ) {
    const next = new Set(done)
    next.add(step)
    for (const s of alsoUndo) next.delete(s)
    setDone(next)
    goTo(STEPS.find((s) => !next.has(s)) ?? null)
    // The URL names every recorded step, so a shared link opens the same way
    void setQuery({
      repo: options.repo,
      database: options.database,
      backend: options.backend,
      orm: options.orm,
      frontend: options.frontend,
      ...(patch as Partial<ScaffoldOptions>),
    })
  }

  /** New database or backend: keep the ORM if it still fits, else take the default and say so. */
  function ormAfter(nextBackend: Backend, nextDatabase: Database) {
    if (ormIdsFor(catalog, nextBackend, nextDatabase).includes(orm)) {
      setSwitched('')
      return { orm, redo: [] as Step[] }
    }
    const fallback = defaultOrm(catalog, nextBackend, nextDatabase)
    if (!fallback) return { orm, redo: [] as Step[] }
    setSwitched(
      `${labelOf(catalog.orms, orm)} does not fit ${labelOf(catalog.backends, nextBackend)} with ${labelOf(catalog.databases, nextDatabase)}: switched to ${labelOf(catalog.orms, fallback)}. Check it below.`,
    )
    return { orm: fallback, redo: ['orm'] as Step[] }
  }

  function chooseDatabase(value: Database, confirm: boolean) {
    const next = ormAfter(backend, value)
    void setQuery({ database: value, orm: next.orm })
    if (confirm)
      record('database', { database: value, orm: next.orm }, next.redo)
  }

  function chooseBackend(value: Backend, confirm: boolean) {
    const next = ormAfter(value, database)
    // A non-TypeScript backend cannot sit in the generated monorepo: separate folders, recorded again
    const toSingle =
      options.repo !== 'single' && Boolean(monorepoUnavailable(catalog, value))
    const patch = {
      backend: value,
      orm: next.orm,
      ...(toSingle ? { repo: 'single' as const } : {}),
    }
    void setQuery(patch)
    if (confirm)
      record('backend', patch, [
        ...next.redo,
        ...(toSingle ? (['repo'] as Step[]) : []),
      ])
  }

  /** The api checks the options once more, builds and formats every file. */
  async function generate() {
    if (current) {
      setShowResult(true)
      return
    }
    setGenerating(true)
    try {
      const { files } = await apiFetch<{ files: FileTree }>('/studio/preview', {
        method: 'POST',
        body: JSON.stringify(options),
      })
      setGenerated({ key: keyOf(options), files })
      setSelected('README.md')
      setShowResult(true)
    } catch (error) {
      toast.error('Could not generate the project', {
        description:
          error instanceof ApiError
            ? error.message
            : 'Could not reach the server',
      })
    } finally {
      setGenerating(false)
    }
  }

  /** The api zips the same files; the browser saves them. */
  async function download() {
    setDownloading(true)
    try {
      const res = await apiFetch.raw('/studio/generate', {
        method: 'POST',
        body: JSON.stringify(options),
      })
      const url = URL.createObjectURL(await res.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = `${options.name}.zip`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Could not download the project', {
        description:
          error instanceof Error ? error.message : 'Could not reach the server',
      })
    } finally {
      setDownloading(false)
    }
  }

  const dbLabel = labelOf(catalog.databases, database)
  const backendLabel = labelOf(catalog.backends, backend)
  const summaries: Record<Step, string> = {
    repo:
      options.repo === 'single'
        ? 'Separate folders: api/ and web/'
        : `Monorepo · ${labelOf(catalog.repos, options.repo)}`,
    database: dbLabel,
    backend: backendLabel,
    orm: labelOf(catalog.orms, orm),
    frontend: labelOf(catalog.frontends, options.frontend),
  }

  const backendChoices: OptionChoice<Backend>[] = catalog.backends.map((c) => {
    const orms = ormsFor(catalog, c.value, database).map((o) => o.label)
    return {
      ...c,
      description: orms.length
        ? `${c.description} ORMs for ${dbLabel}: ${orms.join(', ')}.`
        : c.description,
      unavailable: c.planned
        ? 'Planned'
        : orms.length
          ? undefined
          : `Not for ${dbLabel}`,
    }
  })
  // The backend language's ORMs: the ones that fit the database first, then the others with why
  const languageOrms = new Set(
    Object.values(catalog.ormsByStack[languageOf(catalog, backend)]).flat(),
  )
  const ormChoices: OptionChoice<Orm>[] = [
    ...ormsFor(catalog, backend, database).map((c) => ({
      ...c,
      unavailable: c.planned ? 'Planned' : undefined,
    })),
    ...catalog.orms
      .filter((c) => languageOrms.has(c.value) && !fits.includes(c.value))
      .map((c) => ({ ...c, unavailable: `Not for ${dbLabel}` })),
  ]

  function body(step: Step, index: number) {
    const legend = `${index}. ${TITLES[step]}`
    switch (step) {
      case 'repo':
        return (
          <>
            <OptionGroup
              name="layout"
              legend={legend}
              description="Turborepo and Nx host the TypeScript api and web in one workspace."
              choices={LAYOUTS.map((c) => ({
                ...c,
                unavailable:
                  c.value === 'monorepo'
                    ? monorepoUnavailable(catalog, backend)
                    : undefined,
              }))}
              value={options.repo === 'single' ? 'single' : 'monorepo'}
              onChange={(layout) =>
                void setQuery({
                  repo: layout === 'single' ? 'single' : lastTool,
                })
              }
              onPick={(layout) => {
                if (layout === 'single') record('repo', { repo: 'single' })
              }}
            />
            {options.repo !== 'single' && (
              <OptionGroup
                name="repo"
                legend="Monorepo tool"
                description="Plain setup, as the tool's own starter makes it."
                choices={catalog.repos.filter((r) => r.value !== 'single')}
                value={options.repo}
                onChange={(repo) => {
                  setLastTool(repo)
                  void setQuery({ repo })
                }}
                onPick={(repo) => record('repo', { repo })}
              />
            )}
          </>
        )
      case 'database':
        return (
          <OptionGroup
            name="database"
            legend={legend}
            description="The backend and ORM choices follow it."
            choices={catalog.databases}
            value={database}
            onChange={(value) => chooseDatabase(value, false)}
            onPick={(value) => chooseDatabase(value, true)}
          />
        )
      case 'backend':
        return (
          <OptionGroup
            name="backend"
            legend={legend}
            description="Its language decides which ORMs exist."
            choices={backendChoices}
            value={backend}
            onChange={(value) => chooseBackend(value, false)}
            onPick={(value) => chooseBackend(value, true)}
          />
        )
      case 'orm':
        return (
          <OptionGroup
            name="orm"
            legend={legend}
            description={`What talks to ${dbLabel} in the ${backendLabel} api.`}
            choices={ormChoices}
            value={orm}
            onChange={(value) => {
              setSwitched('')
              void setQuery({ orm: value })
            }}
            onPick={(value) => record('orm', { orm: value })}
          >
            <p
              role="status"
              className="text-sm text-muted-foreground empty:hidden"
            >
              {switched}
            </p>
          </OptionGroup>
        )
      case 'frontend':
        return (
          <OptionGroup
            name="frontend"
            legend={legend}
            choices={catalog.frontends}
            value={options.frontend}
            onChange={(frontend) => void setQuery({ frontend })}
            onPick={(frontend) => record('frontend', { frontend })}
          />
        )
    }
  }

  if (showResult && current) {
    const count = Object.keys(current.files).length
    const file = selected in current.files ? selected : 'README.md'
    return (
      <div className="flex flex-col gap-6">
        <Progress done={done} open={open} generated />
        <section
          aria-labelledby="result-heading"
          className="flex flex-wrap items-center justify-between gap-4
            rounded-xl border bg-card p-5"
        >
          <div className="flex min-w-0 flex-col gap-1.5">
            <h2
              id="result-heading"
              ref={resultRef}
              tabIndex={-1}
              className="flex items-center gap-2 text-xl font-semibold
                outline-none"
            >
              <FolderTree aria-hidden className="size-5 text-primary" />
              <span className="font-mono">{options.name}</span> is ready
            </h2>
            <p className="text-sm text-muted-foreground">
              {STEPS.map((step) => summaries[step]).join(' · ')}
              <span className="tabular-nums"> · {count} files</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setShowResult(false)}>
              <ArrowLeft aria-hidden />
              Change options
            </Button>
            <Button onClick={() => void download()} disabled={downloading}>
              {downloading ? (
                <Loader2
                  aria-hidden
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <Download aria-hidden />
              )}
              {downloading ? 'Preparing…' : `Download ${options.name}.zip`}
            </Button>
          </div>
        </section>
        <FilePreview
          tree={current.files}
          selected={file}
          onSelect={setSelected}
        />
      </div>
    )
  }

  const remaining = STEPS.filter((step) => !done.has(step))
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <Progress done={done} open={open} generated={false} />
      <form
        aria-label="Project options"
        onSubmit={(e) => {
          e.preventDefault()
          // Enter or Continue records the open step
          if (open) record(open)
        }}
        className="flex flex-col gap-3"
      >
        <Field
          data-invalid={nameTouched && !nameOk ? true : undefined}
          className="mb-3"
        >
          <FieldLabel htmlFor="project-name">Project name</FieldLabel>
          <Input
            id="project-name"
            value={query.name}
            onChange={(e) => void setQuery({ name: e.target.value })}
            onBlur={() => setNameTouched(true)}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={nameTouched && !nameOk ? true : undefined}
            aria-describedby="project-name-help"
            className="font-mono"
          />
          {nameTouched && !nameOk ? (
            <FieldError>
              2–50 characters: lowercase letters, digits and dashes, starting
              with a letter.
            </FieldError>
          ) : (
            <FieldDescription id="project-name-help">
              Folder and package name: lowercase letters, digits and dashes.
            </FieldDescription>
          )}
        </Field>

        {STEPS.map((step, i) => {
          const isOpen = open === step
          // Not reached yet: hidden until the steps before it are recorded
          if (!isOpen && !done.has(step)) return null
          return (
            <WizardStep
              key={step}
              index={i + 1}
              title={TITLES[step]}
              summary={summaries[step]}
              state={isOpen ? 'open' : 'done'}
              onEdit={() => goTo(step)}
              ref={isOpen ? openRef : undefined}
            >
              {body(step, i + 1)}
            </WizardStep>
          )
        })}

        {remaining.length > 0 && !open && (
          <Button
            type="button"
            variant="outline"
            onClick={() => goTo(remaining[0]!)}
          >
            Continue with {TITLES[remaining[0]!].toLowerCase()}
          </Button>
        )}
      </form>

      {complete && (
        <section
          aria-labelledby="review-heading"
          className="flex flex-col gap-4 rounded-xl border border-primary/40
            bg-card p-5 shadow-xs"
        >
          <div className="flex flex-col gap-1">
            <h2 id="review-heading" className="text-lg font-semibold">
              Ready to generate
            </h2>
            <p className="text-sm text-muted-foreground">
              Every step is picked. Generate builds the project on the server:
              you can browse each file, then download it as a zip.
            </p>
          </div>
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex justify-between gap-3 sm:col-span-2">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-mono">{options.name || '…'}</dd>
            </div>
            {STEPS.map((step) => (
              <div key={step} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{TITLES[step]}</dt>
                <dd className="text-right font-medium">{summaries[step]}</dd>
              </div>
            ))}
          </dl>
          <Button
            type="button"
            size="lg"
            className="self-start"
            onClick={() => void generate()}
            disabled={!nameOk || generating}
          >
            {generating ? (
              <Loader2
                aria-hidden
                className="animate-spin motion-reduce:animate-none"
              />
            ) : (
              <Sparkles aria-hidden />
            )}
            {generating
              ? 'Generating…'
              : current
                ? 'View generated files'
                : 'Generate project'}
          </Button>
          {!nameOk && (
            <p className="text-sm text-destructive">
              Fix the project name first.
            </p>
          )}
        </section>
      )}
    </div>
  )
}
