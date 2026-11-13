/**
 * Proves that generated projects work: for each supported combination (or the ones whose name
 * contains one of the CLI arguments) it writes the project to a temp folder, installs, starts the
 * database in Docker, runs the README's database step, builds, type-checks, starts the api and
 * walks the todo CRUD over HTTP.
 *
 *   pnpm --filter @repo/scaffold verify                 # all, 3 at a time
 *   pnpm --filter @repo/scaffold verify mysql-prisma    # names containing a filter
 *   pnpm --filter @repo/scaffold verify --jobs=1        # one at a time (less RAM)
 *
 * Combinations run in parallel (--jobs, default 3: next build, type-aware lint and a database
 * each take ~1 GB); Oracle ones one at a time (its container alone takes ~2 GB). Each combination
 * has its own folder, ports and database container.
 *
 * Needs Docker, pnpm and network access (npm registry, images). Projects are written to
 * ~/.cache/turbo-studio-verify: Docker Desktop only bind-mounts folders it shares
 * (by default not $TMPDIR), and the MySQL init file is mounted like docker-compose.yml does.
 */
import { spawn } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'

import { formatTree } from '../src/format.js'
import { appDirs, generate, supportedCombinations } from '../src/generate.js'
import { DATABASE_PROFILES, DB_INIT_MOUNT } from '../src/layers/database.js'
import type { ScaffoldOptions } from '../src/options.js'

const ROOT = join(homedir(), '.cache', 'turbo-studio-verify')

class StepError extends Error {
  constructor(
    readonly step: string,
    detail: string,
  ) {
    super(detail)
  }
}

/** Runs a command without blocking the other combinations; resolves with its exit code and output. */
function exec(
  cmd: string,
  args: string[],
  options: { cwd?: string; env?: NodeJS.ProcessEnv; timeoutMs?: number } = {},
) {
  return new Promise<{ status: number | null; stdout: string; stderr: string }>(
    (resolve) => {
      const child = spawn(cmd, args, {
        cwd: options.cwd,
        env: { ...process.env, CI: '1', ...options.env },
      })
      let stdout = ''
      let stderr = ''
      child.stdout.on('data', (d: Buffer) => (stdout += d.toString()))
      child.stderr.on('data', (d: Buffer) => (stderr += d.toString()))
      const timer = setTimeout(
        () => child.kill('SIGKILL'),
        options.timeoutMs ?? 600_000,
      )
      child.on('error', (error) =>
        resolve({
          status: null,
          stdout,
          stderr: `${stderr}\n${error.message}`,
        }),
      )
      child.on('close', (status) => {
        clearTimeout(timer)
        resolve({ status, stdout, stderr })
      })
    },
  )
}

async function run(
  step: string,
  cmd: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv = {},
) {
  const res = await exec(cmd, args, { cwd, env })
  if (res.status !== 0)
    throw new StepError(
      step,
      `${res.stdout}\n${res.stderr}`.trim().split('\n').slice(-25).join('\n'),
    )
  return res.stdout
}

const freePort = () =>
  new Promise<number>((resolve) => {
    const server = createServer().listen(0, '127.0.0.1', () => {
      const { port } = server.address() as { port: number }
      server.close(() => resolve(port))
    })
  })

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

class DatabaseExited extends Error {}

async function dockerLogs(container: string) {
  const logs = await exec('docker', ['logs', '--tail', '25', container])
  return `${logs.stdout}\n${logs.stderr}`.trim() || 'container exited'
}

async function waitFor(
  step: string,
  check: () => boolean | Promise<boolean>,
  seconds: number,
) {
  for (let i = 0; i < seconds; i++) {
    if (
      await Promise.resolve()
        .then(check)
        .catch((error: unknown) => {
          if (error instanceof DatabaseExited)
            throw new StepError(step, error.message)
          return false
        })
    )
      return
    await sleep(1000)
  }
  throw new StepError(step, `not ready after ${seconds}s`)
}

async function startDatabase(
  o: ScaffoldOptions,
  port: number,
  dir: string,
): Promise<string> {
  const db = o.database.replace(/-/g, '_')
  const name = o.name.replace(/-/g, '_')
  const env: Record<typeof o.database, string[]> = {
    postgres: [
      '-e',
      'POSTGRES_USER=app',
      '-e',
      'POSTGRES_PASSWORD=app',
      '-e',
      `POSTGRES_DB=${name}`,
    ],
    mysql: [
      '-e',
      'MYSQL_USER=app',
      '-e',
      'MYSQL_PASSWORD=app',
      '-e',
      `MYSQL_DATABASE=${name}`,
      '-e',
      'MYSQL_ROOT_PASSWORD=root',
    ],
    oracle: [
      '-e',
      'ORACLE_PASSWORD=oracle',
      '-e',
      'APP_USER=app',
      '-e',
      'APP_USER_PASSWORD=app',
    ],
    mongodb: [],
  }
  const profile = DATABASE_PROFILES[o.database]
  const id = await run(
    'docker run',
    'docker',
    [
      'run',
      '-d',
      '--rm',
      '-p',
      `127.0.0.1:${port}:${profile.port}`,
      ...env[o.database],
      // the generated init file, as docker-compose.yml mounts it
      ...(profile.init
        ? ['-v', `${join(dir, profile.init.path)}:${DB_INIT_MOUNT}:ro`]
        : []),
      profile.image,
    ],
    ROOT,
  )
  void db
  return id.trim()
}

