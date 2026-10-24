'use client'

import { type ComponentProps, useState } from 'react'

import { cn } from 'cn'
import { format, isValid, parse } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { Calendar } from '@repo/ui/components/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover'

const ISO_DAY = 'yyyy-MM-dd'

const toDay = (value?: string) => {
  if (!value) return undefined
  const date = parse(value, ISO_DAY, new Date())
  return isValid(date) ? date : undefined
}

export interface DatePickerProps extends Omit<
  ComponentProps<typeof Button>,
  'value' | 'onChange'
> {
  /** Calendar day `YYYY-MM-DD`, `''` for none – what the API's date filters take. */
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Earliest / latest selectable day (`YYYY-MM-DD`). */
  min?: string
  max?: string
}

/** Day picker shown as dd/mm/yyyy whatever the browser locale, with a clear button. */
export function DatePicker({
  value,
  onChange,
  placeholder = 'dd/mm/yyyy',
  min,
  max,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const day = toDay(value)
  const before = toDay(min)
  const after = toDay(max)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn('relative', className)}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between pr-2 font-normal"
              {...props}
            />
          }
        >
          <span className={cn('truncate', !day && 'text-muted-foreground')}>
            {day ? format(day, 'dd/MM/yyyy') : placeholder}
          </span>
          {/* Room for the clear button, which sits over this spot */}
          {day && <span aria-hidden className="ml-auto size-4 shrink-0" />}
          <CalendarIcon className="text-muted-foreground" />
        </PopoverTrigger>
        {day && (
          <button
            type="button"
            aria-label="Clear date"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-8 -translate-y-1/2 rounded-sm
              p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={day}
          defaultMonth={day}
          disabled={[
            ...(before ? [{ before }] : []),
            ...(after ? [{ after }] : []),
          ]}
          onSelect={(next) => {
            onChange(next ? format(next, ISO_DAY) : '')
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
