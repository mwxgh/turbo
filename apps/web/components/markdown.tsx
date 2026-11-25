import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { cn } from '@repo/ui/lib/utils'

/** Tailwind styles per element (no typography plugin): readable lessons and AI answers. */
const components: Components = {
  h1: ({ node: _, ...props }) => (
    <h2 className="mt-2 text-2xl font-medium tracking-tight" {...props} />
  ),
  h2: ({ node: _, ...props }) => (
    <h2 className="mt-4 text-xl font-medium tracking-tight" {...props} />
  ),
  h3: ({ node: _, ...props }) => (
    <h3 className="mt-2 text-lg font-medium" {...props} />
  ),
  p: ({ node: _, ...props }) => (
    <p className="leading-relaxed text-pretty" {...props} />
  ),
  ul: ({ node: _, ...props }) => (
    <ul className="flex list-disc flex-col gap-1.5 pl-5" {...props} />
  ),
  ol: ({ node: _, ...props }) => (
    <ol className="flex list-decimal flex-col gap-1.5 pl-5" {...props} />
  ),
  li: ({ node: _, ...props }) => <li className="leading-relaxed" {...props} />,
  a: ({ node: _, ...props }) => (
    <a
      className="font-medium underline underline-offset-4 hover:text-primary"
      target={props.href?.startsWith('/') ? undefined : '_blank'}
      rel="noreferrer"
      {...props}
    />
  ),
  blockquote: ({ node: _, ...props }) => (
    <blockquote
      className="border-l-2 pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  pre: ({ node: _, ...props }) => (
    <pre
      className="overflow-x-auto rounded-xl border bg-muted/50 p-4 text-sm
        leading-relaxed"
      {...props}
    />
  ),
  code: ({ node: _, className, ...props }) => (
    <code
      className={cn(
        'font-mono text-[0.9em]',
        // Inline code: no language class from a fence
        !className?.includes('language-') &&
          'rounded-md bg-muted px-1.5 py-0.5 [pre_&]:bg-transparent [pre_&]:p-0',
        className,
      )}
      {...props}
    />
  ),
  table: ({ node: _, ...props }) => (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: ({ node: _, ...props }) => (
    <th
      className="border-b bg-muted/50 px-3 py-2 text-left font-medium"
      {...props}
    />
  ),
  td: ({ node: _, ...props }) => (
    <td
      className="border-b px-3 py-2 align-top [tr:last-child_&]:border-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-2" />,
}

/** GitHub-flavoured Markdown with highlighted code. Raw HTML in the source is not rendered. */
export function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-4', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
