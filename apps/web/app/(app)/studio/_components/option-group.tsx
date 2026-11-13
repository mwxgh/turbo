import type { ReactNode } from 'react'

import { Badge } from '@repo/ui/components/badge'
import {
  FieldDescription,
  FieldLegend,
  FieldSet,
} from '@repo/ui/components/field'

export interface OptionChoice<T extends string> {
  value: T
  label: string
  description: string
  /** Shown but not selectable, with this reason (planned stack, ORM that does not fit). */
  unavailable?: string
}

/**
 * One axis of the stack as radio cards: native radios in a fieldset (arrow keys move between
 * choices), the whole card is the target, unavailable choices stay visible with their reason.
 */
export function OptionGroup<T extends string>({
  name,
  legend,
  description,
  choices,
  value,
  onChange,
  onPick,
  children,
}: {
  name: string
  legend: string
  description?: ReactNode
  choices: OptionChoice<T>[]
  value: T
  onChange: (value: T) => void
  /**
   * A choice clicked with a pointer (also when it was already selected): the caller may treat it
   * as "done". Arrow keys only move the selection, so keyboard users browse without being jumped
   * ahead; they confirm with Enter (the form submits).
   */
  onPick?: (value: T) => void
  /** Below the description (status messages). */
  children?: ReactNode
}) {
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      {children}
      <div className="grid gap-2 sm:grid-cols-2">
        {choices.map((choice) => {
          const id = `${name}-${choice.value}`
          return (
            <label
              key={choice.value}
              htmlFor={id}
              onClick={(event) => {
                // detail 0: a click the browser made from the keyboard (arrows, space)
                if (event.detail > 0 && !choice.unavailable) {
                  onChange(choice.value)
                  onPick?.(choice.value)
                }
              }}
              className="group relative flex cursor-pointer gap-3 rounded-lg
                border bg-card p-3 text-card-foreground
                transition-[border-color,background-color,box-shadow]
                duration-150 hover:border-foreground/25
                has-checked:border-primary has-checked:bg-primary/5
                has-focus-visible:border-ring has-focus-visible:ring-3
                has-focus-visible:ring-ring/50 has-disabled:cursor-not-allowed
                has-disabled:border-dashed has-disabled:bg-transparent
                has-disabled:hover:border-border motion-reduce:transition-none"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={choice.value}
                checked={value === choice.value}
                disabled={Boolean(choice.unavailable)}
                onChange={() => onChange(choice.value)}
                aria-describedby={`${id}-desc`}
                className="peer sr-only"
              />
              {/* Radio dot: the selected state is the filled dot + border, not colour alone */}
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-4 shrink-0 items-center
                  justify-center rounded-full border border-input
                  peer-checked:border-primary peer-disabled:opacity-50"
              >
                <span
                  className="size-2 scale-0 rounded-full bg-primary
                    transition-transform duration-150
                    group-has-checked:scale-100 motion-reduce:transition-none"
                />
              </span>
              <span
                className="flex min-w-0 flex-col gap-1 peer-disabled:opacity-60"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{choice.label}</span>
                  {choice.unavailable && (
                    <Badge variant="outline">{choice.unavailable}</Badge>
                  )}
                </span>
                <span
                  id={`${id}-desc`}
                  className="text-xs leading-relaxed text-pretty
                    text-muted-foreground"
                >
                  {choice.description}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </FieldSet>
  )
}
