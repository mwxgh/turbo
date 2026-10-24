'use client'

import {
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import {
  type ReactTable,
  type RowData,
  type SortingState,
  functionalUpdate,
  useTable,
} from '@tanstack/react-table'
import { useQueryStates } from 'nuqs'

import {
  type DataTableColumn,
  type DataTableFeatures,
  dataTableFeatures,
} from '@repo/ui/components/data-table/columns'
import {
  listTableParsers,
  toListQuery,
} from '@repo/ui/components/data-table/server'
import type { ListQuery, Paginated } from '@repo/utils'

/** What `useListTable` returns – everything `<DataTable>` renders from. */
export interface ListTable<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  result: UseQueryResult<Paginated<TData>>
  keyword: string
  /** The API `filter` object (`{ field: value | { op: value } }`). */
  filter: Record<string, unknown>
  /** `undefined` removes the field's filter. */
  setFilter: (field: string, value: unknown) => void
  setKeyword: (keyword: string) => void
  resetFilters: () => void
}

export interface UseListTableOptions<
  TData extends RowData,
  TQueryKey extends QueryKey = QueryKey,
> {
  /** Column ids are API field names: `enableSorting` / `meta.filterVariant` opt in. */
  columns: DataTableColumn<TData>[]
  /** Query options for one API query – the same function the page prefetches with. */
  listQuery: (
    query: ListQuery,
  ) => UseQueryOptions<Paginated<TData>, Error, Paginated<TData>, TQueryKey>
  getRowId?: (row: TData) => string
}

const EMPTY: never[] = []

/**
 * Server-side table: pagination, sorting, keyword and column filters live in
 * the URL (nuqs), are sent to the API as a `ListQuery`, and the page comes back
 * through TanStack Query. Render it with `<DataTable list={…} />`.
 */
export function useListTable<
  TData extends RowData,
  TQueryKey extends QueryKey = QueryKey,
>({
  columns,
  listQuery,
  getRowId,
}: UseListTableOptions<TData, TQueryKey>): ListTable<TData> {
  const [state, setState] = useQueryStates(listTableParsers)
  const result = useQuery({
    ...listQuery(toListQuery(state)),
    // Keep the current rows while the next page / filter loads
    placeholderData: keepPreviousData,
  })

  const pagination = { pageIndex: state.page - 1, pageSize: state.pageSize }
  const sorting: SortingState = state.sortBy
    ? [{ id: state.sortBy, desc: state.sortDir === 'desc' }]
    : []

  const table = useTable({
    features: dataTableFeatures,
    columns,
    data: result.data?.items ?? EMPTY,
    getRowId,
    rowCount: result.data?.total ?? 0,
    manualPagination: true,
    manualSorting: true,
    enableMultiSort: false,
    // Sorting is opt-in per column (`enableSorting: true`)
    defaultColumn: { enableSorting: false },
    state: { pagination, sorting },
    onPaginationChange: (updater) => {
      const next = functionalUpdate(updater, pagination)
      void setState({ page: next.pageIndex + 1, pageSize: next.pageSize })
    },
    onSortingChange: (updater) => {
      const [sort] = functionalUpdate(updater, sorting)
      void setState({
        sortBy: sort?.id ?? null,
        sortDir: sort ? (sort.desc ? 'desc' : 'asc') : null,
        page: 1,
      })
    },
  })

  const filter = state.filter ?? {}

  return {
    table,
    result,
    keyword: state.keyword ?? '',
    filter,
    setFilter: (field: string, value: unknown) => {
      const { [field]: _removed, ...rest } = filter
      const next = value === undefined ? rest : { ...rest, [field]: value }
      void setState({
        filter: Object.keys(next).length ? next : null,
        page: 1,
      })
    },
    setKeyword: (keyword: string) => {
      void setState({ keyword: keyword || null, page: 1 })
    },
    resetFilters: () => {
      void setState({ keyword: null, filter: null, page: 1 })
    },
  }
}
