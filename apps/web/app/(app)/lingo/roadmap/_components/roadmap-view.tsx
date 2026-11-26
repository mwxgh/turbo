'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import {
  BookOpen,
  Check,
  ClipboardCheck,
  FileText,
  Loader2,
  Play,
} from 'pulsoicon-react'

import { Button, buttonVariants } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'
import { formatDate } from '@repo/utils'

import { GoalForm } from '@/components/goal-form'
import { percent, takeHref } from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import {
  type PlanWeek,
  type Roadmap,
  type RoadmapStage,
  type RoadmapTask,
  type StudyPlan,
  dashboardQueryOptions,
  roadmapQueryOptions,
} from '@/lib/queries/lingo'

import { ProgressDonut } from './progress-donut'

const STATUS: Record<RoadmapStage['status'], string> = {
  done: 'Đã xong',
  passed: 'Đã vượt qua',
  current: 'Đang học',
  upcoming: 'Sắp tới',
}

/** Starts an attempt and opens the exam room. */
function useStart(exam: string) {
  const router = useRouter()
  const [pending, setPending] = useState<string>()
  async function start(
    key: string,
    input: { part?: string; placement?: boolean },
  ) {
    setPending(key)
    try {
      const res = await startAttempt({ exam, count: 10, ...input })
      if (res.data) router.push(takeHref(res.data.id))
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setPending(undefined)
    }
  }
  return { pending, start }
}

function TaskAction({
  task,
  exam,
  starter,
}: {
  task: RoadmapTask
  exam: string
  starter: ReturnType<typeof useStart>
}) {
  const busy = starter.pending === task.id
  const spinner = (
    <Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" />
  )
  switch (task.kind) {
    case 'placement':
      return (
        <Button
          size="sm"
          disabled={!!starter.pending}
          onClick={() => void starter.start(task.id, { placement: true })}
        >
          {busy ? spinner : <ClipboardCheck aria-hidden />}
          Làm bài
        </Button>
      )
    case 'part':
      return (
        <Button
          size="sm"
          variant="outline"
          disabled={!!starter.pending}
          onClick={() => void starter.start(task.id, { part: task.part })}
        >
          {busy ? spinner : <Play aria-hidden />}
          Luyện 10 câu
        </Button>
      )
    case 'words':
      return (
        <Link
          href={`/lingo/review?exam=${exam}`}
          className={buttonVariants({ size: 'sm', variant: 'outline' })}
        >
          <BookOpen aria-hidden />
          Ôn từ
        </Link>
      )
    default:
      return (
        <Link
          href={`/lingo/${exam}/tests`}
          className={buttonVariants({ size: 'sm', variant: 'outline' })}
        >
          <FileText aria-hidden />
          Chọn đề
        </Link>
      )
  }
}

