'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Flag,
  Loader2,
  Maximize,
  Minimize,
  Send,
  Timer,
  X,
} from 'lucide-react'

import { Button, buttonVariants } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import {
  ListeningPlayer,
  Passage,
  QuestionImage,
} from '@/app/(app)/lingo/_components/question-media'
import { LETTERS, partLabel, resultHref } from '@/lib/lingo'
import { saveAnswer, submitAttempt } from '@/lib/lingo-actions'
import {
  type Attempt,
  type AttemptQuestion,
  type ExamDetail,
  type PartInfo,
  lingoKeys,
} from '@/lib/queries/lingo'
import { scriptOf } from '@/lib/speech'

const clock = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Questions of one item (a photo, a conversation, a passage): shown and heard together. */
interface Group {
  itemId: string
  part: string
  start: number
  end: number
}

function groupsOf(questions: AttemptQuestion[]): Group[] {
  const groups: Group[] = []
  questions.forEach((q, i) => {
    const last = groups.at(-1)
    if (last?.itemId === q.itemId) last.end = i + 1
    else groups.push({ itemId: q.itemId, part: q.part, start: i, end: i + 1 })
  })
  return groups
}

const onFullscreenChange = (callback: () => void) => {
  document.addEventListener('fullscreenchange', callback)
  return () => document.removeEventListener('fullscreenchange', callback)
}

function useFullscreen() {
  const on = useSyncExternalStore(
    onFullscreenChange,
    () => document.fullscreenElement !== null,
    () => false,
  )
  const supported = useSyncExternalStore(
    onFullscreenChange,
    () => document.fullscreenEnabled ?? false,
    () => false,
  )
  const toggle = () =>
    void (
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    ).catch(() => undefined)
  return { on, supported, toggle }
}

