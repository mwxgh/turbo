'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import {
  BookOpenCheck,
  ClipboardList,
  Flame,
  Layers,
  Target,
} from 'lucide-react'

import { buttonVariants } from '@repo/ui/components/button'
import { formatDate } from '@repo/utils'

import { percent } from '@/lib/lingo'
import { dashboardQueryOptions, examQueryOptions } from '@/lib/queries/lingo'

import { GoalForm } from './goal-form'
import { QuickPractice } from './quick-practice'

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  children,
}: {
  icon: typeof Flame
  label: string
  value: string
  hint?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-xs">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" />
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-medium tabular-nums">{value}</span>
        {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

export function ExamDashboard({
  exam,
  isAdmin,
}: {
  exam: string
  isAdmin: boolean
}) {
  const { data: spec } = useQuery(examQueryOptions(exam))
  const { data: dash } = useQuery(dashboardQueryOptions(exam))
  if (!spec || !dash)
    return (
      <p role="status" className="text-muted-foreground">
        Không tải được dữ liệu Lingo. Thử tải lại trang.
      </p>
    )

  const partName = (code: string) =>
    spec.sections.flatMap((s) => s.parts).find((p) => p.code === code)
      ?.nameVi ?? code
  const toReview = dash.review.due + dash.review.new

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          {spec.name}
        </h1>
        <p className="text-muted-foreground">
          {dash.goal.targetScore
            ? `Mục tiêu ${dash.goal.targetScore} điểm${
                dash.goal.examDate
                  ? `, thi ngày ${formatDate(dash.goal.examDate)}`
                  : ''
              }`
            : 'Đặt mục tiêu để theo dõi tiến độ'}
        </p>
      </div>

      <section
        aria-label="Hôm nay"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Stat
          icon={Layers}
          label="Thẻ cần ôn hôm nay"
          value={String(toReview)}
          hint={`${dash.review.due} đến hạn · ${dash.review.new} mới`}
        >
          <Link
            href={`/lingo/review?exam=${exam}`}
            aria-disabled={toReview === 0}
            className={buttonVariants({
              size: 'sm',
              variant: toReview ? 'default' : 'outline',
              className: 'mt-auto self-start',
            })}
          >
            {toReview ? 'Ôn ngay' : 'Xem bộ thẻ'}
          </Link>
        </Stat>
        <Stat
          icon={Flame}
          label="Chuỗi ngày học"
          value={`${dash.streak}`}
          hint="ngày"
        />
        <Stat
          icon={BookOpenCheck}
          label="Độ chính xác"
          value={dash.totals.answered ? percent(dash.totals.accuracy) : '–'}
          hint={`${dash.totals.answered} câu đã làm`}
        />
        <Stat
          icon={Target}
          label="Mục tiêu"
          value={dash.goal.targetScore ? String(dash.goal.targetScore) : '–'}
          hint={dash.goal.targetScore ? 'điểm' : 'chưa đặt'}
        >
          <GoalForm exam={exam} goal={dash.goal} />
        </Stat>
      </section>

      <section
        aria-labelledby="tests-cta-heading"
        className="flex flex-wrap items-center justify-between gap-4 rounded-xl
          border bg-card p-5 shadow-xs"
      >
        <div className="flex flex-col gap-1">
          <h2 id="tests-cta-heading" className="font-medium">
            Thi thử theo đề
          </h2>
          <p className="text-sm text-muted-foreground">
            Full test và mini test có giờ, điểm quy đổi, hoặc luyện từng Part
            của một đề.
          </p>
        </div>
        <Link
          href={`/lingo/${exam}/tests`}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ClipboardList aria-hidden="true" />
          Thư viện đề
        </Link>
      </section>

      <QuickPractice exam={exam} spec={spec} isAdmin={isAdmin} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="weak-heading" className="flex flex-col gap-3">
          <h2 id="weak-heading" className="text-lg font-medium">
            Điểm yếu
          </h2>
          {dash.weakTags.length ? (
            <ul
              className="flex flex-col gap-4 rounded-xl border bg-card p-5
                shadow-xs"
            >
              {dash.weakTags.map((tag) => (
                <li key={tag.tag} className="flex flex-col gap-1.5">
                  <div className="flex justify-between gap-2 text-sm">
                    <span>{tag.label}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {tag.correct}/{tag.total} · {percent(tag.accuracy)}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={tag.label}
                    aria-valuenow={Math.round(tag.accuracy * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: percent(tag.accuracy) }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="rounded-xl border border-dashed p-4 text-sm
                text-muted-foreground"
            >
              Làm thêm vài bài (mỗi kỹ năng từ 3 câu) để thấy điểm yếu
            </p>
          )}
        </section>

        <section
          aria-labelledby="recent-heading"
          className="flex flex-col gap-3"
        >
          <h2 id="recent-heading" className="text-lg font-medium">
            Bài gần đây
          </h2>
          {dash.recentAttempts.length ? (
            <ul
              className="divide-y overflow-hidden rounded-xl border bg-card
                shadow-xs"
            >
              {dash.recentAttempts.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/lingo/attempts/${a.id}`}
                    className="flex items-center justify-between gap-3 px-4 py-3
                      text-sm transition-colors outline-none hover:bg-muted/50
                      focus-visible:ring-3 focus-visible:ring-ring/50
                      focus-visible:ring-inset"
                  >
                    <span>
                      {a.parts.map(partName).join(', ')}
                      <span className="text-muted-foreground">
                        {' · '}
                        {formatDate(a.submittedAt)}
                      </span>
                    </span>
                    <span
                      className="font-mono text-muted-foreground tabular-nums"
                    >
                      {a.correct ?? 0}/{a.total}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="rounded-xl border border-dashed p-4 text-sm
                text-muted-foreground"
            >
              Chưa có bài nào. Bắt đầu bằng một bài luyện nhanh ở trên.
            </p>
          )}
        </section>
      </div>
    </>
  )
}
