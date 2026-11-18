import type { Metadata } from 'next'

import { appById } from '@/lib/apps'

import { Chat } from './_components/chat'

const app = appById('chat')

export const metadata: Metadata = { title: app.name }

export default function ChatPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
        <p className="text-muted-foreground">{app.description}</p>
      </div>
      <Chat />
    </main>
  )
}
