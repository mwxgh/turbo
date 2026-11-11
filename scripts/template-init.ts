/**
 * Turn a fresh copy of this base into a new project.
 *
 *   pnpm template:init --name acme-portal [--title "Acme Portal"] [--scope @acme] [--strip-examples] [--dry-run]
 *
 *   --name            kebab-case project name: root package, Docker Compose project, image tags,
 *                     Expo slug/scheme, JWT issuer (replaces "turbo-base")
 *   --title           display name in the web/mobile UI (default: from --name, "Acme Portal")
 *   --scope           npm scope of the internal packages (replaces "@repo/" everywhere, lockfile included)
 *   --strip-examples  remove the sample code: hellos CRUD (db, api, web, mobile, tests), the chat and
 *                     upload widgets of the web home page; migrations are squashed into one `init`
 *   --dry-run         print what would change, touch nothing
 *   --force           run on a dirty git working tree
 *
 * Kept on purpose: auth, files (S3 presign), health, the socket ChatGateway + packages/socket-events
 * (reference gateway; the socket e2e tests – auth, Redis scale-out – run on it).
 * New features afterwards: `pnpm gen resource` / `pnpm gen package`.
 */
import { execFileSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'

const ROOT = path.resolve(import.meta.dirname, '..')

const { values: args } = parseArgs({
  options: {
    name: { type: 'string' },
    title: { type: 'string' },
    scope: { type: 'string' },
    'strip-examples': { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
})

const DRY = args['dry-run']
const log = (message: string) =>
  console.log(DRY ? `[dry-run] ${message}` : message)

function fail(message: string): never {
  console.error(`✖ ${message}`)
  process.exit(1)
}

function sh(command: string, commandArgs: string[], cwd = ROOT): string {
  return execFileSync(command, commandArgs, { cwd, encoding: 'utf8' })
}

const abs = (file: string) => path.join(ROOT, file)
const read = (file: string) => readFileSync(abs(file), 'utf8')
function write(file: string, content: string) {
  if (!DRY) writeFileSync(abs(file), content)
}

/** Tracked text files (binary files and the generated Prisma types are skipped). */
function trackedTextFiles(): string[] {
  const binary = /\.(png|jpe?g|gif|ico|webp|woff2?|ttf|otf|pdf|zip|db)$/i
  return sh('git', ['ls-files', '-z'])
    .split('\0')
    .filter((f) => f && !binary.test(f) && existsSync(abs(f)))
}

/** Replace literal strings in every tracked text file; returns the files changed. */
function replaceEverywhere(pairs: [from: string, to: string][]): string[] {
  const changed: string[] = []
  for (const file of trackedTextFiles()) {
    const before = read(file)
    let after = before
    for (const [from, to] of pairs) after = after.split(from).join(to)
    if (after !== before) {
      write(file, after)
      changed.push(file)
    }
  }
  return changed
}

// --- Strip the sample code ------------------------------------------------

/** Files and folders that only exist for the samples. */
const SAMPLE_PATHS = [
  'apps/api/src/hellos',
  'apps/api/test/hellos.e2e-spec.ts',
  'apps/api/test/hellos-list.e2e-spec.ts',
  'apps/web/app/hellos',
  'apps/web/app/chat.tsx',
  'apps/web/app/chat.spec.tsx',
  'apps/web/app/upload-demo.tsx',
  'apps/web/lib/queries/hellos.ts',
  'apps/web/lib/queries/hellos.spec.ts',
  'apps/e2e/tests/hellos.spec.ts',
  'apps/e2e/tests/chat.spec.ts',
  'apps/e2e/tests/upload.spec.ts',
  'apps/mobile/src/app/hellos.tsx',
  'apps/mobile/src/components/hello-form.tsx',
  'apps/mobile/src/lib/queries/hellos.ts',
  'apps/mobile/src/lib/queries/hellos.spec.ts',
  'apps/mobile/src/lib/use-hello-mutations.ts',
]

/**
 * Exact edits in shared files. `find` must match the file as committed; when it does
 * not, `stillThere` tells "already stripped" (skip) from "file changed" (stop).
 */
interface Edit {
  file: string
  find: string | RegExp
  replace: string
  stillThere: RegExp
}

const SAMPLE_EDITS: Edit[] = [
  {
    file: 'apps/api/src/app.module.ts',
    find: "import { HellosModule } from './hellos/hellos.module'\n",
    replace: '',
    stillThere: /HellosModule } from/,
  },
  {
    file: 'apps/api/src/app.module.ts',
    find: '    HellosModule,\n',
    replace: '',
    stillThere: /^\s+HellosModule,$/m,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: "import Link from 'next/link'\n\n",
    replace: '',
    stillThere: /Hellos CRUD/,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: "import { buttonVariants } from '@repo/ui/components/button'\n\n",
    replace: '',
    stillThere: /Hellos CRUD/,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: "import { Chat } from './chat'\n",
    replace: '',
    stillThere: /from '\.\/chat'/,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: "import { UploadDemo } from './upload-demo'\n",
    replace: '',
    stillThere: /from '\.\/upload-demo'/,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: /<div className="flex items-center justify-between gap-4">\n\s*(<h1[^\n]*<\/h1>)\n\s*<Link href="\/hellos"[\s\S]*?<\/Link>\n\s*<\/div>/,
    replace: '$1',
    stillThere: /Hellos CRUD/,
  },
  {
    file: 'apps/web/app/page.tsx',
    find: '\n      <Chat />\n      <UploadDemo />',
    replace: '',
    stillThere: /<Chat \/>|<UploadDemo \/>/,
  },
  {
    file: 'apps/web/package.json',
    find: /\n\s*"@tanstack\/react-virtual": "[^"]*",/,
    replace: '',
    stillThere: /react-virtual/,
  },
  {
    file: 'apps/mobile/src/app/_layout.tsx',
    find: /\n\s*<Stack\.Screen name="hellos"[^\n]*\/>/,
    replace: '',
    stillThere: /name="hellos"/,
  },
  {
    file: 'apps/mobile/src/app/index.tsx',
    find: "import { Link } from 'expo-router'\n",
    replace: '',
    stillThere: /href="\/hellos"/,
  },
  {
    file: 'apps/mobile/src/app/index.tsx',
    find: /\n\s*<Link href="\/hellos" asChild>[\s\S]*?<\/Link>/,
    replace: '',
    stillThere: /href="\/hellos"/,
  },
  {
    file: 'packages/db/prisma/schema.prisma',
    find: /model Hello \{[\s\S]*?\n\}\n\n/,
    replace: '',
    stillThere: /^model Hello \{/m,
  },
  {
    file: 'packages/db/prisma/seed.ts',
    find: /async function seedHellos\(\) \{[\s\S]*?\n\}\n\n/,
    replace: '',
    stillThere: /seedHellos\(\) \{/,
  },
  {
    file: 'packages/db/prisma/seed.ts',
    find: '  await seedHellos()\n',
    replace: '',
    stillThere: /await seedHellos/,
  },
]

function applyEdits(edits: Edit[]): string[] {
  // Check every edit first: stop before touching anything when a file drifted
  const pending: Edit[] = []
  const drifted: string[] = []
  for (const edit of edits) {
    const content = read(edit.file)
    const matches =
      typeof edit.find === 'string'
        ? content.includes(edit.find)
        : edit.find.test(content)
    if (matches) pending.push(edit)
    else if (edit.stillThere.test(content))
      drifted.push(`${edit.file}: ${String(edit.find).slice(0, 80)}`)
  }
  if (drifted.length)
    fail(
      `These files changed since the template was written; edit them by hand, then rerun:\n  ${drifted.join('\n  ')}`,
    )

  const changed = new Set<string>()
  const contents = new Map<string, string>()
  for (const edit of pending) {
    const content = contents.get(edit.file) ?? read(edit.file)
    contents.set(edit.file, content.replace(edit.find, edit.replace))
    changed.add(edit.file)
  }
  for (const [file, content] of contents) write(file, content)
  return [...changed]
}

/** One `init` migration from the current schema (no database needed). */
function squashMigrations() {
  const dir = 'packages/db/prisma/migrations'
  const old = readdirSync(abs(dir)).filter(
    (entry) => entry !== 'migration_lock.toml',
  )
  log(`Squash migrations: remove ${old.join(', ')}`)
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
  const target = `${dir}/${stamp}_init/migration.sql`
  log(`Create ${target} (prisma migrate diff --from-empty)`)
  if (DRY) return
  for (const entry of old) rmSync(abs(`${dir}/${entry}`), { recursive: true })
  mkdirSync(path.dirname(abs(target)))
  const sql = sh(
    'pnpm',
    [
      'exec',
      'prisma',
      'migrate',
      'diff',
      '--from-empty',
      '--to-schema',
      'prisma/schema.prisma',
      '--script',
    ],
    abs('packages/db'),
  )
  writeFileSync(abs(target), sql)
}

function stripExamples(): string[] {
  const removed = SAMPLE_PATHS.filter((p) => existsSync(abs(p)))
  for (const p of removed) {
    log(`Remove ${p}`)
    if (!DRY) rmSync(abs(p), { recursive: true })
  }
  const edited = applyEdits(SAMPLE_EDITS)
  for (const file of edited) log(`Edit ${file}`)
  squashMigrations()
  return edited
}

// --- Main -----------------------------------------------------------------

function main() {
  if (args.help) {
    console.log(
      readFileSync(import.meta.filename, 'utf8')
        .split('*/')[0]!
        .replace(/^\/\*\*?|^ \* ?/gm, ''),
    )
    return
  }

  if (!args.name && !args.scope && !args['strip-examples'])
    fail('Nothing to do: pass --name, --scope and/or --strip-examples (--help)')
  if (args.name && !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(args.name))
    fail(`--name must be kebab-case, got "${args.name}"`)
  if (args.scope && !/^@[a-z0-9][a-z0-9-._]*$/.test(args.scope))
    fail(`--scope must look like @acme, got "${args.scope}"`)
  if (!args.force && !DRY && sh('git', ['status', '--porcelain']).trim())
    fail('Working tree is not clean: commit or stash first (or --force)')

  const touched = new Set<string>()

  // 1. Samples first: the edits match the committed text (scope / title still original)
  if (args['strip-examples'])
    for (const file of stripExamples()) touched.add(file)

  // 2. Project name + display title
  if (args.name) {
    const title =
      args.title ??
      args.name
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    const files = replaceEverywhere([
      ['turbo-base', args.name],
      ['turbobase', args.name.replaceAll('-', '')],
      ['Turborepo base', title],
      ['Turbo Base', title],
    ])
    log(
      `Rename turbo-base → ${args.name}, title → "${title}" (${files.length} files)`,
    )
    for (const file of files) touched.add(file)
  }

  // 3. Package scope (lockfile included, so the install below stays frozen-compatible)
  if (args.scope && args.scope !== '@repo') {
    const files = replaceEverywhere([['@repo/', `${args.scope}/`]])
    log(`Scope @repo/ → ${args.scope}/ (${files.length} files)`)
  }

  if (DRY) return

  // 4. Refresh install state, generated code and formatting
  console.log('pnpm install …')
  sh('pnpm', ['install', '--prefer-offline'])
  if (args['strip-examples']) {
    console.log('Regenerate Prisma client + @repo/types …')
    sh('pnpm', ['db:generate'])
    sh('pnpm', ['db:types'])
  }
  const formattable = [...touched].filter(
    (f) => existsSync(abs(f)) && /\.(ts|tsx|js|mjs|json|ya?ml|md)$/.test(f),
  )
  if (formattable.length)
    sh('pnpm', [
      'exec',
      'prettier',
      '--write',
      '--log-level=warn',
      ...formattable,
    ])

  console.log(`
✔ Done. Next:
  1. Review: git status && git diff
  2. Check: pnpm turbo run build lint check-types test
  3. Database: pnpm infra:up && pnpm db:deploy && pnpm db:seed (new local DB – old ones still have the sample tables)
  4. Update README.md / docs/ for the new project, then commit.
  New features: pnpm gen resource · new packages: pnpm gen package`)
}

main()
