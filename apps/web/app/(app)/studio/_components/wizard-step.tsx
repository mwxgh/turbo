import type { ReactNode, Ref } from 'react'

import { Check } from 'lucide-react'

import { Button } from '@repo/ui/components/button'

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
        className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3
          text-card-foreground"
      >
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center
            rounded-full bg-primary text-primary-foreground"
        >
          <Check className="size-3.5" />
        </span>
        <p className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs text-muted-foreground">
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
      className="flex flex-col gap-4 rounded-xl border border-primary/40 bg-card
        p-4 text-card-foreground shadow-xs"
    >
      {children}
      <div className="flex justify-end">
        <Button type="submit" size="sm">
          Continue
        </Button>
      </div>
    </div>
  )
}
