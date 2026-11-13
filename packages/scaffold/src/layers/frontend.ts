import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'
import type { AppContext } from './app.js'
import { applyUpgrade, webUpgrade } from './modern-apps.js'

/** The todo screen, same for both frontends; only the API URL expression differs. */
function todoApp(apiUrl: string, directive: string) {
  return (
    directive +
    text`
      import { type FormEvent, useCallback, useEffect, useState } from 'react'

      import type { Todo } from '@app/types'

      const API = ${apiUrl} ?? 'http://localhost:3001/api'

      async function call<T>(path: string, init?: RequestInit): Promise<T> {
        const res = await fetch(\`\${API}\${path}\`, {
          ...init,
          headers: { 'content-type': 'application/json', ...init?.headers },
        })
        if (!res.ok) throw new Error(\`\${res.status} \${res.statusText}\`)
        return (res.status === 204 ? undefined : await res.json()) as T
      }

      export function TodoApp() {
        const [todos, setTodos] = useState<Todo[]>([])
        const [title, setTitle] = useState('')
        const [error, setError] = useState<string>()

        const load = useCallback(
          () =>
            call<Todo[]>('/todos')
              .then((list) => {
                setTodos(list)
                setError(undefined)
              })
              .catch(() => setError('Cannot reach the API. Is it running on port 3001?')),
          [],
        )

        useEffect(() => {
          void load()
        }, [load])

        async function add(event: FormEvent) {
          event.preventDefault()
          if (!title.trim()) return
          await call('/todos', { method: 'POST', body: JSON.stringify({ title }) })
          setTitle('')
          await load()
        }

        async function toggle(todo: Todo) {
          await call(\`/todos/\${todo.id}\`, {
            method: 'PATCH',
            body: JSON.stringify({ done: !todo.done }),
          })
          await load()
        }

        async function remove(todo: Todo) {
          await call(\`/todos/\${todo.id}\`, { method: 'DELETE' })
          await load()
        }

        return (
          <main className="page">
            <h1>Todos</h1>
            <form onSubmit={(e) => void add(e)} className="add">
              <label htmlFor="title" className="sr-only">
                New todo
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs doing?"
                maxLength={200}
              />
              <button type="submit">Add</button>
            </form>
            {error && <p role="alert" className="error">{error}</p>}
            <ul className="list">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input type="checkbox" checked={todo.done} onChange={() => void toggle(todo)} />
                    <span className={todo.done ? 'done' : undefined}>{todo.title}</span>
                  </label>
                  <button type="button" onClick={() => void remove(todo)} aria-label={\`Delete \${todo.title}\`}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {!error && todos.length === 0 && <p className="empty">Nothing yet: add your first todo.</p>}
          </main>
        )
      }
    `
  )
}

const css = text`
  :root {
    color-scheme: light dark;
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }
  body {
    margin: 0;
  }
  .page {
    max-width: 36rem;
    margin: 0 auto;
    padding: 3rem 1rem;
  }
  .add {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .add input {
    flex: 1;
  }
  input,
  button {
    font: inherit;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #8886;
  }
  button {
    cursor: pointer;
  }
  .list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.5rem;
  }
  .list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  .list label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .done {
    text-decoration: line-through;
    opacity: 0.6;
  }
  .error {
    color: #dc2626;
  }
  .empty {
    opacity: 0.7;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
`

const reactTypes = {
  '@types/react': V.typesReact,
  '@types/react-dom': V.typesReact,
  typescript: V.typescript,
}

/** The web app; paths are relative to its folder. */
export function frontendLayer(o: ScaffoldOptions, ctx: AppContext): FileTree {
  const files = plainFrontend(o, ctx)
  return ctx.modern ? applyUpgrade(files, webUpgrade(o)) : files
}

