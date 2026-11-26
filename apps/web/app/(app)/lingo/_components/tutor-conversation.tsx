'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Bot, Send, Square } from 'pulsoicon-react'

import type { LingoChatMessage } from '@repo/types'
import { Button } from '@repo/ui/components/button'
import { IconButton } from '@repo/ui/components/icon-button'
import { toast } from '@repo/ui/components/sonner'
import { Textarea } from '@repo/ui/components/textarea'
import { cn } from '@repo/ui/lib/utils'

import { ApiError } from '@/lib/api'
import { createChat } from '@/lib/lingo-actions'
import { askTutor } from '@/lib/lingo-chat'
import { chatQueryOptions, lingoKeys } from '@/lib/queries/lingo'

const MAX_LENGTH = 2000
const EXAMPLES = [
  'Khi nào dùng "since" và "for"?',
  'Sửa giúp câu: "I am interesting in this job."',
  'Mẹo làm TOEIC Part 5 nhanh hơn?',
]

/** A question being answered: shown until the saved chat is refetched. */
interface Pending {
  question: string
  answer: string
}

function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 503) return 'AI tutor chưa được bật trên server'
    if (error.status === 429) return 'Bạn hỏi nhanh quá, chờ một phút nhé'
    return error.message
  }
  return 'Không kết nối được tới server'
}

function Bubble({
  role,
  children,
}: {
  role: 'USER' | 'ASSISTANT'
  children: string
}) {
  const mine = role === 'USER'
  return (
    <li className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          `max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed
          whitespace-pre-wrap`,
          mine ? 'bg-primary text-primary-foreground' : 'bg-muted',
        )}
      >
        {children}
      </div>
    </li>
  )
}

/**
 * One conversation with the AI tutor: messages, the answer streaming in, the question box. With no
 * `chatId` the first question creates the chat and reports it through `onChatId`.
 */
export function TutorConversation({
  chatId,
  onChatId,
  onBusyChange,
  className,
}: {
  chatId: string | null
  onChatId: (id: string) => unknown
  onBusyChange?: (busy: boolean) => void
  className?: string
}) {
  const queryClient = useQueryClient()
  const chat = useQuery({
    ...chatQueryOptions(chatId ?? ''),
    enabled: Boolean(chatId),
  })
  const [text, setText] = useState('')
  const [pending, setPending] = useState<Pending>()
  const abort = useRef<AbortController>(undefined)
  const bottom = useRef<HTMLDivElement>(null)

  const messages: LingoChatMessage[] = chatId ? (chat.data?.messages ?? []) : []
  const busy = Boolean(pending)

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'nearest' })
  }, [messages.length, pending?.answer])

  useEffect(() => onBusyChange?.(busy), [busy, onBusyChange])

  // Unmounting stops the answer (the API keeps what arrived)
  useEffect(() => () => abort.current?.abort(), [])

  async function ask(question: string) {
    question = question.trim()
    if (!question || busy) return
    let id = chatId
    if (!id) {
      const res = await createChat()
      if (!res.data) {
        toast.error('Không tạo được cuộc trò chuyện', {
          description: res.errors?.join(' · '),
        })
        return
      }
      id = res.data.id
      await onChatId(id)
    }

    setText('')
    setPending({ question, answer: '' })
    abort.current = new AbortController()
    try {
      for await (const piece of askTutor(id, question, abort.current.signal))
        setPending((p) => p && { ...p, answer: p.answer + piece })
    } catch (error) {
      if (!abort.current.signal.aborted) {
        toast.error('AI tutor không trả lời được', {
          description: errorMessage(error),
        })
        setText(question)
      }
    } finally {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: lingoKeys.chat(id) }),
        queryClient.invalidateQueries({
          queryKey: lingoKeys.chats(),
          exact: true,
        }),
      ])
      setPending(undefined)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void ask(text)
  }

  return (
    <section
      aria-label="Hỏi AI tutor"
      className={cn('flex min-h-0 flex-col', className)}
    >
      <div className="flex-1 overflow-y-auto p-4" aria-live="polite">
        {!messages.length && !pending ? (
          <div
            className="flex h-full flex-col items-center justify-center gap-4
              text-center"
          >
            <span
              className="flex size-11 items-center justify-center rounded-lg
                bg-rose-500/10 text-rose-700 dark:bg-rose-400/15
                dark:text-rose-300"
            >
              <Bot aria-hidden className="size-5.5" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Hỏi gia sư AI về tiếng Anh và TOEIC</p>
              <p className="text-sm text-muted-foreground">
                Ngữ pháp, từ vựng, sửa câu, giải thích đáp án
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((example) => (
                <Button
                  key={example}
                  size="sm"
                  variant="secondary"
                  className="h-auto py-1.5 whitespace-normal"
                  onClick={() => void ask(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {messages.map((message) => (
              <Bubble key={message.id} role={message.role}>
                {message.content}
              </Bubble>
            ))}
            {pending && (
              <>
                <Bubble role="USER">{pending.question}</Bubble>
                <Bubble role="ASSISTANT">{pending.answer || '…'}</Bubble>
              </>
            )}
          </ul>
        )}
        <div ref={bottom} />
      </div>

      <form onSubmit={submit} className="flex items-end gap-2 border-t p-3">
        <Textarea
          aria-label="Câu hỏi"
          placeholder="Nhập câu hỏi · Enter để gửi, Shift+Enter xuống dòng"
          value={text}
          maxLength={MAX_LENGTH}
          rows={1}
          className="max-h-40 min-h-10 resize-none"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault()
              void ask(text)
            }
          }}
        />
        {busy ? (
          <IconButton
            type="button"
            label="Dừng"
            size="icon"
            onClick={() => abort.current?.abort()}
          >
            <Square aria-hidden />
          </IconButton>
        ) : (
          <IconButton
            type="submit"
            label="Gửi"
            size="icon"
            variant="default"
            disabled={!text.trim()}
          >
            <Send aria-hidden />
          </IconButton>
        )}
      </form>
    </section>
  )
}
