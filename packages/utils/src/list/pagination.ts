/**
 * Pagination contract shared by the API (Nest) and its clients (web).
 * The API validates `PaginationQuery` with `PaginationQueryDto`
 * (@repo/nest-common) and answers with `Paginated<T>`.
 */

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

/** `?page=&pageSize=` – 1-based page number. */
export interface PaginationQuery {
  page: number
  pageSize: number
}

/** Response body of every paginated list endpoint. */
export interface Paginated<T> extends PaginationQuery {
  items: T[]
  total: number
  totalPages: number
}

/** Offset arguments for an ORM query: `prisma.x.findMany({ ...paginationArgs(q) })`. */
export function paginationArgs({ page, pageSize }: PaginationQuery): {
  skip: number
  take: number
} {
  return { skip: (page - 1) * pageSize, take: pageSize }
}

/** Number of pages for `total` items (at least 1, so "page 1 of 1" when empty). */
export function totalPages(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize))
}

/** Build the response: `return paginated(items, total, query)`. */
export function paginated<T>(
  items: T[],
  total: number,
  { page, pageSize }: PaginationQuery,
): Paginated<T> {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: totalPages(total, pageSize),
  }
}
