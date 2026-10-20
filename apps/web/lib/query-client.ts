import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data prefetched on the server stays fresh briefly, so the client
        // does not refetch it immediately after hydration.
        staleTime: 30_000,
      },
      dehydrate: {
        // Also send pending queries, so the server can stream them
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

/**
 * Server: a new client per request (never share data between users).
 * Browser: one client for the whole session (keeps the cache across pages).
 */
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient()
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}
