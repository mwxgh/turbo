'use client'

import { useEffect, useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'

import { Input } from '@repo/ui/components/input'

import { cardSearchQueryOptions } from '@/lib/queries/lingo'

/** Waits until typing pauses before searching. */
function useDebounced(value: string, ms = 250) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return debounced
}

/**
 * Looks up a word in every deck the learner can see: English term, Vietnamese meaning (accents
 * optional) or từ mở rộng; typos are tolerated when the api runs Elasticsearch.
 */
export function CardSearch({ exam }: { exam?: string }) {
  const [text, setText] = useState('')
  const q = useDebounced(text.trim())
  const { data, isFetching } = useQuery({
    ...cardSearchQueryOptions(q, exam),
    placeholderData: keepPreviousData,
  })
  const items = q.length >= 2 ? (data?.items ?? []) : []

  return (
    <section className="flex flex-col gap-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4
            -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          aria-label="Tìm từ"
          placeholder="Tìm từ: tiếng Anh hoặc nghĩa tiếng Việt (vd. hop dong)"
          className="pl-9"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {q.length >= 2 && !isFetching && items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Không tìm thấy từ nào cho “{q}”.
        </p>
      )}
      {items.length > 0 && (
        <ul className="flex flex-col divide-y divide-border rounded-lg border">
          {items.map((card) => (
            <li key={card.id} className="flex flex-col gap-1 px-4 py-3">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-medium">{card.term}</span>
                <span className="text-sm text-muted-foreground">
                  {[card.reading, card.pos].filter(Boolean).join(' · ')}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {card.deckTitle}
                </span>
              </div>
              <p className="text-sm">{card.meaningVi}</p>
              {card.example && (
                <p className="text-sm text-muted-foreground italic">
                  {card.example}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
