import type { ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  type RenderResult,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'

/** Fresh QueryClient per test: no retries, no shared cache between tests. */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
      mutations: { retry: false },
    },
  })
}

/** Query cache + URL state (nuqs, starting from `searchParams`) like the app's Providers. */
export function renderWithQuery(
  ui: ReactElement,
  queryClient: QueryClient = createTestQueryClient(),
  searchParams = '',
): RenderResult & { queryClient: QueryClient } {
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <NuqsTestingAdapter searchParams={searchParams} hasMemory>
          {ui}
        </NuqsTestingAdapter>
      </QueryClientProvider>,
    ),
  }
}

/** Open a table row's ⋯ menu and pick one of its actions. */
export async function chooseRowAction(row: HTMLElement, name: string) {
  await userEvent.click(
    within(row).getByRole('button', { name: 'Row actions' }),
  )
  await userEvent.click(await screen.findByRole('menuitem', { name }))
}