function plainFrontend(o: ScaffoldOptions, ctx: AppContext): FileTree {
  if (o.frontend === 'next')
    return {
      'package.json': json({
        name: 'web',
        version: '0.1.0',
        private: true,
        type: 'module',
        scripts: {
          dev: 'next dev --port 3000',
          build: 'next build',
          start: 'next start --port 3000',
          'check-types': 'next typegen && tsc --noEmit',
        },
        dependencies: {
          ...ctx.typesDependency,
          next: V.next,
          react: V.react,
          'react-dom': V.react,
        },
        devDependencies: { '@types/node': V.typesNode, ...reactTypes },
      }),
      'next.config.ts': text`
        import type { NextConfig } from 'next'

        const config: NextConfig = {}

        export default config
      `,
      'tsconfig.json': json({
        compilerOptions: {
          target: 'ES2023',
          lib: ['es2023', 'dom', 'dom.iterable'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          jsx: 'preserve',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          isolatedModules: true,
          allowJs: true,
          resolveJsonModule: true,
          esModuleInterop: true,
          incremental: false,
          plugins: [{ name: 'next' }],
          ...(ctx.typesPaths ? { paths: ctx.typesPaths } : {}),
        },
        include: [
          'next-env.d.ts',
          '**/*.ts',
          '**/*.tsx',
          '.next/types/**/*.ts',
        ],
        exclude: ['node_modules'],
      }),
      '.env.example': 'NEXT_PUBLIC_API_URL=http://localhost:3001/api\n',
      'app/layout.tsx': text`
        import './globals.css'

        export const metadata = { title: '${o.name}' }

        export default function RootLayout({ children }: { children: React.ReactNode }) {
          return (
            <html lang="en">
              <body>{children}</body>
            </html>
          )
        }
      `,
      'app/page.tsx': text`
        import { TodoApp } from './todo-app'

        export default function Home() {
          return <TodoApp />
        }
      `,
      'app/todo-app.tsx': todoApp(
        'process.env.NEXT_PUBLIC_API_URL',
        "'use client'\n\n",
      ),
      'app/globals.css': css,
    }

  return {
    'package.json': json({
      name: 'web',
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc --noEmit && vite build',
        preview: 'vite preview --port 3000',
        'check-types': 'tsc --noEmit',
      },
      dependencies: {
        ...ctx.typesDependency,
        react: V.react,
        'react-dom': V.react,
      },
      devDependencies: {
        '@vitejs/plugin-react': V.vitePluginReact,
        vite: V.vite,
        ...reactTypes,
      },
    }),
    'vite.config.ts': text`
      import react from '@vitejs/plugin-react'
      import { defineConfig } from 'vite'

      export default defineConfig({
        plugins: [react()],
        server: { port: 3000, strictPort: true },
      })
    `,
    'tsconfig.json': json({
      compilerOptions: {
        target: 'ES2023',
        lib: ['es2023', 'dom', 'dom.iterable'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        isolatedModules: true,
        types: ['vite/client'],
        ...(ctx.typesPaths ? { paths: ctx.typesPaths } : {}),
      },
      include: ['src', 'vite.config.ts'],
    }),
    '.env.example': 'VITE_API_URL=http://localhost:3001/api\n',
    'index.html': text`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${o.name}</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
    `,
    'src/main.tsx': text`
      import { StrictMode } from 'react'
      import { createRoot } from 'react-dom/client'

      import './styles.css'
      import { TodoApp } from './todo-app'

      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <TodoApp />
        </StrictMode>,
      )
    `,
    'src/todo-app.tsx': todoApp('import.meta.env.VITE_API_URL', ''),
    // Typed env variables (otherwise \`import.meta.env.X\` is \`any\`)
    'src/vite-env.d.ts': text`
      /// <reference types="vite/client" />

      interface ImportMetaEnv {
        readonly VITE_API_URL?: string
      }

      interface ImportMeta {
        readonly env: ImportMetaEnv
      }
    `,
    'src/styles.css': css,
  }
}
