'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Download } from 'lucide-react'
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'

import {
  BACKENDS,
  type Backend,
  DATABASES,
  DEFAULT_OPTIONS,
  type Database,
  FRONTENDS,
  LANGUAGE_OF,
  MONOREPO_TOOLS,
  ORMS,
  ORMS_BY_STACK,
  type Orm,
  REPOS,
  type Repo,
  type ScaffoldOptions,
  defaultOrm,
  generate,
  incompatibilities,
  monorepoUnavailable,
  ormIdsFor,
  ormsFor,
} from '@repo/scaffold'
import { Button } from '@repo/ui/components/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'

import { FilePreview } from './file-preview'
import { type OptionChoice, OptionGroup } from './option-group'
import { WizardStep } from './wizard-step'

const labelOf = (list: { value: string; label: string }[], value: string) =>
  list.find((c) => c.value === value)?.label ?? value

/**
 * The choices live in the URL: a combination can be shared or bookmarked. No defaults here:
 * a link that names a choice opens with that step already recorded.
 */
const parsers = {
  name: parseAsString.withDefault(DEFAULT_OPTIONS.name),
  repo: parseAsStringLiteral(REPOS.map((r) => r.value)),
  database: parseAsStringLiteral(DATABASES.map((d) => d.value)),
  backend: parseAsStringLiteral(
    BACKENDS.filter((b) => !b.planned).map((b) => b.value),
  ),
  orm: parseAsStringLiteral(ORMS.map((o) => o.value)),
  frontend: parseAsStringLiteral(FRONTENDS.map((f) => f.value)),
}

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

/**
 * Studio: one step at a time (database, backend, ORM, frontend, repository). A picked step is
 * recorded and collapses, the next one opens; Change reopens a step. The preview follows every
 * choice. Pure client side: `@repo/scaffold` only builds strings.
 */
