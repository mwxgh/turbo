'use client'

import { useEffect, useRef, useState } from 'react'

import { Headphones, Square, Volume2 } from 'lucide-react'

import { Button } from '@repo/ui/components/button'

import type { ScriptLine } from '@/lib/queries/lingo'
import { canSpeak, speak, splitPassage } from '@/lib/speech'

const SPEAKER_LABEL: Record<ScriptLine['speaker'], string> = {
  M: 'Nam',
  W: 'Nữ',
  M2: 'Nam 2',
  W2: 'Nữ 2',
  N: 'Người đọc',
}

/**
 * Plays a script with the browser's voices. `locked`: already heard once in a full test (the real
 * exam plays each recording once).
 */
export function ListeningPlayer({
  lines,
  locked = false,
  onPlayed,
}: {
  lines: ScriptLine[]
  locked?: boolean
  onPlayed?: () => void
}) {
  const [playing, setPlaying] = useState(false)
  const stop = useRef<() => void>(undefined)

  // Leaving the question stops the voice
  useEffect(() => () => stop.current?.(), [lines])

  if (!canSpeak())
    return (
      <p className="text-sm text-muted-foreground">
        Trình duyệt này không đọc được âm thanh. Hãy dùng Chrome, Edge hoặc
        Safari.
      </p>
    )

  function toggle() {
    if (playing) {
      stop.current?.()
      return
    }
    setPlaying(true)
    onPlayed?.()
    stop.current = speak(lines, () => {
      setPlaying(false)
      stop.current = undefined
    })
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30
        p-3"
    >
      <Button
        type="button"
        variant={playing ? 'outline' : 'default'}
        disabled={locked && !playing}
        onClick={toggle}
      >
        {playing ? <Square aria-hidden /> : <Volume2 aria-hidden />}
        {playing ? 'Dừng' : locked ? 'Đã nghe' : 'Nghe'}
      </Button>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Headphones aria-hidden className="size-3.5" />
        Giọng đọc của trình duyệt
      </span>
    </div>
  )
}

/** A listening script, for the result page. */
export function Transcript({ lines }: { lines: ScriptLine[] }) {
  return (
    <dl className="flex flex-col gap-1.5 rounded-lg bg-muted/40 p-3 text-sm">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-2">
          <dt className="w-20 shrink-0 font-medium text-muted-foreground">
            {SPEAKER_LABEL[line.speaker]}
            {line.accent && (
              <span className="ml-1 text-xs font-normal">({line.accent})</span>
            )}
          </dt>
          <dd className="leading-relaxed">{line.text}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Reading text; Part 7 sets of 2–3 texts show as separate cards. */
export function Passage({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const texts = splitPassage(text)
  return (
    <div className={className}>
      <div className="flex flex-col gap-3">
        {texts.map((part, i) => (
          <div
            key={i}
            className="rounded-xl border bg-muted/30 p-4 leading-relaxed
              whitespace-pre-line"
          >
            {texts.length > 1 && (
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Văn bản {i + 1}/{texts.length}
              </p>
            )}
            {part}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Part 1 photo (temporary URL signed by the api). */
export function QuestionImage({ url }: { url: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- signed S3 URL, not optimisable by next/image
    <img
      src={url}
      alt="Ảnh của câu hỏi"
      className="max-h-80 w-full rounded-xl border object-contain"
    />
  )
}
