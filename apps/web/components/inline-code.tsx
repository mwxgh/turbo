/**
 * Short text where `backticks` mark code (quiz prompts, choices): code spans render like inline
 * code in a lesson, the rest stays plain text. No other Markdown.
 */
export function InlineCode({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const parts = text.split(/(`[^`\n]+`)/)
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </span>
  )
}
