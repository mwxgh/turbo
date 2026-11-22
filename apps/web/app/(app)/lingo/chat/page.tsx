import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { chatQueryOptions, chatsQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { TutorChat } from './_components/tutor-chat'

export const dynamic = 'force-dynamic'

export default async function ChatPage({
  searchParams,
}: PageProps<'/lingo/chat'>) {
  const raw = (await searchParams).c
  const chatId = typeof raw === 'string' && raw ? raw : undefined
  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(chatsQueryOptions()),
    chatId && queryClient.prefetchQuery(chatQueryOptions(chatId)),
  ])
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TutorChat />
      </HydrationBoundary>
    </main>
  )
}
