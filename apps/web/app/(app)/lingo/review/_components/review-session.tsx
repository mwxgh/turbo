'use client'

import { useCallback, useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ChevronsRight,
  CircleCheck,
  Frown,
  Info,
  Meh,
  Repeat2,
  RotateCcw,
  Smile,
  Volume2,
} from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import { RATINGS } from '@/lib/lingo'
import { markCardKnown, reviewCard } from '@/lib/lingo-actions'
import {
  type DeckWithStats,
  type ReviewCard,
  decksQueryOptions,
  lingoKeys,
  reviewQueryOptions,
} from '@/lib/queries/lingo'

import { CardExtensions, toExtensions } from './card-extensions'

/** Browser speech (no server TTS yet): English / Chinese voice from the deck language. */
function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

const TONE = {
  easy: 'text-emerald-600 dark:text-emerald-400',
  medium: 'text-amber-600 dark:text-amber-400',
  hard: 'text-rose-600 dark:text-rose-400',
} as const

const ICON = { easy: Smile, medium: Meh, hard: Frown } as const

/** "(n) /ˈɒnset/" under the term */
const posReading = (card: ReviewCard) =>
  [card.pos && `(${card.pos})`, card.reading].filter(Boolean).join(' ')

function DeckList({ decks }: { decks: DeckWithStats[] }) {
  if (!decks.length) return null
  return (
    <section aria-labelledby="decks-heading" className="flex flex-col gap-3">
      <h2 id="decks-heading" className="text-lg font-medium">
        Bộ thẻ
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="flex flex-col gap-2 rounded-xl border bg-card p-5
              shadow-xs"
          >
            <span className="font-medium">{deck.title}</span>
            {deck.description && (
              <span className="text-sm text-muted-foreground">
                {deck.description}
              </span>
            )}
            <span className="mt-auto text-xs text-muted-foreground tabular-nums">
              {deck.cards} thẻ · đã học {deck.started} · thuộc {deck.learned}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Today's queue: front (term) → Space flips → Dễ / Trung bình / Khó (keys 1–3) or "Đã biết" (4).
 * FSRS on the api picks the next date; "Khó" cards come back later in the same session.
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

  /** Rating (FSRS grade) or "known": saves, then moves on. "Khó" comes back at the end. */
  const answer = useCallback(
    async (choice: 1 | 3 | 4 | 'known') => {
      if (!card || busy) return
      setBusy(true)
      try {
        const res =
          choice === 'known'
            ? await markCardKnown(card.id)
            : await reviewCard(card.id, choice)
        if (res.errors) {
          toast.error('Không lưu được', { description: res.errors.join(' · ') })
          return
        }
        setFlipped(false)
        setDone((n) => n + 1)
        // "Khó": once more at the end of this session
        setQueue((q) => [
          ...q.slice(1),
          ...(choice === 1 ? [{ ...q[0]!, isNew: false }] : []),
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
      } else {
        const pick = RATINGS.find((r) => r.key === event.key)
        if (pick || event.key === '4') {
          event.preventDefault()
          void answer(pick ? pick.value : 'known')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, card])

  async function restart() {
    await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    const fresh = await queryClient.fetchQuery(reviewQueryOptions(exam))
    setQueue(fresh.cards)
    setDone(0)
  }

  const total = queue.length + done

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">Ôn từ vựng</h1>
        <p className="text-muted-foreground">
          Nhớ nghĩa trước, lật thẻ, rồi chọn từ này với bạn dễ hay khó. Lịch ôn
          tự giãn ra khi bạn nhớ tốt.
        </p>
      </div>

      {card ? (
        <section aria-label="Thẻ hiện tại" className="flex flex-col gap-4">
          <p
            className="flex items-start gap-2 rounded-lg border
              border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm
              text-amber-900 dark:text-amber-200"
          >
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            Bạn học tối đa {data?.newPerDay ?? 20} từ mới một ngày (đổi trong
            Mục tiêu). Học đều mỗi ngày giúp nhớ lâu hơn học dồn.
          </p>

          <div className="flex items-center gap-3">
            <div
              role="progressbar"
              aria-label="Tiến độ phiên ôn"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={total}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${total ? (done / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {done}/{total}
            </span>
          </div>

          <div
            className="relative flex min-h-80 flex-col items-center
              justify-center gap-3 rounded-2xl border bg-card px-6 py-12
              text-center shadow-xs"
          >
            {card.isNew && (
              <span
                className="absolute top-4 right-4 rounded-full border
                  border-amber-500/60 px-3 py-0.5 text-xs font-medium
                  text-amber-700 dark:text-amber-300"
              >
                Từ mới
              </span>
            )}
            <div className="flex items-center gap-2">
              <span
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {card.term}
              </span>
              <Button
                variant="secondary"
                size="icon-sm"
                className="rounded-full"
                aria-label={`Nghe phát âm ${card.term}`}
                onClick={() => speak(card.term, language)}
              >
                <Volume2 aria-hidden="true" />
              </Button>
            </div>
            {posReading(card) && (
              <span className="font-medium text-muted-foreground">
                {posReading(card)}
              </span>
            )}
            {flipped ? (
              <div
                className="mt-3 flex max-w-prose flex-col gap-3 border-t pt-5"
              >
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
                <CardExtensions
                  cardId={card.id}
                  extensions={toExtensions(card.extensions)}
                />
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Nhớ nghĩa trong đầu, rồi lật thẻ để kiểm tra (Space).
              </p>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={flipped ? 'Úp thẻ' : 'Lật thẻ'}
              title="Lật thẻ (Space)"
              onClick={() => setFlipped((f) => !f)}
              className="absolute right-3 bottom-3"
            >
              <Repeat2 aria-hidden />
            </Button>
          </div>

          <div
            role="group"
            aria-label="Bạn thấy từ này thế nào?"
            className="grid grid-cols-2 gap-1 rounded-2xl border bg-card p-2
              shadow-xs sm:grid-cols-4"
          >
            {RATINGS.map((r) => {
              const Icon = ICON[r.tone]
              return (
                <Button
                  key={r.value}
                  variant="ghost"
                  disabled={busy}
                  onClick={() => void answer(r.value)}
                  title={`Phím ${r.key}`}
                  className={cn('h-auto flex-col gap-1 py-4', TONE[r.tone])}
                >
                  <Icon aria-hidden className="size-5" />
                  <span className="font-semibold">{r.label}</span>
                </Button>
              )
            })}
            <Button
              variant="ghost"
              disabled={busy}
              onClick={() => void answer('known')}
              title="Phím 4"
              className="h-auto flex-col gap-1 py-4 text-muted-foreground"
            >
              <ChevronsRight aria-hidden className="size-5" />
              <span
                className="text-center text-xs leading-snug font-medium
                  whitespace-normal"
              >
                Đã biết, loại khỏi danh sách ôn tập
              </span>
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Dễ: nhớ ngay · Trung bình: nhớ ra sau một lúc · Khó: chưa nhớ, gặp
            lại cuối phiên · phím 1–4
          </p>
        </section>
      ) : (
        <section
          className="flex flex-col items-center gap-3 rounded-2xl border bg-card
            p-10 text-center shadow-xs"
        >
          <span
            className="flex size-11 items-center justify-center rounded-lg
              bg-rose-500/10 text-rose-700 dark:bg-rose-400/15
              dark:text-rose-300"
          >
            <CircleCheck aria-hidden="true" className="size-5.5" />
          </span>
          <h2 className="text-xl font-medium">
            {done ? `Xong ${done} thẻ hôm nay` : 'Hôm nay không còn thẻ cần ôn'}
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
