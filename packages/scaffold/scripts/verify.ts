/**
 * Proves that generated projects work: for each supported combination (or the ones whose name
 * contains one of the CLI arguments) it writes the project to a temp folder, installs, starts the
 * database in Docker, runs the README's database step, builds, type-checks, starts the api and
 * walks the todo CRUD over HTTP.
 *
 *   pnpm --filter @repo/scaffold verify                 # all
 *   pnpm --filter @repo/scaffold verify prisma-mysql    # filter
 *
 * Needs Docker, pnpm and network access (npm registry, images).
 */
import { type SpawnSyncReturns, spawn, spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import { generate, supportedCombinations } from '../src/generate.js'
import { DATABASE_PROFILES } from '../src/layers/database.js'
import type { ScaffoldOptions } from '../src/options.js'

const ROOT = join(tmpdir(), 'turbo-studio-verify')

class StepError extends Error {
  constructor(
    readonly step: string,
    detail: string,
  ) {
    super(detail)
  }
}

function run(
  step: string,
  cmd: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv = {},
) {
  const res: SpawnSyncReturns<string> = spawnSync(cmd, args, {
    cwd,
    env: { ...process.env, CI: '1', ...env },
    encoding: 'utf8',
    timeout: 600_000,
  })
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

async function waitFor(
  step: string,
  check: () => boolean | Promise<boolean>,
  seconds: number,
) {
  for (let i = 0; i < seconds; i++) {
    if (
      await Promise.resolve()
        .then(check)
        .catch(() => false)
    )
      return
    await sleep(1000)
  }
  throw new StepError(step, `not ready after ${seconds}s`)
}

function startDatabase(o: ScaffoldOptions, port: number): string {
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
    mongodb: [],
  }
  const profile = DATABASE_PROFILES[o.database]
  const id = run(
    'docker run',
    'docker',
    [
      'run',
      '-d',
      '--rm',
      '-p',
      `127.0.0.1:${port}:${profile.port}`,
      ...env[o.database],
      profile.image,
    ],
    ROOT,
  ).trim()
  void db
  return id
}

const READY: Record<ScaffoldOptions['database'], string[]> = {
  postgres: ['pg_isready', '-U', 'app'],
  mysql: ['mysql', '-uapp', '-papp', '-h', '127.0.0.1', '-e', 'select 1'],
  mongodb: ['mongosh', '--quiet', '--eval', 'db.runCommand({ ping: 1 })'],
}

function schemaStep(o: ScaffoldOptions, api: string, env: NodeJS.ProcessEnv) {
  if (o.orm === 'prisma')
    run(
      'db:migrate',
      'pnpm',
      o.database === 'mongodb'
        ? ['db:migrate']
        : ['db:migrate', '--name', 'init'],
      api,
      env,
    )
  if (o.orm === 'drizzle') {
    run('db:generate', 'pnpm', ['db:generate'], api, env)
    run('db:migrate', 'pnpm', ['db:migrate'], api, env)
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
  for (const [path, content] of Object.entries(generate(o))) {
    mkdirSync(dirname(join(dir, path)), { recursive: true })
    writeFileSync(join(dir, path), content)
  }
  const api = join(dir, 'apps/api')
  const dbPort = await freePort()
  const apiPort = await freePort()
  const databaseUrl = DATABASE_PROFILES[o.database].url(o.name, dbPort)
  writeFileSync(
    join(api, '.env'),
    `PORT=${apiPort}\nWEB_ORIGIN=http://localhost:3000\nDATABASE_URL=${databaseUrl}\nDB_SYNCHRONIZE=true\n`,
  )
  const env = { DATABASE_URL: databaseUrl }

  run('pnpm install', 'pnpm', ['install'], dir)
  const container = startDatabase(o, dbPort)
  let server: ReturnType<typeof spawn> | undefined
  try {
    await waitFor(
      'database ready',
      () =>
        spawnSync('docker', ['exec', container, ...READY[o.database]])
          .status === 0,
      120,
    )
    // MySQL answers inside the container a little before it accepts TCP from outside
    if (o.database === 'mysql') await sleep(3000)
    schemaStep(o, api, env)
    run('build', 'pnpm', ['build'], dir)
    run('check-types', 'pnpm', ['check-types'], dir)

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
    spawnSync('docker', ['rm', '-f', container])
  }
}

const filters = process.argv.slice(2)
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
for (const o of combos) {
  const started = Date.now()
  process.stdout.write(`▶ ${o.name} … `)
  try {
    await verify(o)
    results.push({
      name: o.name,
      ok: true,
      seconds: (Date.now() - started) / 1000,
    })
    console.log('ok')
  } catch (error) {
    const step = error instanceof StepError ? error.step : 'unexpected'
    const detail = error instanceof Error ? error.message : String(error)
    results.push({
      name: o.name,
      ok: false,
      step,
      detail,
      seconds: (Date.now() - started) / 1000,
    })
    console.log(`FAILED at ${step}`)
  }
}
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
