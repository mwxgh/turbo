'use client'

import type { ReactNode } from 'react'

import {
  type ColumnDef,
  FlexRender,
  type RowData,
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table'

/**
 * Client-side features of every DataTable: sorting, global text filter and
 * pagination (TanStack Table v9 – only the registered features are bundled).
 */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, datetime: sortFn_datetime },
  filterFns: { includesString: filterFn_includesString },
})

export type DataTableFeatures = typeof dataTableFeatures
/** Same type as `helper.columns([...])` returns: columns may hold different value types. */
export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches TanStack's ColumnHelper.columns()
  any
>

/**
 * Typed column builder:
 *   const col = dataTableColumns<Hello>()
 *   const columns = col.columns([col.accessor('message', { header: 'Message' }), …])
 */
export const dataTableColumns = <TData extends RowData>() =>
  createColumnHelper<DataTableFeatures, TData>()

export interface DataTableProps<TData extends RowData> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  /** Placeholder of the search box; omit to hide it. */
  filterPlaceholder?: string
  pageSize?: number
  emptyMessage?: ReactNode
  getRowId?: (row: TData) => string
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterPlaceholder,
  pageSize = 10,
  emptyMessage = 'No results.',
  getRowId,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    globalFilterFn: 'includesString',
    initialState: { pagination: { pageIndex: 0, pageSize } },
  })
  const { pagination, globalFilter } = table.state
  const rows = table.getRowModel().rows
  const pageCount = Math.max(table.getPageCount(), 1)

  return (
    <div className="flex flex-col gap-3">
      {filterPlaceholder && (
        <Input
          aria-label={filterPlaceholder}
          placeholder={filterPlaceholder}
          value={(globalFilter as string | undefined) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-xs"
        />
      )}

      <div className="overflow-hidden rounded-lg border">
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
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        className="flex items-center justify-end gap-2 text-sm
          text-muted-foreground"
      >
        <span>
          Page {pagination.pageIndex + 1} / {pageCount}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
