'use client'

import { useState } from 'react'

import { Check, Copy, FileText, Folder } from 'lucide-react'

import type { FileTree } from '@repo/scaffold'
import { Button } from '@repo/ui/components/button'

interface FolderNode {
  name: string
  path: string
  folders: FolderNode[]
  files: { name: string; path: string }[]
}

/** Paths (already sorted folders-first by the generator) → nested folders. */
export function toFolders(paths: string[]): FolderNode {
  const root: FolderNode = { name: '', path: '', folders: [], files: [] }
  for (const path of paths) {
    const parts = path.split('/')
    let folder = root
    for (const part of parts.slice(0, -1)) {
      const sub = `${folder.path}${part}/`
      let next = folder.folders.find((f) => f.path === sub)
      if (!next) {
        next = { name: part, path: sub, folders: [], files: [] }
        folder.folders.push(next)
      }
      folder = next
    }
    folder.files.push({ name: parts.at(-1)!, path })
  }
  return root
}

function FolderItems({
  folder,
  selected,
  onSelect,
}: {
  folder: FolderNode
  selected: string
  onSelect: (path: string) => void
}) {
  return (
    <ul className="flex flex-col">
      {folder.folders.map((sub) => (
        <li key={sub.path}>
          {/* Native disclosure: keyboard and screen readers get expand / collapse for free */}
          <details open className="group/folder">
            <summary
              className="flex cursor-pointer list-none items-center gap-1.5
                rounded-md px-2 py-1 text-sm outline-none hover:bg-muted
                focus-visible:ring-3 focus-visible:ring-ring/50
                [&::-webkit-details-marker]:hidden"
            >
              <Folder
                aria-hidden="true"
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <span className="font-mono text-[13px]">{sub.name}</span>
            </summary>
            <div className="ml-3 border-l pl-1.5">
              <FolderItems
                folder={sub}
                selected={selected}
                onSelect={onSelect}
              />
            </div>
          </details>
        </li>
      ))}
      {folder.files.map((file) => (
        <li key={file.path}>
          <button
            type="button"
            onClick={() => onSelect(file.path)}
            aria-current={file.path === selected ? 'true' : undefined}
            className="flex w-full cursor-pointer items-center gap-1.5
              rounded-md px-2 py-1 text-left text-sm outline-none hover:bg-muted
              focus-visible:ring-3 focus-visible:ring-ring/50
              aria-[current]:bg-primary/10 aria-[current]:font-medium"
          >
            <FileText
              aria-hidden="true"
              className="size-3.5 shrink-0 text-muted-foreground"
            />
            <span className="truncate font-mono text-[13px]">{file.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/** File tree of the generated project and the content of the selected file. */
export function FilePreview({
  tree,
  selected,
  onSelect,
}: {
  tree: FileTree
  selected: string
  onSelect: (path: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const content = tree[selected] ?? ''
  const lines = content.split('\n').length - (content.endsWith('\n') ? 1 : 0)

  async function copy() {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="grid min-h-0 overflow-hidden rounded-xl border bg-card
        md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
    >
      <nav
        aria-label="Project files"
        className="max-h-72 overflow-auto border-b p-2 md:max-h-[36rem]
          md:border-r md:border-b-0"
      >
        <FolderItems
          folder={toFolders(Object.keys(tree))}
          selected={selected}
          onSelect={onSelect}
        />
      </nav>
      <section aria-label="File content" className="flex min-w-0 flex-col">
        <div
          className="flex items-center justify-between gap-2 border-b px-3 py-2"
        >
          <p className="min-w-0 font-mono text-xs [overflow-wrap:anywhere]">
            {selected}
            <span className="ml-2 text-muted-foreground tabular-nums">
              {lines} {lines === 1 ? 'line' : 'lines'}
            </span>
          </p>
          <Button variant="ghost" size="sm" onClick={() => void copy()}>
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </div>
        <pre
          tabIndex={0}
          aria-label={`Content of ${selected}`}
          className="max-h-[32rem] min-h-48 overflow-auto p-3 font-mono
            text-[13px] leading-relaxed outline-none focus-visible:ring-3
            focus-visible:ring-ring/50 focus-visible:ring-inset"
        >
          <code>{content}</code>
        </pre>
      </section>
    </div>
  )
}
