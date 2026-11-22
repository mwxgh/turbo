'use client'

import { useEffect, useId, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Bot, Maximize2, Plus, X } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { IconButton } from '@repo/ui/components/icon-button'
import { cn } from '@repo/ui/lib/utils'

import { TutorConversation } from './tutor-conversation'

/**
 * Floating AI tutor on every Lingo page but the full chat page. The panel stays mounted once
 * opened, so an answer keeps streaming while it is closed or the learner moves between pages.
 */
export function TutorBubble() {
  const pathname = usePathname()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [opened, setOpened] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (pathname === '/lingo/chat') return null

  function toggle() {
    setOpened(true)
    setOpen((value) => !value)
  }

  return (
    <>
      {opened && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Gia sư AI"
          className={cn(
            `fixed right-4 bottom-20 z-50 h-[min(36rem,calc(100dvh-7rem))]
            w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl
            border bg-background shadow-xl`,
            open ? 'flex' : 'hidden',
          )}
        >
          <header className="flex items-center gap-2 border-b py-2 pr-2 pl-4">
            <Bot aria-hidden className="size-4 text-muted-foreground" />
            <h2 className="mr-auto text-sm font-medium">Gia sư AI</h2>
            <IconButton
              label="Cuộc trò chuyện mới"
              variant="ghost"
              disabled={busy || !chatId}
              onClick={() => setChatId(null)}
            >
              <Plus aria-hidden />
            </IconButton>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Mở toàn trang"
              title="Mở toàn trang"
              nativeButton={false}
              render={
                <Link
                  href={chatId ? `/lingo/chat?c=${chatId}` : '/lingo/chat'}
                  onClick={() => setOpen(false)}
                />
              }
            >
              <Maximize2 aria-hidden />
            </Button>
            <IconButton
              label="Đóng"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden />
            </IconButton>
          </header>
          <TutorConversation
            chatId={chatId}
            onChatId={setChatId}
            onBusyChange={setBusy}
            className="flex-1"
          />
        </div>
      )}

      <Button
        size="icon-lg"
        aria-label={open ? 'Đóng gia sư AI' : 'Hỏi gia sư AI'}
        aria-expanded={open}
        aria-controls={opened ? panelId : undefined}
        onClick={toggle}
        className="fixed right-4 bottom-4 z-50 size-12 rounded-full shadow-lg"
      >
        {open ? <X aria-hidden /> : <Bot aria-hidden />}
      </Button>
    </>
  )
}
