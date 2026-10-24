'use client'

import { type ReactNode, useState } from 'react'

import { FlexRender, type RowData } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import {
  DataTableFilters,
  DataTableToolbar,
} from '@repo/ui/components/data-table/filters'
import { DataTablePagination } from '@repo/ui/components/data-table/pagination'
import type { ListTable } from '@repo/ui/components/data-table/use-list-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table'
import { TooltipProvider } from '@repo/ui/components/tooltip'

export interface DataTableProps<TData extends RowData> {
  /** From `useListTable`. */
  list: ListTable<TData>
  /** Placeholder of the keyword box (API `keywordFields`); omit to hide it. */
  searchPlaceholder?: string
  emptyMessage?: ReactNode
  /** Choices of the rows-per-page select (API max: 100). */
  pageSizeOptions?: readonly number[]
}

/**
 * Filter panel (from `meta.filterVariant` columns) · toolbar (reset, filter
 * toggle, refresh, columns) · sortable headers · server pagination.
 */
export function DataTable<TData extends RowData>({
  list,
  searchPlaceholder,
  emptyMessage = 'No results.',
  pageSizeOptions,
}: DataTableProps<TData>) {
  const { table, result } = list
  const [showFilters, setShowFilters] = useState(true)
  const hasFilters =
    Boolean(searchPlaceholder) ||
    table.getAllLeafColumns().some((c) => c.columnDef.meta?.filterVariant)
  const rows = table.getRowModel().rows
  const colSpan = table.getVisibleLeafColumns().length

  return (
    // One tooltip group for the toolbar's icon buttons
    <TooltipProvider>
      <div className="flex flex-col gap-3">
        {hasFilters && showFilters && (
          <DataTableFilters list={list} searchPlaceholder={searchPlaceholder} />
        )}
        <DataTableToolbar
          list={list}
          hasFilters={hasFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((shown) => !shown)}
        />

        <div
          aria-busy={result.isFetching}
          className="overflow-hidden rounded-lg border aria-busy:opacity-70"
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sorted = header.column.getIsSorted()
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-2"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <FlexRender header={header} />
                            {sorted === 'asc' ? (
                              <ArrowUp aria-label="sorted ascending" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown aria-label="sorted descending" />
                            ) : (
                              <ArrowUpDown className="opacity-40" />
                            )}
                          </Button>
                        ) : (
                          <FlexRender header={header} />
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {result.isError ? (
                <TableRow>
                  <TableCell
                    role="alert"
                    colSpan={colSpan}
                    className="h-20 text-center text-destructive"
                  >
                    Could not load data.{' '}
                    <button
                      type="button"
                      className="underline"
                      onClick={() => void result.refetch()}
                    >
                      Retry
                    </button>
                  </TableCell>
                </TableRow>
              ) : rows.length ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={colSpan}
                    className="h-20 text-center text-muted-foreground"
                  >
                    {result.isPending ? 'Loading…' : emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination list={list} pageSizeOptions={pageSizeOptions} />
      </div>
    </TooltipProvider>
  )
}