const READY: Record<ScaffoldOptions['database'], string[]> = {
  postgres: ['pg_isready', '-U', 'app'],
  mysql: ['mysql', '-uapp', '-papp', '-h', '127.0.0.1', '-e', 'select 1'],
  oracle: ['healthcheck.sh'],
  mongodb: ['mongosh', '--quiet', '--eval', 'db.runCommand({ ping: 1 })'],
}

/** Oracle creates its database and the app user on first start: give it longer. */
const READY_SECONDS: Record<ScaffoldOptions['database'], number> = {
  postgres: 120,
  mysql: 120,
  oracle: 600,
  mongodb: 120,
}

async function schemaStep(
  o: ScaffoldOptions,
  api: string,
  env: NodeJS.ProcessEnv,
) {
  if (o.orm === 'prisma')
    await run(
      'db:migrate',
      'pnpm',
      o.database === 'mongodb'
        ? ['db:migrate']
        : ['db:migrate', '--name', 'init'],
      api,
      env,
    )
  if (o.orm === 'drizzle') {
    await run('db:generate', 'pnpm', ['db:generate'], api, env)
    await run('db:migrate', 'pnpm', ['db:migrate'], api, env)
  }
  // TypeORM: synchronize on start (DB_SYNCHRONIZE=true)
}

async function http(
  base: string,
  method: string,
  path: string,
  body?: unknown,
) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const text = await res.text()
  return {
    status: res.status,
    json: text ? (JSON.parse(text) as unknown) : undefined,
  }
}

function expectThat(step: string, ok: boolean, detail: unknown) {
  if (!ok) throw new StepError(step, JSON.stringify(detail))
}

async function smoke(base: string) {
  const created = await http(base, 'POST', '/todos', { title: 'Buy milk' })
  const todo = created.json as {
    id: string
    title: string
    done: boolean
    createdAt: string
  }
  expectThat(
    'POST /todos',
    created.status === 201 && todo.title === 'Buy milk' && todo.done === false,
    created,
  )
  const listed = await http(base, 'GET', '/todos')
  expectThat(
    'GET /todos',
    listed.status === 200 &&
      (listed.json as { id: string }[]).some((t) => t.id === todo.id),
    listed,
  )
  const patched = await http(base, 'PATCH', `/todos/${todo.id}`, { done: true })
  expectThat(
    'PATCH /todos/:id',
    patched.status === 200 && (patched.json as { done: boolean }).done,
    patched,
  )
  const invalid = await http(base, 'POST', '/todos', { title: '' })
  expectThat('POST /todos (invalid)', invalid.status === 400, invalid)
  const missing = await http(base, 'PATCH', '/todos/not-an-id', { done: true })
  expectThat('PATCH unknown id', missing.status === 404, missing)
  const deleted = await http(base, 'DELETE', `/todos/${todo.id}`)
  expectThat('DELETE /todos/:id', deleted.status === 204, deleted)
  const after = await http(base, 'GET', '/todos')
  expectThat('GET after delete', (after.json as unknown[]).length === 0, after)
}

