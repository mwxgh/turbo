'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { Headphones, Square, Volume2 } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'

import type { ScriptLine } from '@/lib/queries/lingo'
import { SPEEDS, canSpeak, speak, splitPassage } from '@/lib/speech'

const SPEAKER_LABEL: Record<ScriptLine['speaker'], string> = {
  M: 'Nam',
  W: 'Nữ',
  M2: 'Nam 2',
  W2: 'Nữ 2',
  N: 'Người đọc',
}

const SPEED_KEY = 'lingo.listening.speed'

const speedListeners = new Set<() => void>()
// Used when storage is unavailable (private window, blocked site data)
let pageSpeed = 1

function readSpeed(): number {
  try {
    const saved = Number(localStorage.getItem(SPEED_KEY))
    if ((SPEEDS as readonly number[]).includes(saved)) return saved
  } catch {
    // fall back to this page's choice
  }
  return pageSpeed
}

function subscribeSpeed(listener: () => void) {
  speedListeners.add(listener)
  return () => speedListeners.delete(listener)
}

/** The learner's playback speed, remembered in this browser (1× on the server and without storage). */
function useSpeed() {
  const speed = useSyncExternalStore(subscribeSpeed, readSpeed, () => 1)
  const choose = (value: number) => {
    pageSpeed = value
    try {
      localStorage.setItem(SPEED_KEY, String(value))
    } catch {
      // not remembered: storage unavailable
    }
    speedListeners.forEach((listener) => listener())
  }
  return [speed, choose] as const
}

const noSubscribe = () => () => {}

/**
 * Whether this browser has voices. Assumed on the server and during hydration (the HTML must match
 * the first client render), checked right after: a browser without speech then gets the notice.
 */
const useCanSpeak = () =>
  useSyncExternalStore(noSubscribe, canSpeak, () => true)

/**
 * Plays a script with the browser's voices. `locked`: already heard once in a full test (the real
 * exam plays each recording once). `fixedSpeed`: scored attempts play at normal speed only.
 */
export function ListeningPlayer({
  lines,
  locked = false,
  fixedSpeed = false,
  onPlayed,
}: {
  lines: ScriptLine[]
  locked?: boolean
  fixedSpeed?: boolean
  onPlayed?: () => void
}) {
  const [playing, setPlaying] = useState(false)
  const [chosenSpeed, setSpeed] = useSpeed()
  const speed = fixedSpeed ? 1 : chosenSpeed
  const stop = useRef<() => void>(undefined)
  const speechSupported = useCanSpeak()

  // Leaving the question stops the voice. Keyed on the text, not the array: parents re-render
  // (the exam clock ticks every second) with an equal new array, which used to cut the reading
  const script = lines.map((line) => line.text).join('\n')
  useEffect(() => () => stop.current?.(), [script])

  if (!speechSupported)
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
    stop.current = speak(
      lines,
      () => {
        setPlaying(false)
        stop.current = undefined
      },
      speed,
    )
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30
        p-2 pr-4"
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
      {!fixedSpeed && (
        <div
          role="group"
          aria-label="Tốc độ đọc"
          className="flex items-center gap-1"
        >
          {SPEEDS.map((value) => (
            <Button
              key={value}
              type="button"
              size="xs"
              variant={value === speed ? 'secondary' : 'ghost'}
              aria-pressed={value === speed}
              // Applies from the next play: browser voices cannot change speed mid-sentence
              disabled={playing}
              onClick={() => setSpeed(value)}
              className="tabular-nums"
            >
              {value}×
            </Button>
          ))}
        </div>
      )}
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Headphones aria-hidden className="size-4" />
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