function TaskRow({
  task,
  exam,
  starter,
  actionable,
}: {
  task: RoadmapTask
  exam: string
  starter: ReturnType<typeof useStart>
  actionable: boolean
}) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
      <span
        aria-hidden="true"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border',
          task.done && 'border-foreground bg-foreground text-background',
        )}
      >
        {task.done && <Check className="size-3" />}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span
          className={cn(
            'text-sm font-medium',
            task.done && 'text-muted-foreground',
          )}
        >
          {task.label}
          {task.done && <span className="sr-only"> (đã xong)</span>}
        </span>
        <div className="flex items-center gap-3">
          <div
            role="progressbar"
            aria-label={task.label}
            aria-valuenow={Math.round(task.progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1 w-full max-w-56 overflow-hidden rounded-full
              bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.round(task.progress * 100)}%` }}
            />
          </div>
          <span
            className="text-xs whitespace-nowrap text-muted-foreground
              tabular-nums"
          >
            {task.detail}
          </span>
        </div>
      </div>
      {actionable && !task.done && (
        <TaskAction task={task} exam={exam} starter={starter} />
      )}
    </li>
  )
}

function StageCard({
  stage,
  index,
  exam,
  starter,
}: {
  stage: RoadmapStage
  index: number
  exam: string
  starter: ReturnType<typeof useStart>
}) {
  const status = STATUS[stage.status]
  const current = stage.status === 'current'
  const finished = stage.status === 'done' || stage.status === 'passed'
  const done = stage.tasks.filter((t) => t.done).length
  return (
    <li className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            `flex size-8 shrink-0 items-center justify-center rounded-full
            border bg-background text-sm font-medium tabular-nums`,
            current && 'border-foreground bg-foreground text-background',
            finished && 'text-foreground',
            stage.status === 'upcoming' && 'text-muted-foreground',
          )}
        >
          {finished ? <Check aria-hidden className="size-4" /> : index + 1}
        </span>
        <span aria-hidden="true" className="w-px flex-1 bg-border" />
      </div>
      <section
        aria-labelledby={`stage-${stage.id}`}
        className={cn(
          `mb-6 flex min-w-0 flex-1 flex-col gap-3 rounded-xl border bg-card p-5
          shadow-xs`,
          current && 'border-foreground/20 shadow-sm',
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 id={`stage-${stage.id}`} className="text-lg font-medium">
            Giai đoạn {index + 1}: {stage.title}
          </h2>
          <span
            className={cn(
              'text-sm',
              current
                ? 'font-medium text-rose-700 dark:text-rose-300'
                : 'text-muted-foreground',
            )}
          >
            {status}
          </span>
          <span className="ml-auto text-sm text-muted-foreground tabular-nums">
            {done}/{stage.tasks.length} nhiệm vụ
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {stage.goal}
          {stage.status === 'passed' &&
            stage.passScore !== null &&
            ` Điểm ước tính của bạn đã từ ${stage.passScore}, có thể bỏ qua hoặc làm để củng cố.`}
        </p>
        <details open={current} className="group">
          <summary
            className="cursor-pointer text-sm font-medium outline-none
              focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Nhiệm vụ và lời khuyên
          </summary>
          <ul className="mt-1 flex flex-col divide-y">
            {stage.tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                exam={exam}
                starter={starter}
                actionable={stage.status !== 'upcoming'}
              />
            ))}
          </ul>
          <ul
            className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm
              text-muted-foreground"
          >
            {stage.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </details>
      </section>
    </li>
  )
}

const WEEK_STATUS: Record<PlanWeek['status'], string> = {
  done: 'Đã xong',
  missed: 'Chưa đạt',
  current: 'Tuần này',
  upcoming: 'Sắp tới',
}

/** "16/11 – 22/11" for a plan week (`end` is excluded, so the last day is the day before). */
function weekDates(week: PlanWeek) {
  if (!week.start || !week.end) return null
  const sunday = Date.parse(week.end) - 86_400_000
  return `${formatDate(week.start, 'dd/MM')} – ${formatDate(sunday, 'dd/MM')}`
}

/**
 * The 12-week plan: one cell per week (status at a glance), then the chosen week's focus, tasks
 * measured on that week only, and tips. Opens on the current week.
 */
function PlanSection({
  plan,
  exam,
  starter,
}: {
  plan: StudyPlan
  exam: string
  starter: ReturnType<typeof useStart>
}) {
  const [picked, setPicked] = useState(plan.currentWeek ?? 1)
  const week = plan.weeks[picked - 1] ?? plan.weeks[0]
  if (!week) return null
  const dates = weekDates(week)
  const done = week.tasks.filter((t) => t.done).length
  return (
    <section
      aria-labelledby="plan-heading"
      className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 id="plan-heading" className="text-lg font-medium">
          Lịch 12 tuần
        </h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {plan.currentWeek
            ? `Tuần ${plan.currentWeek}/12`
            : plan.start
              ? 'Đã đi hết 12 tuần'
              : 'Bắt đầu từ tuần bạn làm bài đầu vào'}
        </span>
      </div>

      <div
        role="group"
        aria-label="Chọn tuần"
        className="grid grid-cols-6 gap-1.5 sm:grid-cols-12"
      >
        {plan.weeks.map((w) => {
          const selected = w.week === week.week
          return (
            <button
              key={w.week}
              type="button"
              aria-pressed={selected}
              aria-label={`Tuần ${w.week}: ${w.title} (${WEEK_STATUS[w.status]})`}
              onClick={() => setPicked(w.week)}
              className={cn(
                `relative flex h-10 cursor-pointer items-center justify-center
                rounded-md border text-sm tabular-nums transition-colors
                outline-none focus-visible:ring-3 focus-visible:ring-ring/50`,
                w.status === 'done' &&
                  'border-foreground bg-foreground text-background',
                w.status === 'current' &&
                  `border-rose-600 font-medium text-rose-700
                  dark:border-rose-400 dark:text-rose-300`,
                w.status === 'missed' && 'text-muted-foreground',
                w.status === 'upcoming' &&
                  'text-muted-foreground hover:bg-muted',
                selected && w.status !== 'done' && 'bg-muted',
                selected && 'ring-2 ring-foreground/20',
              )}
            >
              {w.status === 'done' ? (
                <Check aria-hidden className="size-4" />
              ) : (
                w.week
              )}
              {w.status === 'missed' && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-1 size-1.5 rounded-full
                    bg-destructive/70"
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-medium">
            Tuần {week.week}: {week.title}
          </h3>
          <span className="text-sm text-muted-foreground">
            {week.phase}
            {dates && <span className="tabular-nums"> · {dates}</span>}
          </span>
          <span className="ml-auto text-sm text-muted-foreground tabular-nums">
            {WEEK_STATUS[week.status]} · {done}/{week.tasks.length} nhiệm vụ
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{week.focus}</p>
      </div>

      <ul
        aria-label={`Nhiệm vụ tuần ${week.week}`}
        className="flex flex-col divide-y"
      >
        {week.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            exam={exam}
            starter={starter}
            actionable={week.status === 'current'}
          />
        ))}
      </ul>
      {week.lessons.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium">Bài học tuần này</h4>
          <ul className="flex flex-wrap gap-2">
            {week.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lingo/lessons/${lesson.id}`}
                  className={buttonVariants({ size: 'sm', variant: 'outline' })}
                >
                  <BookOpen aria-hidden />
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul
        className="flex list-disc flex-col gap-1 pl-5 text-sm
          text-muted-foreground"
      >
        {week.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  )
}