async function verify(o: ScaffoldOptions) {
  const dir = join(ROOT, o.name)
  rmSync(dir, { recursive: true, force: true })
  // Formatted like the downloaded project (monorepo: its .prettierrc; separate folders: as is)
  for (const [path, content] of Object.entries(await formatTree(generate(o)))) {
    mkdirSync(dirname(join(dir, path)), { recursive: true })
    writeFileSync(join(dir, path), content)
  }
  const dirs = appDirs(o)
  const api = join(dir, dirs.api)
  // Monorepo: one install / build at the root (turbo or nx); single: each app on its own
  const roots = o.repo === 'single' ? [api, join(dir, dirs.web)] : [dir]
  const dbPort = await freePort()
  const apiPort = await freePort()
  const databaseUrl = DATABASE_PROFILES[o.database].url(o.name, dbPort)
  writeFileSync(
    join(api, '.env'),
    `PORT=${apiPort}\nWEB_ORIGIN=http://localhost:3000\nDATABASE_URL=${databaseUrl}\nDB_SYNCHRONIZE=true\n`,
  )
  const env = { DATABASE_URL: databaseUrl }

  for (const root of roots) await run('pnpm install', 'pnpm', ['install'], root)
  const container = await startDatabase(o, dbPort, dir)
  let server: ReturnType<typeof spawn> | undefined
  try {
    await waitFor(
      'database ready',
      async () => {
        const state = await exec('docker', [
          'inspect',
          '-f',
          '{{.State.Running}}',
          container,
        ])
        // the container exited (--rm): fail now with its logs instead of waiting the timeout
        if (state.stdout.trim() !== 'true')
          throw new DatabaseExited(await dockerLogs(container))
        const ready = await exec(
          'docker',
          ['exec', container, ...READY[o.database]],
          { timeoutMs: 30_000 },
        )
        return ready.status === 0
      },
      READY_SECONDS[o.database],
    )
    // MySQL answers inside the container a little before it accepts TCP from outside
    if (o.database === 'mysql') await sleep(3000)
    await schemaStep(o, api, env)
    for (const root of roots) await run('build', 'pnpm', ['build'], root)
    for (const root of roots)
      await run('check-types', 'pnpm', ['check-types'], root)
    // Monorepo setup: the CI checks of the generated project
    if (o.repo !== 'single') {
      await run('format:check', 'pnpm', ['format:check'], dir)
      await run('lint', 'pnpm', ['lint'], dir)
    }

    let output = ''
    server = spawn('node', ['--env-file=.env', 'dist/main.js'], {
      cwd: api,
      env: process.env,
    })
    server.stdout?.on('data', (d: Buffer) => (output += d.toString()))
    server.stderr?.on('data', (d: Buffer) => (output += d.toString()))
    const base = `http://127.0.0.1:${apiPort}/api`
    await waitFor(
      'api start',
      async () => (await fetch(`${base}/health`)).ok,
      60,
    ).catch(() => {
      throw new StepError('api start', output.split('\n').slice(-25).join('\n'))
    })
    await smoke(base)
  } finally {
    server?.kill()
    // -v: the database images declare VOLUMEs; without it every run leaves an anonymous volume
    await exec('docker', ['rm', '-f', '-v', container])
  }
}

const args = process.argv.slice(2)
const jobsArg = args.find((a) => a.startsWith('--jobs='))
const jobs = Math.max(1, Number(jobsArg?.slice('--jobs='.length) ?? 3) || 3)
const filters = args.filter((a) => !a.startsWith('--'))
const combos = supportedCombinations().filter(
  (o) => !filters.length || filters.some((f) => o.name.includes(f)),
)
mkdirSync(ROOT, { recursive: true })
const results: {
  name: string
  ok: boolean
  step?: string
  detail?: string
  seconds: number
}[] = []

/** One Oracle container at a time: it alone takes ~2 GB of RAM. */
let oracleBusy: Promise<void> = Promise.resolve()

async function verifyOne(o: ScaffoldOptions) {
  let release = () => {}
  if (o.database === 'oracle') {
    const previous = oracleBusy
    oracleBusy = new Promise((resolve) => (release = resolve))
    await previous
  }
  const started = Date.now()
  console.log(`▶ ${o.name}`)
  try {
    await verify(o)
    const seconds = (Date.now() - started) / 1000
    results.push({ name: o.name, ok: true, seconds })
    console.log(`  ok ${o.name} (${seconds.toFixed(0)}s)`)
  } catch (error) {
    const step = error instanceof StepError ? error.step : 'unexpected'
    const detail = error instanceof Error ? error.message : String(error)
    const seconds = (Date.now() - started) / 1000
    results.push({ name: o.name, ok: false, step, detail, seconds })
    console.log(`  FAILED at ${step}: ${o.name} (${seconds.toFixed(0)}s)`)
  } finally {
    release()
  }
}

const started = Date.now()
const queue = [...combos]
await Promise.all(
  Array.from({ length: Math.min(jobs, queue.length) }, async () => {
    for (let o = queue.shift(); o; o = queue.shift()) await verifyOne(o)
  }),
)
console.log(
  `\n${results.filter((r) => r.ok).length}/${results.length} ok in ${((Date.now() - started) / 60_000).toFixed(1)} min (${jobs} at a time)`,
)
results.sort((a, b) => a.name.localeCompare(b.name))
console.log(
  '\n' +
    results
      .map(
        (r) =>
          `${r.ok ? '✓' : '✗'} ${r.name} (${r.seconds.toFixed(0)}s)${r.ok ? '' : ` – ${r.step}`}`,
      )
      .join('\n'),
)
for (const r of results.filter((x) => !x.ok))
  console.log(`\n=== ${r.name} @ ${r.step}\n${r.detail}`)
process.exitCode = results.every((r) => r.ok) ? 0 : 1