function QuestionBlock({
  q,
  n,
  hideQuestion,
  hideOptions,
  active,
  choice,
  flagged,
  onChoose,
  onFlag,
  onFocus,
}: {
  q: AttemptQuestion
  n: number
  /** Heard, not printed (Part 1–2) */
  hideQuestion: boolean
  hideOptions: boolean
  active: boolean
  choice: number | null
  flagged: boolean
  onChoose: (choice: number) => void
  onFlag: () => void
  onFocus: () => void
}) {
  return (
    <section
      id={`q-${q.id}`}
      aria-label={`Câu ${n}`}
      onFocusCapture={onFocus}
      className={cn(
        'flex scroll-mt-20 flex-col gap-3 rounded-xl border p-4',
        active ? 'border-primary/60 bg-card' : 'bg-card/60',
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            `flex size-8 shrink-0 items-center justify-center rounded-full
            text-sm font-medium tabular-nums`,
            active ? 'bg-primary text-primary-foreground' : 'bg-muted',
          )}
        >
          {n}
        </span>
        {q.text && !hideQuestion ? (
          <p className="flex-1 pt-1 leading-relaxed">{q.text}</p>
        ) : (
          <p className="flex-1 pt-1.5 text-sm text-muted-foreground">
            Nghe {q.text ? 'câu hỏi' : ''}
            {q.text && hideOptions ? ' và ' : ''}
            {hideOptions ? 'các lựa chọn' : ''} rồi chọn đáp án đúng.
          </p>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-pressed={flagged}
          aria-label={flagged ? `Bỏ đánh dấu câu ${n}` : `Đánh dấu câu ${n}`}
          title="Đánh dấu để xem lại (F)"
          onClick={onFlag}
          className={cn(flagged && 'text-amber-600 dark:text-amber-400')}
        >
          <Flag aria-hidden className={cn(flagged && 'fill-current')} />
        </Button>
      </div>
      <div
        role="radiogroup"
        aria-label={`Đáp án câu ${n}`}
        className="flex flex-col gap-2"
      >
        {q.options.map((option, i) => {
          const selected = choice === i
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(i)}
              className={cn(
                `flex min-h-11 w-full cursor-pointer items-center gap-3
                rounded-lg border px-3 py-2 text-left transition-colors
                outline-none focus-visible:ring-3 focus-visible:ring-ring/50`,
                selected ? 'border-primary bg-primary/10' : 'hover:bg-muted/60',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  `flex size-7 shrink-0 items-center justify-center rounded-full
                  border text-sm font-medium`,
                  selected &&
                    'border-primary bg-primary text-primary-foreground',
                )}
              >
                {LETTERS[i]}
              </span>
              {!hideOptions && <span>{option}</span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}

/**
 * Test room in the style of the real exam: the questions of one item at a time (passage or
 * recording once, then its questions), the numbers of every question by part on the side. Keys:
 * A–D choose for the active question, ← → move, F flags. Each choice is saved at once, so a closed
 * tab resumes where it stopped; with a time limit the attempt is submitted when the clock runs out.
 * In a full test each recording plays once.
 */
export function ExamRoom({
  attempt,
  exam,
}: {
  attempt: Attempt
  exam: ExamDetail
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const questions = attempt.questions
  const groups = useMemo(() => groupsOf(questions), [questions])
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      questions.findIndex((q) => !q.response),
    ),
  )
  const [choices, setChoices] = useState<(number | null)[]>(() =>
    questions.map((q) => q.response?.choice ?? null),
  )
  const [flags, setFlags] = useState(() => questions.map((q) => q.flagged))
  const [submitting, setSubmitting] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  /** Items whose recording was played (full test: once each) */
  const [played, setPlayed] = useState<ReadonlySet<string>>(new Set())
  // Quick practice: Part 1–2 options are printed; the question only for the one it was opened on
  // (moving on hides it again). Tests stay listening-only.
  const [questionShownFor, setQuestionShownFor] = useState<string | null>(null)
  const shownAt = useRef(0)
  const autoSubmitted = useRef(false)
  const fullscreen = useFullscreen()
  const deadline = attempt.deadline ? Date.parse(attempt.deadline) : null
  const parts = new Map<string, PartInfo>(
    exam.sections.flatMap((s) => s.parts.map((p) => [p.code, p])),
  )

  const group = groups.find((g) => index >= g.start && index < g.end)!
  const groupIndex = groups.indexOf(group)
  const groupQuestions = questions.slice(group.start, group.end)
  const first = groupQuestions[0]!
  const part = parts.get(group.part)
  const spoken = part?.spokenOptions ?? false
  const script = scriptOf(first, spoken)
  const quick = attempt.mode === 'QUICK'
  const showQuestion = questionShownFor === group.itemId
  const scored = attempt.mode === 'FULL_TEST' || attempt.mode === 'PLACEMENT'
  const answered = choices.filter((c) => c !== null).length
  const remaining = deadline === null ? null : deadline - now
  const exitHref = attempt.test
    ? `/lingo/tests/${attempt.test.id}`
    : attempt.mode === 'PLACEMENT'
      ? '/lingo/roadmap'
      : `/lingo/${attempt.exam}`

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    shownAt.current = Date.now()
  }, [group.start])

  useEffect(() => {
    document
      .getElementById(`q-${questions[index]!.id}`)
      ?.scrollIntoView?.({ block: 'nearest' })
  }, [index, questions])

  const choose = useCallback(
    (at: number, choice: number) => {
      setIndex(at)
      setChoices((prev) => prev.map((c, i) => (i === at ? choice : c)))
      void saveAnswer(attempt.id, questions[at]!.id, {
        choice,
        timeMs: Date.now() - shownAt.current,
      })
        .then((res) => {
          if (res.errors)
            toast.error('Chưa lưu được đáp án', {
              description: res.errors.join(' · '),
            })
        })
        .catch(() => toast.error('Mất kết nối, đáp án chưa được lưu'))
    },
    [attempt.id, questions],
  )

  const toggleFlag = useCallback(
    (at: number) => {
      const flagged = !flags[at]
      setFlags((prev) => prev.map((f, i) => (i === at ? flagged : f)))
      void saveAnswer(attempt.id, questions[at]!.id, { flagged }).catch(
        () => undefined,
      )
    },
    [attempt.id, flags, questions],
  )

  const go = useCallback(
    (to: number) => setIndex(Math.min(Math.max(to, 0), questions.length - 1)),
    [questions.length],
  )
  const goGroup = (to: number) => {
    const target = groups[Math.min(Math.max(to, 0), groups.length - 1)]!
    setIndex(target.start)
    window.scrollTo({ top: 0 })
  }

  async function submit(timeUp = false) {
    const missing = questions.length - answered
    if (
      !timeUp &&
      !window.confirm(
        missing
          ? `Còn ${missing} câu chưa làm (tính là sai). Vẫn nộp bài?`
          : 'Nộp bài và xem kết quả?',
      )
    )
      return
    setSubmitting(true)
    try {
      const res = await submitAttempt(attempt.id)
      if (res.data) {
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
        if (document.fullscreenElement)
          await document.exitFullscreen().catch(() => undefined)
        router.replace(resultHref(attempt.id))
      } else {
        toast.error('Không nộp được bài', {
          description: res.errors?.join(' · '),
        })
        setSubmitting(false)
      }
    } catch {
      toast.error('Không kết nối được máy chủ')
      setSubmitting(false)
    }
  }

  // Time is up: submit what was answered
  useEffect(() => {
    if (remaining === null || remaining > 0 || autoSubmitted.current) return
    autoSubmitted.current = true
    toast.info('Hết giờ, bài đã được nộp')
    void submit(true)
  })

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return
      const key = event.key.toUpperCase()
      const letter = LETTERS.indexOf(key)
      const digit = Number(key) - 1
      const pick = letter >= 0 ? letter : Number.isInteger(digit) ? digit : -1
      if (pick >= 0 && pick < questions[index]!.options.length) {
        event.preventDefault()
        choose(index, pick)
      } else if (event.key === 'ArrowRight') go(index + 1)
      else if (event.key === 'ArrowLeft') go(index - 1)
      else if (key === 'F') toggleFlag(index)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, go, index, questions, toggleFlag])

  const questionList = (
    <div className="flex flex-col gap-3">
      {groupQuestions.map((q, i) => {
        const at = group.start + i
        return (
          <QuestionBlock
            key={q.id}
            q={q}
            n={q.order + 1}
            hideQuestion={spoken && !(quick && showQuestion)}
            hideOptions={spoken && !quick}
            active={at === index}
            choice={choices[at] ?? null}
            flagged={flags[at] ?? false}
            onChoose={(choice) => choose(at, choice)}
            onFlag={() => toggleFlag(at)}
            onFocus={() => setIndex(at)}
          />
        )
      })}
    </div>
  )

  return (
    <div className="flex min-h-dvh flex-col bg-muted/20">
      <header
        className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur-sm"
      >
        <div
          className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4"
        >
          <Link
            href={exitHref}
            onClick={(event) => {
              if (
                !window.confirm(
                  'Thoát phòng thi? Đáp án đã lưu, bạn làm tiếp được từ Lịch sử (đồng hồ vẫn chạy).',
                )
              )
                event.preventDefault()
            }}
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <X aria-hidden />
            <span className="max-sm:sr-only">Thoát</span>
          </Link>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">
              {attempt.test?.title ?? exam.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {attempt.mode === 'FULL_TEST'
                ? 'Full test'
                : attempt.mode === 'PLACEMENT'
                  ? 'Kiểm tra đầu vào'
                  : attempt.parts.map(partLabel).join(', ')}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {remaining === null ? (
              <span
                aria-label="Thời gian đã làm"
                className="rounded-lg border px-2.5 py-1 font-mono text-sm
                  tabular-nums"
              >
                {clock(now - Date.parse(attempt.startedAt))}
              </span>
            ) : (
              <span
                aria-label="Thời gian còn lại"
                className={cn(
                  `flex items-center gap-1.5 rounded-lg border px-2.5 py-1
                    font-mono text-sm tabular-nums`,
                  remaining < 5 * 60_000 &&
                    'border-destructive/50 font-semibold text-destructive',
                )}
              >
                <Timer aria-hidden className="size-4" />
                {clock(remaining)}
              </span>
            )}
            {fullscreen.supported && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={fullscreen.toggle}
                aria-label={
                  fullscreen.on ? 'Thoát toàn màn hình' : 'Toàn màn hình'
                }
                title={fullscreen.on ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
              >
                {fullscreen.on ? (
                  <Minimize aria-hidden />
                ) : (
                  <Maximize aria-hidden />
                )}
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => void submit()}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2
                  aria-hidden
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <Send aria-hidden />
              )}
              Nộp bài
            </Button>
          </div>
        </div>
      </header>

      <div
        className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6
          lg:grid-cols-[minmax(0,1fr)_18rem]"
      >
        <main className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-muted-foreground">
              {partLabel(group.part)}
              {part && ` · ${part.nameVi}`}
            </span>
            <h1 className="text-lg font-medium">
              {group.end - group.start > 1
                ? `Câu ${questions[group.start]!.order + 1}–${questions[group.end - 1]!.order + 1}`
                : `Câu ${first.order + 1}`}
              <span className="font-normal text-muted-foreground">
                {' '}
                / {questions.length}
              </span>
            </h1>
          </div>

          {first.imageUrl && <QuestionImage url={first.imageUrl} />}
          {quick && spoken && first.text && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={showQuestion}
              onClick={() =>
                setQuestionShownFor(showQuestion ? null : group.itemId)
              }
              className="self-start"
            >
              {showQuestion ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
              {showQuestion ? 'Ẩn câu hỏi' : 'Hiện câu hỏi'}
            </Button>
          )}
          {script.length > 0 && (
            <ListeningPlayer
              key={group.itemId}
              lines={script}
              locked={attempt.mode === 'FULL_TEST' && played.has(group.itemId)}
              fixedSpeed={scored}
              onPlayed={() =>
                setPlayed((prev) => new Set(prev).add(group.itemId))
              }
            />
          )}

          {first.passage ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <Passage
                text={first.passage}
                className="xl:sticky xl:top-20 xl:max-h-[calc(100dvh-7rem)]
                  xl:self-start xl:overflow-y-auto"
              />
              {questionList}
            </div>
          ) : (
            questionList
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => goGroup(groupIndex - 1)}
              disabled={groupIndex === 0}
            >
              <ChevronLeft aria-hidden />
              Trước
            </Button>
            {groupIndex < groups.length - 1 ? (
              <Button onClick={() => goGroup(groupIndex + 1)}>
                Tiếp
                <ChevronRight aria-hidden />
              </Button>
            ) : (
              <Button onClick={() => void submit()} disabled={submitting}>
                <Send aria-hidden />
                Nộp bài
              </Button>
            )}
          </div>
        </main>

        <aside
          aria-label="Danh sách câu"
          className="flex h-fit flex-col gap-4 rounded-xl border bg-card p-4
            lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-medium">Danh sách câu</h2>
            <span className="text-sm text-muted-foreground tabular-nums">
              {answered}/{questions.length} đã làm
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Tiến độ"
            aria-valuenow={answered}
            aria-valuemin={0}
            aria-valuemax={questions.length}
            className="h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full origin-left rounded-full bg-primary
                transition-transform motion-reduce:transition-none"
              style={{ transform: `scaleX(${answered / questions.length})` }}
            />
          </div>
          {[...new Set(questions.map((q) => q.part))].map((code) => (
            <div key={code} className="flex flex-col gap-2">
              <h3 className="text-xs font-medium text-muted-foreground">
                {partLabel(code)}
              </h3>
              <div className="grid grid-cols-6 gap-1.5">
                {questions.map((q, i) =>
                  q.part !== code ? null : (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => go(i)}
                      aria-current={i === index ? 'step' : undefined}
                      aria-label={`Câu ${q.order + 1}${choices[i] !== null ? ', đã chọn' : ''}${flags[i] ? ', đã đánh dấu' : ''}`}
                      className={cn(
                        `relative flex h-8 cursor-pointer items-center
                          justify-center rounded-md border text-xs tabular-nums
                          transition-colors outline-none focus-visible:ring-3
                          focus-visible:ring-ring/50`,
                        choices[i] !== null
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'hover:bg-muted',
                        i === index &&
                          'ring-2 ring-primary ring-offset-1 ring-offset-card',
                      )}
                    >
                      {q.order + 1}
                      {flags[i] && (
                        <Flag
                          aria-hidden
                          className="absolute -top-1.5 -right-1.5 size-3.5
                            fill-amber-500 text-amber-500"
                        />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
          <p className="border-t pt-3 text-xs text-muted-foreground">
            Phím tắt: A–D chọn đáp án · ← → chuyển câu · F đánh dấu
          </p>
        </aside>
      </div>
    </div>
  )
}