/** Three rings: the whole roadmap by task status, the estimate against the target, this week. */
function ProgressSection({
  roadmap,
  thisWeek,
}: {
  roadmap: Roadmap
  thisWeek: PlanWeek | undefined
}) {
  const tasks = roadmap.stages.flatMap((s) =>
    s.tasks.map((t) => ({ done: t.done, current: s.status === 'current' })),
  )
  const done = tasks.filter((t) => t.done).length
  const current = tasks.filter((t) => !t.done && t.current).length
  const reached =
    roadmap.estimate === null ? 0 : Math.min(roadmap.estimate, roadmap.target)
  const weekDone = thisWeek?.tasks.filter((t) => t.done).length ?? 0
  return (
    <section aria-labelledby="progress-heading" className="flex flex-col gap-3">
      <h2 id="progress-heading" className="sr-only">
        Tiến độ
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <ProgressDonut
          title="Hoàn thành lộ trình"
          caption={`${done}/${tasks.length} nhiệm vụ`}
          legend
          segments={[
            { label: 'Đã xong', value: done, className: 'stroke-foreground' },
            {
              label: 'Đang học',
              value: current,
              className: 'stroke-rose-600 dark:stroke-rose-400',
            },
            {
              label: 'Còn lại',
              value: tasks.length - done - current,
              className: 'stroke-muted',
            },
          ]}
        />
        <ProgressDonut
          title="Tiến tới mục tiêu"
          caption={
            roadmap.estimate === null
              ? 'Làm bài đầu vào để có điểm ước tính'
              : `${roadmap.estimate}/${roadmap.target} điểm`
          }
          segments={
            roadmap.estimate === null
              ? []
              : [
                  {
                    label: 'Đã đạt',
                    value: reached,
                    className: 'stroke-foreground',
                  },
                  {
                    label: 'Còn thiếu',
                    value: roadmap.target - reached,
                    className: 'stroke-muted',
                  },
                ]
          }
        />
        <ProgressDonut
          title="Tuần này"
          caption={
            thisWeek
              ? `Tuần ${thisWeek.week}/12 · ${weekDone}/${thisWeek.tasks.length} nhiệm vụ`
              : 'Chưa vào lịch 12 tuần'
          }
          segments={
            thisWeek
              ? [
                  {
                    label: 'Đã xong',
                    value: weekDone,
                    className: 'stroke-foreground',
                  },
                  {
                    label: 'Còn lại',
                    value: thisWeek.tasks.length - weekDone,
                    className: 'stroke-muted',
                  },
                ]
              : []
          }
        />
      </div>
    </section>
  )
}

