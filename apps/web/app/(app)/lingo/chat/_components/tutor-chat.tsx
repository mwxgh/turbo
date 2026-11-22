'use client'

import { useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

import { Button } from '@repo/ui/components/button'
import { IconButton } from '@repo/ui/components/icon-button'
import { cn } from '@repo/ui/lib/utils'

import { TutorConversation } from '@/app/(app)/lingo/_components/tutor-conversation'
import { withToast } from '@/lib/action-toast'
import { deleteChat } from '@/lib/lingo-actions'
import { chatsQueryOptions, lingoKeys } from '@/lib/queries/lingo'

/** AI tutor page: conversation list on the side, the open one (`?c=<id>`) in the middle. */
export function TutorChat() {
  const queryClient = useQueryClient()
  const [chatId, setChatId] = useQueryState('c', parseAsString)
  const chats = useQuery(chatsQueryOptions())
  const [busy, setBusy] = useState(false)

  async function remove(id: string) {
    const res = await withToast(deleteChat(id), {
      success: 'Đã xoá cuộc trò chuyện',
      error: 'Không xoá được cuộc trò chuyện',
    })
    if (res.errors) return
    if (id === chatId) await setChatId(null)
    queryClient.removeQueries({ queryKey: lingoKeys.chat(id) })
    await queryClient.invalidateQueries({
      queryKey: lingoKeys.chats(),
      exact: true,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
      <aside aria-label="Cuộc trò chuyện" className="flex flex-col gap-2">
        <Button
          variant="outline"
          disabled={busy}
          onClick={() => void setChatId(null)}
        >
          <Plus aria-hidden /> Cuộc trò chuyện mới
        </Button>
        <ul
          className="flex max-h-48 flex-col gap-1 overflow-y-auto
            md:max-h-[70vh]"
        >
          {chats.data?.items.map((item) => (
            <li key={item.id} className="flex items-center gap-1">
              <button
                type="button"
                disabled={busy}
                onClick={() => void setChatId(item.id)}
                aria-current={item.id === chatId ? 'true' : undefined}
                className={cn(
                  `min-w-0 flex-1 truncate rounded-md px-2.5 py-1.5 text-left
                  text-sm transition-colors outline-none focus-visible:ring-3
                  focus-visible:ring-ring/50 disabled:opacity-50`,
                  item.id === chatId
                    ? 'bg-muted font-medium'
                    : `text-muted-foreground hover:bg-muted/60
                      hover:text-foreground`,
                )}
              >
                {item.title}
              </button>
              <IconButton
                label="Xoá"
                variant="ghost"
                disabled={busy}
                onClick={() => void remove(item.id)}
              >
                <Trash2 aria-hidden />
              </IconButton>
            </li>
          ))}
        </ul>
      </aside>

      <TutorConversation
        chatId={chatId}
        onChatId={setChatId}
        onBusyChange={setBusy}
        className="h-[70vh] rounded-xl border bg-card shadow-xs"
      />
    </div>
  )
}