export function StudioConfigurator() {
  const [query, setQuery] = useQueryStates(parsers)

  const backend: Backend = query.backend ?? DEFAULT_OPTIONS.backend
  const database: Database = query.database ?? DEFAULT_OPTIONS.database
  // A shared link may hold a pair that does not fit (?database=mongodb&orm=prisma): use the default
  const fits = ormIdsFor(backend, database)
  const wanted = query.orm ?? DEFAULT_OPTIONS.orm
  const orm: Orm = fits.includes(wanted)
    ? wanted
    : (defaultOrm(backend, database) ?? wanted)
  const options: ScaffoldOptions = {
    name: query.name,
    repo: query.repo ?? DEFAULT_OPTIONS.repo,
    database,
    backend,
    orm,
    frontend: query.frontend ?? DEFAULT_OPTIONS.frontend,
  }

  // Steps named in the URL are recorded from the start; the first other one is open
  const [done, setDone] = useState<ReadonlySet<Step>>(
    () => new Set(STEPS.filter((step) => query[step] !== null)),
  )
  const [open, setOpen] = useState<Step | null>(
    () => STEPS.find((step) => query[step] === null) ?? null,
  )
  const [nameTouched, setNameTouched] = useState(false)
  const [switched, setSwitched] = useState('')
  const [selected, setSelected] = useState('README.md')
  // The monorepo tool to come back to after trying "Separate folders"
  const [lastTool, setLastTool] = useState<Repo>(
    options.repo === 'single' ? 'turbo' : options.repo,
  )

  // Focus follows the step that opens (not on first render)
  const openRef = useRef<HTMLDivElement>(null)
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

  function goTo(step: Step | null) {
    moved.current = true
    setOpen(step)
  }

  /**
   * Records a step and opens the first one still to do. `patch` holds the values just picked: the
   * `options` of this render are from before the click.
   */
  function complete(
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
    if (ormIdsFor(nextBackend, nextDatabase).includes(orm)) {
      setSwitched('')
      return { orm, redo: [] as Step[] }
    }
    const fallback = defaultOrm(nextBackend, nextDatabase)
    if (!fallback) return { orm, redo: [] as Step[] }
    setSwitched(
      `${labelOf(ORMS, orm)} does not fit ${labelOf(BACKENDS, nextBackend)} with ${labelOf(DATABASES, nextDatabase)}: switched to ${labelOf(ORMS, fallback)}. Check it below.`,
    )
    // The ORM step must be confirmed again
    return { orm: fallback, redo: ['orm'] as Step[] }
  }

  function chooseDatabase(value: Database, confirm: boolean) {
    const next = ormAfter(backend, value)
    void setQuery({ database: value, orm: next.orm })
    if (confirm)
      complete('database', { database: value, orm: next.orm }, next.redo)
  }

  function chooseBackend(value: Backend, confirm: boolean) {
    const next = ormAfter(value, database)
    // A non-TypeScript backend cannot sit in the generated monorepo: separate folders, recorded again
    const toSingle =
      options.repo !== 'single' && Boolean(monorepoUnavailable(value))
    const patch = {
      backend: value,
      orm: next.orm,
      ...(toSingle ? { repo: 'single' as const } : {}),
    }
    void setQuery(patch)
    if (confirm)
      complete('backend', patch, [
        ...next.redo,
        ...(toSingle ? (['repo'] as Step[]) : []),
      ])
  }

  const reasons = incompatibilities(options)
  const nameError = reasons.find((r) => r.startsWith('Name:'))
  const tree = useMemo(
    () => (reasons.length ? null : generate(options)),
    // options is rebuilt each render; these are its values
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the option values are the inputs
    [
      options.name,
      options.repo,
      options.backend,
      options.database,
      options.orm,
      options.frontend,
    ],
  )
  const file = tree && selected in tree ? selected : 'README.md'

  const dbLabel = labelOf(DATABASES, database)
  const backendLabel = labelOf(BACKENDS, backend)
  const summaries: Record<Step, string> = {
    repo:
      options.repo === 'single'
        ? 'Separate folders: api/ and web/'
        : `Monorepo · ${labelOf(REPOS, options.repo)}`,
    database: dbLabel,
    backend: backendLabel,
    orm: labelOf(ORMS, orm),
    frontend: labelOf(FRONTENDS, options.frontend),
  }

  const backendChoices: OptionChoice<Backend>[] = BACKENDS.map((c) => {
    const orms = ormsFor(c.value, database).map((o) => o.label)
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
    Object.values(ORMS_BY_STACK[LANGUAGE_OF[backend]]).flat(),
  )
  const ormChoices: OptionChoice<Orm>[] = [
    ...ormsFor(backend, database).map((c) => ({
      ...c,
      unavailable: c.planned ? 'Planned' : undefined,
    })),
    ...ORMS.filter(
      (c) => languageOrms.has(c.value) && !fits.includes(c.value),
    ).map((c) => ({ ...c, unavailable: `Not for ${dbLabel}` })),
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
                    ? monorepoUnavailable(backend)
                    : undefined,
              }))}
              value={options.repo === 'single' ? 'single' : 'monorepo'}
              onChange={(layout) =>
                void setQuery({
                  repo: layout === 'single' ? 'single' : lastTool,
                })
              }
              onPick={(layout) => {
                if (layout === 'single') complete('repo', { repo: 'single' })
              }}
            />
            {options.repo !== 'single' && (
              <OptionGroup
                name="repo"
                legend="Monorepo tool"
                description="Plain setup, as the tool's own starter makes it."
                choices={MONOREPO_TOOLS}
                value={options.repo}
                onChange={(repo) => {
                  setLastTool(repo)
                  void setQuery({ repo })
                }}
                onPick={(repo) => complete('repo', { repo })}
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
            choices={DATABASES}
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
            onPick={(value) => complete('orm', { orm: value })}
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
            choices={FRONTENDS}
            value={options.frontend}
            onChange={(frontend) => void setQuery({ frontend })}
            onPick={(frontend) => complete('frontend', { frontend })}
          />
        )
    }
  }

  const remaining = STEPS.filter((step) => !done.has(step))

  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]
        lg:items-start"
    >
      <form
        aria-label="Project options"
        onSubmit={(e) => {
          e.preventDefault()
          // Enter or Continue records the open step
          if (open) complete(open)
        }}
        className="flex flex-col gap-3"
      >
        <Field
          data-invalid={nameTouched && nameError ? true : undefined}
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
            aria-invalid={nameTouched && nameError ? true : undefined}
            aria-describedby="project-name-help"
            className="font-mono"
          />
          {nameTouched && nameError ? (
            <FieldError>{nameError.replace(/^Name: /, '')}</FieldError>
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

      <section
        aria-labelledby="preview-heading"
        className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id="preview-heading" className="text-lg font-semibold">
              Preview
            </h2>
            <p className="text-sm text-muted-foreground">
              <span className="font-mono">{options.name || '…'}</span>
              {' · '}
              {STEPS.map((step) => summaries[step]).join(' · ')}
              {tree && (
                <span className="tabular-nums">
                  {' · '}
                  {Object.keys(tree).length} files
                </span>
              )}
            </p>
            {remaining.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Not picked yet, shown with defaults:{' '}
                {remaining.map((step) => TITLES[step]).join(', ')}.
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Button disabled aria-describedby="download-help">
              <Download aria-hidden="true" />
              Download .zip
            </Button>
            <p id="download-help" className="text-xs text-muted-foreground">
              Arrives with the Studio API.
            </p>
          </div>
        </div>

        {tree ? (
          <FilePreview tree={tree} selected={file} onSelect={setSelected} />
        ) : (
          <div
            role="status"
            className="flex min-h-48 flex-col items-center justify-center gap-2
              rounded-xl border border-dashed p-6 text-center"
          >
            <p className="font-medium">Nothing to preview yet</p>
            <ul className="text-sm text-muted-foreground">
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