/** The learner's roadmap: target, progress rings, today's work, the 12-week plan, then the stages. */
export function RoadmapView({ exam }: { exam: string }) {
  const {
    data: roadmap,
    isError,
    refetch,
  } = useQuery(roadmapQueryOptions(exam))
  const { data: dashboard } = useQuery(dashboardQueryOptions(exam))
  const starter = useStart(exam)
  // Read once: rendering must stay pure
  const [now] = useState(() => Date.now())
  if (!roadmap)
    return isError ? (
      <div
        role="alert"
        className="flex flex-col items-start gap-3 rounded-xl border bg-card p-6
          shadow-xs"
      >
        <p className="font-medium">Không tải được lộ trình</p>
        <p className="text-sm text-muted-foreground">
          Máy chủ chưa trả lời. Thử lại sau ít phút.
        </p>
        <Button size="sm" variant="outline" onClick={() => void refetch()}>
          Thử lại
        </Button>
      </div>
    ) : (
      <p className="text-muted-foreground">Đang tải lộ trình…</p>
    )

  const stage = roadmap.stages.find((s) => s.status === 'current')
  const thisWeek = roadmap.plan.currentWeek
    ? roadmap.plan.weeks[roadmap.plan.currentWeek - 1]
    : undefined
  // This week's plan first, then the current stage
  const next =
    thisWeek?.tasks.find((t) => !t.done && t.kind !== 'words') ??
    stage?.tasks.find((t) => !t.done)
  const placement = roadmap.stages[0]?.tasks.find((t) => t.kind === 'placement')
  const examDate = dashboard?.goal.examDate
  const daysLeft = examDate
    ? Math.ceil((Date.parse(examDate) - now) / 86_400_000)
    : null
  const newToday = Math.min(
    dashboard?.review.new ?? 0,
    dashboard?.goal.newCardsPerDay ?? 0,
  )

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">Lộ trình TOEIC</h1>
        <p className="text-muted-foreground">
          Đi lần lượt từng giai đoạn. Tiến độ tự cập nhật từ bài làm và thẻ từ
          vựng bạn đã ôn.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div
          className="flex flex-col gap-1 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <dt className="text-sm text-muted-foreground">Mục tiêu</dt>
          <dd className="text-2xl font-medium tabular-nums">
            {roadmap.target}
          </dd>
          <dd className="text-xs text-muted-foreground">
            {dashboard?.goal.targetScore ? 'điểm' : 'Mặc định, chưa đặt'}
          </dd>
          {dashboard && (
            <dd className="mt-auto pt-1">
              <GoalForm exam={exam} goal={dashboard.goal} />
            </dd>
          )}
        </div>
        <div
          className="flex flex-col gap-1 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <dt className="text-sm text-muted-foreground">Điểm ước tính</dt>
          <dd className="text-2xl font-medium tabular-nums">
            {roadmap.estimate ?? '–'}
          </dd>
          <dd className="text-xs text-muted-foreground">
            Từ bài đầu vào hoặc full test gần nhất
          </dd>
        </div>
        <div
          className="flex flex-col gap-1 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <dt className="text-sm text-muted-foreground">Tỉ lệ đúng cần đạt</dt>
          <dd className="text-2xl font-medium tabular-nums">
            {percent(roadmap.accuracy)}
          </dd>
          <dd className="text-xs text-muted-foreground tabular-nums">
            Khoảng {Math.round(roadmap.accuracy * 200)}/200 câu
          </dd>
        </div>
        <div
          className="flex flex-col gap-1 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <dt className="text-sm text-muted-foreground">Ngày thi</dt>
          <dd className="text-2xl font-medium tabular-nums">
            {daysLeft === null
              ? '–'
              : daysLeft >= 0
                ? `${daysLeft} ngày`
                : 'Đã qua'}
          </dd>
          <dd className="text-xs text-muted-foreground">
            {daysLeft === null ? 'Đặt ở ô Mục tiêu' : 'còn lại'}
          </dd>
        </div>
      </dl>

      <ProgressSection roadmap={roadmap} thisWeek={thisWeek} />

      {placement && !placement.done ? (
        <section
          aria-labelledby="placement-heading"
          className="flex flex-wrap items-center gap-4 rounded-xl border bg-card
            p-5 shadow-xs"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 id="placement-heading" className="font-medium">
              Bắt đầu bằng bài kiểm tra đầu vào
            </h2>
            <p className="text-sm text-muted-foreground">
              Khoảng 30 câu của mọi Part, 20 phút. Điểm ước tính chọn giai đoạn
              bắt đầu phù hợp, bỏ qua phần bạn đã vững.
            </p>
          </div>
          <TaskAction task={placement} exam={exam} starter={starter} />
        </section>
      ) : (
        <section
          aria-labelledby="today-heading"
          className="flex flex-col gap-3 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <h2 id="today-heading" className="font-medium">
            Hôm nay
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex flex-wrap items-center gap-3">
              <span className="flex-1">
                Ôn {dashboard?.review.due ?? 0} thẻ đến hạn và học {newToday} từ
                mới
              </span>
              <Link
                href={`/lingo/review?exam=${exam}`}
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
              >
                <BookOpen aria-hidden />
                Ôn từ
              </Link>
            </li>
            {next && next.kind !== 'words' && (
              <li className="flex flex-wrap items-center gap-3">
                <span className="flex-1">
                  {next.label}
                  <span className="text-muted-foreground">
                    {' '}
                    · {next.detail}
                  </span>
                </span>
                <TaskAction task={next} exam={exam} starter={starter} />
              </li>
            )}
            {!stage && (
              <li>
                Bạn đã hoàn thành lộ trình. Giữ nhịp làm full test mỗi tuần.
              </li>
            )}
          </ul>
        </section>
      )}

      <PlanSection plan={roadmap.plan} exam={exam} starter={starter} />

      <ol aria-label="Các giai đoạn" className="flex flex-col">
        {roadmap.stages.map((s, i) => (
          <StageCard
            key={s.id}
            stage={s}
            index={i}
            exam={exam}
            starter={starter}
          />
        ))}
      </ol>
    </>
  )
}
