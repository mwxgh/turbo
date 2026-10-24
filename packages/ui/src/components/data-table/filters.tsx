'use client'

import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useId,
  useState,
} from 'react'

import type { RowData } from '@tanstack/react-table'
import { cn } from 'cn'
import { Columns3, Eraser, Filter, RefreshCw } from 'lucide-react'

import type { FilterOption } from '@repo/ui/components/data-table/columns'
import type { ListTable } from '@repo/ui/components/data-table/use-list-table'
import { DatePicker } from '@repo/ui/components/date-picker'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { IconButton } from '@repo/ui/components/icon-button'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'

interface LabelledColumn {
  id: string
  columnDef: { header?: unknown; meta?: { filterLabel?: string } }
}

/** `meta.filterLabel`, else the header text, else the column id. */
export const columnLabel = ({ id, columnDef }: LabelledColumn) =>
  columnDef.meta?.filterLabel ??
  (typeof columnDef.header === 'string' ? columnDef.header : id)

const asRecord = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : {}
const asString = (value: unknown) => (typeof value === 'string' ? value : '')

/** Number of active filters (keyword included) – shown on the toggle. */
export const activeFilterCount = ({
  filter,
  keyword,
}: Pick<ListTable<RowData>, 'filter' | 'keyword'>) =>
  Object.keys(filter).length + (keyword ? 1 : 0)

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

/** Grid of labelled filters: the keyword box + one field per `meta.filterVariant` column. */
export function DataTableFilters<TData extends RowData>({
  list,
  searchPlaceholder,
}: {
  list: ListTable<TData>
  searchPlaceholder?: string
}) {
  const uid = useId()
  const { table, filter, keyword } = list

  return (
    <div
      // As many 12rem+ columns as the container (not the viewport) fits
      className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-4
        gap-y-3 rounded-lg border p-4"
    >
      {searchPlaceholder && (
        <Field id={`${uid}-keyword`} label="Search">
          <DebouncedInput
            id={`${uid}-keyword`}
            placeholder={searchPlaceholder}
            value={keyword}
            onChange={list.setKeyword}
          />
        </Field>
      )}
      {table.getAllLeafColumns().map((column) => {
        const meta = column.columnDef.meta
        const id = `${uid}-${column.id}`
        const label = columnLabel(column)
        const value = filter[column.id]
        const set = (next: unknown) => list.setFilter(column.id, next)

        switch (meta?.filterVariant) {
          case 'text':
            return (
              <Field key={column.id} id={id} label={label}>
                <DebouncedInput
                  id={id}
                  placeholder={
                    meta.filterPlaceholder ?? `Search ${label.toLowerCase()}…`
                  }
                  value={asString(asRecord(value).contains)}
                  onChange={(text) =>
                    set(text ? { contains: text } : undefined)
                  }
                />
              </Field>
            )
          case 'select':
            return (
              <Field key={column.id} id={id} label={label}>
                <SelectFilter
                  id={id}
                  options={meta.filterOptions ?? []}
                  value={asString(value) || null}
                  onChange={(next) => set(next ?? undefined)}
                />
              </Field>
            )
          case 'dateRange': {
            // One field per bound, like "From date" / "To date"
            const from = asString(asRecord(value).from)
            const to = asString(asRecord(value).to)
            const setRange = (next: { from: string; to: string }) =>
              set(
                next.from || next.to
                  ? {
                      ...(next.from && { from: next.from }),
                      ...(next.to && { to: next.to }),
                    }
                  : undefined,
              )
            return [
              <Field
                key={`${column.id}-from`}
                id={`${id}-from`}
                label={`${label} from`}
              >
                <DatePicker
                  id={`${id}-from`}
                  value={from}
                  max={to || undefined}
                  onChange={(day) => setRange({ from: day, to })}
                />
              </Field>,
              <Field
                key={`${column.id}-to`}
                id={`${id}-to`}
                label={`${label} to`}
              >
                <DatePicker
                  id={`${id}-to`}
                  value={to}
                  min={from || undefined}
                  onChange={(day) => setRange({ from, to: day })}
                />
              </Field>,
            ]
          }
          default:
            return null
        }
      })}
    </div>
  )
}

/** Reset · filter toggle (with active count) · refresh · column visibility – icons with tooltips. */
export function DataTableToolbar<TData extends RowData>({
  list,
  hasFilters,
  showFilters,
  onToggleFilters,
}: {
  list: ListTable<TData>
  hasFilters: boolean
  showFilters: boolean
  onToggleFilters: () => void
}) {
  const active = activeFilterCount(list)
  const hideable = list.table
    .getAllLeafColumns()
    .filter((c) => c.getCanHide() && typeof c.columnDef.header === 'string')

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {hasFilters && (
        <>
          <IconButton
            label="Reset filters"
            variant={active ? 'default' : 'outline'}
            disabled={!active}
            onClick={list.resetFilters}
          >
            <Eraser />
          </IconButton>
          <IconButton
            label={showFilters ? 'Hide filters' : 'Show filters'}
            aria-expanded={showFilters}
            className="relative"
            onClick={onToggleFilters}
          >
            <Filter />
            {active > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4
                  items-center justify-center rounded-full bg-primary px-1
                  text-[10px] font-semibold text-primary-foreground
                  tabular-nums"
              >
                {active}
              </span>
            )}
          </IconButton>
        </>
      )}
      <IconButton label="Refresh" onClick={() => void list.result.refetch()}>
        <RefreshCw className={cn(list.result.isFetching && 'animate-spin')} />
      </IconButton>
      {hideable.length > 0 && (
        <DropdownMenu>
          <IconButton label="Columns" render={<DropdownMenuTrigger />}>
            <Columns3 />
          </IconButton>
          <DropdownMenuContent align="end">
            {hideable.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(visible) => column.toggleVisibility(visible)}
              >
                {columnLabel(column)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

/** Text input that reports changes after typing pauses (one request, not one per key). */
function DebouncedInput({
  value,
  onChange,
  delay = 300,
  ...props
}: Omit<ComponentProps<typeof Input>, 'value' | 'onChange'> & {
  value: string
  onChange: (value: string) => void
  delay?: number
}) {
  const [draft, setDraft] = useState(value)
  const [synced, setSynced] = useState(value)
  // Outside change (reset, back button): show it – but not our own echo,
  // which would eat a trailing space the user is still typing
  if (value !== synced) {
    setSynced(value)
    if (value !== draft.trim()) setDraft(value)
  }
  const emit = useEffectEvent(onChange)
  useEffect(() => {
    if (draft.trim() === synced) return
    const timer = setTimeout(() => emit(draft.trim()), delay)
    return () => clearTimeout(timer)
  }, [draft, synced, delay])

  return (
    <Input
      {...props}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
    />
  )
}

function SelectFilter({
  id,
  options,
  value,
  onChange,
}: {
  id: string
  options: readonly FilterOption[]
  value: string | null
  onChange: (value: string | null) => void
}) {
  const items = [
    { label: 'All', value: null },
    ...options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
  ]
  return (
    <Select items={items} value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value ?? ''} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
