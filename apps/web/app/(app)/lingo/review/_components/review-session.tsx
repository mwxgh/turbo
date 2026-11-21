'use client'

import { useCallback, useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PartyPopper, RotateCcw, Volume2 } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import { RATINGS } from '@/lib/lingo'
import { reviewCard } from '@/lib/lingo-actions'
import {
  type DeckWithStats,
  type ReviewCard,
  decksQueryOptions,
  lingoKeys,
  reviewQueryOptions,
} from '@/lib/queries/lingo'

/** Browser speech (no server TTS yet): English / Chinese voice from the deck language. */
function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

function DeckList({ decks }: { decks: DeckWithStats[] }) {
  if (!decks.length) return null
  return (
    <section aria-labelledby="decks-heading" className="flex flex-col gap-3">
      <h2 id="decks-heading" className="text-lg font-semibold">
        Bộ thẻ
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="flex flex-col gap-2 rounded-xl border bg-card p-4"
          >
            <span className="font-medium">{deck.title}</span>
            {deck.description && (
              <span className="text-sm text-muted-foreground">
                {deck.description}
              </span>
            )}
            <span className="text-sm text-muted-foreground tabular-nums">
              {deck.cards} thẻ · đã học {deck.started} · thuộc {deck.learned}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Today's queue: front (term) → Space flips → rate 1–4. FSRS on the api picks the next date; cards
 * rated "Quên" come back later in the same session.
 */
export function ReviewSession({ exam }: { exam?: string }) {
  const queryClient = useQueryClient()
  const { data } = useQuery(reviewQueryOptions(exam))
  const { data: decks = [] } = useQuery(decksQueryOptions(exam))
  // Snapshot of the prefetched queue: the session works through it locally
  const [queue, setQueue] = useState<ReviewCard[]>(() => data?.cards ?? [])
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const [busy, setBusy] = useState(false)

  const card = queue[0]
  const language = decks.find((d) => d.id === card?.deckId)?.language ?? 'en'

  const rate = useCallback(
    async (rating: 1 | 2 | 3 | 4) => {
      if (!card || busy) return
      setBusy(true)
      try {
        const res = await reviewCard(card.id, rating)
        if (res.errors) {
          toast.error('Không lưu được', { description: res.errors.join(' · ') })
          return
        }
        setFlipped(false)
        setDone((n) => n + 1)
        // "Quên": once more at the end of this session
        setQueue((q) => [
          ...q.slice(1),
          ...(rating === 1 ? [{ ...q[0]!, isNew: false }] : []),
        ])
      } catch {
        toast.error('Không kết nối được máy chủ')
      } finally {
        setBusy(false)
      }
    },
    [busy, card],
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!card || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && ['1', '2', '3', '4'].includes(event.key)) {
        event.preventDefault()
        void rate(Number(event.key) as 1 | 2 | 3 | 4)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [card, flipped, rate])

  async function restart() {
    await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    const fresh = await queryClient.fetchQuery(reviewQueryOptions(exam))
    setQueue(fresh.cards)
    setDone(0)
  }

  const total = queue.length + done

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Ôn từ vựng</h1>
        <p className="text-muted-foreground">
          Nhớ nghĩa trước, rồi lật thẻ và tự chấm. Lịch ôn tự giãn ra khi bạn
          nhớ tốt.
        </p>
      </div>

      {card ? (
        <section aria-label="Thẻ hiện tại" className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between text-sm
              text-muted-foreground"
          >
            <span className="tabular-nums">
              {done}/{total} thẻ
            </span>
            {card.isNew && (
              <span className="font-medium text-primary">Thẻ mới</span>
            )}
          </div>
          <div
            role="progressbar"
            aria-label="Tiến độ phiên ôn"
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={total}
            className="h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>

          <div
            className="flex min-h-72 flex-col items-center justify-center gap-4
              rounded-2xl border bg-card p-8 text-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold sm:text-4xl">
                {card.term}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Nghe phát âm ${card.term}`}
                onClick={() => speak(card.term, language)}
              >
                <Volume2 aria-hidden="true" />
              </Button>
            </div>
            <span className="text-muted-foreground">
              {[card.reading, card.pos].filter(Boolean).join(' · ')}
            </span>
            {flipped ? (
              <div className="flex max-w-prose flex-col gap-3 border-t pt-4">
                <p className="text-xl font-medium">{card.meaningVi}</p>
                {card.example && (
                  <p className="leading-relaxed">
                    {card.example}
                    {card.exampleVi && (
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {card.exampleVi}
                      </span>
                    )}
                  </p>
                )}
              </div>
            ) : (
              <Button variant="outline" onClick={() => setFlipped(true)}>
                Lật thẻ{' '}
                <kbd className="ml-1 text-xs text-muted-foreground">Space</kbd>
              </Button>
            )}
          </div>

          <div
            role="group"
            aria-label="Bạn nhớ thẻ này thế nào?"
            className={cn(
              'grid grid-cols-2 gap-2 sm:grid-cols-4',
              !flipped && 'invisible',
            )}
          >
            {RATINGS.map((r) => (
              <Button
                key={r.value}
                size="lg"
                variant={r.value === 3 ? 'default' : 'outline'}
                disabled={!flipped || busy}
                onClick={() => void rate(r.value)}
                className="h-12 flex-col gap-0"
              >
                <span>{r.label}</span>
                <span className="text-xs opacity-70">phím {r.key}</span>
              </Button>
            ))}
          </div>
        </section>
      ) : (
        <section
          className="flex flex-col items-center gap-3 rounded-2xl border bg-card
            p-10 text-center"
        >
          <PartyPopper aria-hidden="true" className="size-10 text-primary" />
          <h2 className="text-xl font-semibold">
            {done
              ? `Xong ${done} thẻ hôm nay!`
              : 'Hôm nay không còn thẻ cần ôn'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {decks.length
              ? 'Quay lại ngày mai, hoặc tăng số thẻ mới mỗi ngày trong Mục tiêu.'
              : 'Chưa có bộ thẻ nào. Thầy cô nạp từ vựng ở khu ra đề.'}
          </p>
          <Button variant="outline" onClick={() => void restart()}>
            <RotateCcw aria-hidden="true" />
            Kiểm tra lại
          </Button>
        </section>
      )}

      <DeckList decks={decks} />
    </>
  )
}
