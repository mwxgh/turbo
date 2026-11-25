import type { ReactNode, Ref } from 'react'

import { Check } from 'lucide-react'

import { Button } from '@repo/ui/components/button'

/** Keycap for the keyboard hint */
function Key({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="inline-flex h-5 min-w-5 items-center justify-center rounded
        border bg-muted px-1 font-mono text-[11px] text-foreground"
    >
      {children}
    </kbd>
  )
}

export type StepState = 'open' | 'done'

/**
 * One step of the Studio form. Open: its choices and a Continue button. Done: collapsed to the
 * recorded choice, with Change to open it again. Steps not reached yet are not rendered at all.
 */
export function WizardStep({
  index,
  title,
  summary,
  state,
  onEdit,
  ref,
  children,
}: {
  index: number
  title: string
  /** The recorded choice, shown when collapsed. */
  summary: string
  state: StepState
  onEdit: () => void
  /** The open step's container (focus moves into it when it opens). */
  ref?: Ref<HTMLDivElement>
  children: ReactNode
}) {
  if (state === 'done')
    return (
      <div
        className="flex items-center gap-3 rounded-xl border bg-card py-3 pr-3
          pl-4 text-card-foreground"
      >
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center
            rounded-full bg-emerald-500/10 text-emerald-700
            dark:bg-emerald-400/15 dark:text-emerald-300"
        >
          <Check className="size-3.5" />
        </span>
        <p className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs text-muted-foreground tabular-nums">
            {index}. {title}
          </span>
          <span className="truncate font-medium" title={summary}>
            {summary}
          </span>
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEdit}
          aria-label={`Change ${title.toLowerCase()}: ${summary}`}
        >
          Change
        </Button>
      </div>
    )

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 rounded-xl border bg-card p-4
        text-card-foreground shadow-xs"
    >
      {children}
      <div className="flex items-center justify-end gap-3 sm:justify-between">
        {/* The keyboard path (see OptionGroup): arrows move, Enter submits the form */}
        <span
          aria-hidden="true"
          className="hidden items-center gap-1 text-xs text-muted-foreground
            sm:flex"
        >
          <Key>↑</Key>
          <Key>↓</Key>
          <span className="mr-2 ml-0.5">choose</span>
          <Key>Enter</Key>
          <span className="ml-0.5">continue</span>
        </span>
        <Button type="submit" size="sm">
          Continue
        </Button>
      </div>
    </div>
  )
}
