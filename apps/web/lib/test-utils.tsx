import type { ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type RenderResult, render } from '@testing-library/react'

/** Fresh QueryClient per test: no retries, no shared cache between tests. */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
      mutations: { retry: false },
    },
  })
}

export function renderWithQuery(
  ui: ReactElement,
  queryClient: QueryClient = createTestQueryClient(),
): RenderResult & { queryClient: QueryClient } {
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    ),
  }
}
