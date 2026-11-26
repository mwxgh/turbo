'use client'

import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { ListPlus } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'

import { learnExtensions } from '@/lib/lingo-actions'
import { lingoKeys } from '@/lib/queries/lingo'

export interface CardExtension {
  term?: string
  pos?: string
  meaningVi?: string
}

/** The stored JSON as a list (anything else: none) */
export const toExtensions = (value: unknown): CardExtension[] =>
  Array.isArray(value) ? (value as CardExtension[]) : []

/**
 * "Từ mở rộng" on the back of a card: word family, phrases and usage notes. The button turns the
 * words into cards of the learner's own deck, so they come back in later sessions.
 */
export function CardExtensions({
  cardId,
  extensions,
}: {
  cardId: string
  extensions: CardExtension[]
}) {
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)
  if (!extensions.length) return null
  const learnable = extensions.filter((e) => e.term && e.meaningVi).length

  async function learn() {
    setBusy(true)
    try {
      const res = await learnExtensions(cardId)
      if (res.errors) {
        toast.error('Không thêm được', { description: res.errors.join(' · ') })
        return
      }
      const { added = 0, known = 0 } = res.data ?? {}
      toast.success(
        added
          ? `Đã thêm ${added} từ vào "Từ mở rộng của tôi"`
          : 'Các từ này đã có trong bộ của bạn',
        known && added ? { description: `${known} từ đã có từ trước` } : {},
      )
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      aria-labelledby={`ext-${cardId}`}
      className="flex w-full flex-col gap-2 border-t pt-4 text-left"
    >
      <h3 id={`ext-${cardId}`} className="text-sm font-medium">
        Từ mở rộng
      </h3>
      <ul className="flex flex-col gap-1.5 text-sm">
        {extensions.map((e, i) => (
          <li key={i} className="leading-relaxed">
            {e.term ? (
              <>
                <span className="font-medium">{e.term}</span>
                {e.pos && (
                  <span className="text-muted-foreground"> ({e.pos})</span>
                )}
                {e.meaningVi && (
                  <span className="text-muted-foreground">: {e.meaningVi}</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground italic">
                {e.meaningVi}
              </span>
            )}
          </li>
        ))}
      </ul>
      {learnable > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          disabled={busy}
          onClick={() => void learn()}
        >
          <ListPlus aria-hidden="true" />
          Học {learnable} từ mở rộng
        </Button>
      )}
    </section>
  )
}
