'use client'

import type { RowData } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import type { ListTable } from '@repo/ui/components/data-table/use-list-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const

/**
 * Page numbers to show around the current one (1-based), `null` for a gap:
 * pageItems(5, 10) → [1, null, 4, 5, 6, null, 10]
 */
export function pageItems(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  // Always 7 slots, so the bar keeps its width while paging
  const start = Math.min(Math.max(current - 1, 2), total - 4)
  const end = Math.max(Math.min(current + 1, total - 1), 5)
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  return [
    1,
    ...(start > 2 ? [null] : []),
    ...middle,
    ...(end < total - 1 ? [null] : []),
    total,
  ]
}

export interface DataTablePaginationProps<TData extends RowData> {
  list: ListTable<TData>
  pageSizeOptions?: readonly number[]
}

export function DataTablePagination<TData extends RowData>({
  list: { table, result },
  pageSizeOptions = PAGE_SIZE_OPTIONS,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const total = result.data?.total ?? 0
  const pageCount = Math.max(table.getPageCount(), 1)
  const page = pageIndex + 1
  const from = total ? pageIndex * pageSize + 1 : 0
  const to = Math.min(page * pageSize, total)

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm
        text-muted-foreground"
    >
      <span className="mr-auto">
        {total ? `Showing ${from}–${to} of ${total}` : 'No rows'}
      </span>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline">Rows per page</span>
        <Select
          value={pageSize}
          onValueChange={(size) =>
            size && table.setPagination({ pageIndex: 0, pageSize: size })
          }
        >
          <SelectTrigger size="sm" aria-label="Rows per page" className="w-18">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="First page"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        {pageItems(page, pageCount).map((item, i) =>
          item === null ? (
            <span key={`gap-${i}`} aria-hidden className="w-7 text-center">
              …
            </span>
          ) : (
            <Button
              key={item}
              variant={item === page ? 'default' : 'ghost'}
              size="icon-sm"
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => table.setPageIndex(item - 1)}
            >
              {item}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Last page"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
    </nav>
  )
}
