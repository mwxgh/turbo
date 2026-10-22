'use client'

import type { ReactNode } from 'react'

import {
  type CellData,
  type ColumnDef,
  type RowData,
  type TableFeatures,
  columnVisibilityFeature,
  createColumnHelper,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'

/** Server-side tables: the API sorts and paginates, so no client row models. */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
})

export type DataTableFeatures = typeof dataTableFeatures
/** Same type as `helper.columns([...])` returns: columns may hold different value types. */
export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches TanStack's ColumnHelper.columns()
  any
>

export type FilterOption = string | { label: string; value: string }

/* eslint-disable @typescript-eslint/no-unused-vars -- declaration merging must repeat TanStack's type parameters */
declare module '@tanstack/react-table' {
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    /**
     * Field in the filter panel; the column id is the API filter key.
     * text → `{ contains }`, select → equals, dateRange → `{ from, to }` (whole days).
     */
    filterVariant?: 'text' | 'select' | 'dateRange'
    /** Choices of a `select` filter (e.g. `Object.values(Status)` of a Prisma enum). */
    filterOptions?: readonly FilterOption[]
    /** Defaults to the header text. */
    filterLabel?: string
    /** Placeholder of a `text` filter. */
    filterPlaceholder?: string
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * Typed column builder (column id = API field):
 *   const col = dataTableColumns<Hello>()
 *   col.accessor('message', { header: 'Message', enableSorting: true, meta: { filterVariant: 'text' } })
 */
export const dataTableColumns = <TData extends RowData>() =>
  createColumnHelper<DataTableFeatures, TData>()

export interface RowAction {
  /** Menu item text. */
  label: string
  icon: ReactNode
  onClick: () => void
  /** `destructive` (red) for delete-like actions. */
  variant?: 'default' | 'destructive'
  disabled?: boolean
}

/**
 * The row's actions in one "Actions" column: a ⋯ button opening a menu of
 * icon + label items (room for any number of actions). Return `false` for
 * actions that do not apply to a row:
 *   actionsColumn<Hello>((hello) => [
 *     { label: 'Edit', icon: <Pencil />, onClick: () => edit(hello) },
 *     canDelete && { label: 'Delete', icon: <Trash2 />, variant: 'destructive', onClick: … },
 *   ])
 */
export const actionsColumn = <TData extends RowData>(
  getActions: (row: TData) => (RowAction | false | null | undefined)[],
  header = 'Actions',
): DataTableColumn<TData> =>
  createColumnHelper<DataTableFeatures, TData>().display({
    id: 'actions',
    header,
    enableHiding: false,
    cell: ({ row }) => {
      const actions = getActions(row.original).filter(
        (action): action is RowAction => Boolean(action),
      )
      if (!actions.length) return null
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Row actions" />
            }
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-40">
            {actions.map(({ label, icon, ...item }) => (
              <DropdownMenuItem key={label} {...item}>
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  })
