'use client'

import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from '@repo/ui/components/sonner'

import { ThemeProvider } from '../components/theme-provider'
import { getQueryClient } from '../lib/query-client'

/** Client-side providers for the whole app. */
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* URL state of list tables (useListTable) */}
      <NuqsAdapter>
        <ThemeProvider>
          {children}
          {/* Follows the theme; top right by default */}
          <Toaster />
        </ThemeProvider>
      </NuqsAdapter>
      {/* Not included in production builds */}
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
