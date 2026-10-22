import {
  createLoader,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server'

import { DEFAULT_PAGE_SIZE, type ListQuery } from '@repo/utils'

/**
 * URL state of a list table, in the API's own shape (`?page=2&sortBy=…&filter={…}`):
 * links are readable, and the server can prefetch without the column config.
 * Shared by `useListTable` (client) and `loadListTableState` (page prefetch).
 */
export const listTableParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  sortBy: parseAsString,
  sortDir: parseAsStringLiteral(['asc', 'desc'] as const),
  keyword: parseAsString,
  filter: parseAsJson((value) =>
    typeof value === 'object' && value !== null && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null,
  ),
}

/** Page prefetch: `toListQuery(await loadListTableState(searchParams))`. */
export const loadListTableState = createLoader(listTableParsers)

export type ListTableState = Awaited<ReturnType<typeof loadListTableState>>

/** The API query for a table state – the same object on server and client (query key). */
export function toListQuery(state: ListTableState): ListQuery {
  return {
    page: state.page,
    pageSize: state.pageSize,
    ...(state.sortBy && {
      sortBy: state.sortBy,
      sortDir: state.sortDir ?? 'asc',
    }),
    ...(state.keyword && { keyword: state.keyword }),
    ...(state.filter &&
      Object.keys(state.filter).length > 0 && { filter: state.filter }),
  }
}
