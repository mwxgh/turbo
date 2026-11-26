'use client'

import { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useQueryStates } from 'nuqs'
import {
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  KanbanSquare,
  Plus,
} from 'pulsoicon-react'

import type { PlannerStatus, PlannerTask } from '@repo/types'
import { Button } from '@repo/ui/components/button'
import { cn } from '@repo/ui/lib/utils'

import type { PlannerTaskInput } from '@/app/(app)/planner/actions'
import {
  useDeleteTask,
  useMoveTask,
  useTaskActions,
} from '@/app/(app)/planner/use-planner-mutations'
import { useConfirm } from '@/components/confirm-dialog'
import {
  type PlannerView as View,
  normalizeDay,
  parseDay,
  plannerParsers,
  plannerRange,
  shiftDay,
  statusLabel,
  taskDay,
  todayKey,
} from '@/lib/planner'
import { plannerTasksQueryOptions } from '@/lib/queries/planner'

import { BacklogRail } from './backlog-rail'
import { BoardView } from './board-view'
import { DayView } from './day-view'
import { MonthView } from './month-view'
import { TaskDialog, type TaskDraft } from './task-dialog'

const VIEW_TABS: { value: View; label: string; icon: typeof CalendarDays }[] = [
  { value: 'day', label: 'Ngày', icon: CalendarDays },
  { value: 'month', label: 'Tháng', icon: CalendarRange },
  { value: 'board', label: 'Kanban', icon: KanbanSquare },
]

const shortDay = (key: string) => format(parseDay(key), 'dd/MM')

function heading(view: View, day: string) {
  const date = parseDay(day)
  if (view === 'day') return format(date, "EEEE, d 'tháng' M", { locale: vi })
  return format(date, "'Tháng' M, yyyy", { locale: vi })
}

/** /planner: toolbar, the chosen view, the backlog rail and the task dialog. */
export function PlannerView() {
  const [{ view, date }, setQuery] = useQueryStates(plannerParsers)
  const today = todayKey()
  const day = normalizeDay(date)
  const { data: tasks = [], isFetching } = useQuery({
    ...plannerTasksQueryOptions(plannerRange(day)),
    // Next / previous month: keep the old grid until the new one arrives
    placeholderData: keepPreviousData,
  })

  const actions = useTaskActions()
  const move = useMoveTask()
  const remove = useDeleteTask()
  const [confirm, confirmDialog] = useConfirm()
  const [draft, setDraft] = useState<TaskDraft | null>(null)

  const goTo = (next: string, nextView: View = view) =>
    void setQuery({ date: next === today ? null : next, view: nextView })

  const byId = (id: string) => tasks.find((task) => task.id === id)

  const moveToDay = (id: string, target: string) => {
    if (taskDay(byId(id) ?? { date: null }) === target) return
    move.mutate({
      id,
      patch: { date: target },
      message: `Đã dời sang ${shortDay(target)}`,
    })
  }
  const schedule = (id: string, target: string, startMinute: number | null) => {
    const task = byId(id)
    if (task && taskDay(task) === target && task.startMinute === startMinute)
      return
    move.mutate({
      id,
      patch: { date: target, startMinute },
      message:
        startMinute === null ? `Đã xếp vào ${shortDay(target)}` : 'Đã xếp giờ',
    })
  }
  const unschedule = (id: string) => {
    if (taskDay(byId(id) ?? { date: null }) === null) return
    move.mutate({
      id,
      patch: { date: null, startMinute: null },
      message: 'Đã gỡ khỏi lịch',
    })
  }
  const moveOnBoard = (id: string, status: PlannerStatus, position: number) =>
    move.mutate({
      id,
      patch: { status, position },
      message:
        byId(id)?.status === status
          ? 'Đã sắp xếp lại'
          : `Chuyển sang ${statusLabel(status)}`,
    })
  const toggleDone = (task: PlannerTask) => {
    const status = task.status === 'DONE' ? 'TODO' : 'DONE'
    move.mutate({
      id: task.id,
      patch: { status },
      message: status === 'DONE' ? 'Hoàn thành 🎉' : 'Đã mở lại việc',
    })
  }
  const resize = (task: PlannerTask, durationMinutes: number) =>
    move.mutate({
      id: task.id,
      patch: { durationMinutes },
      message: 'Đã đổi thời lượng',
    })

  const create = (defaults: PlannerTaskInput = {}) => setDraft({ defaults })
  const open = (task: PlannerTask) => setDraft({ task })

  const submit = (input: PlannerTaskInput, task?: PlannerTask) =>
    task ? actions.update(task.id, input) : actions.create(input)
  const destroy = async (task: PlannerTask) => {
    const ok = await confirm({
      title: 'Xoá việc này?',
      description: `“${task.title}” sẽ bị xoá vĩnh viễn.`,
      confirm: 'Xoá',
      destructive: true,
    })
    if (!ok) return
    setDraft(null)
    remove.mutate(task.id)
  }

  const ofToday = tasks.filter((task) => taskDay(task) === today)
  const doneToday = ofToday.filter((task) => task.status === 'DONE').length
  const backlog = tasks.filter(
    (task) => taskDay(task) === null && task.status !== 'DONE',
  ).length
  const doing = tasks.filter((task) => task.status === 'DOING').length

  const cardProps = { onOpen: open, onToggleDone: toggleDone }

  return (
    <>
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Lịch trình</p>
            <h1
              className="text-3xl font-semibold tracking-tight
                first-letter:uppercase"
            >
              {heading(view, day)}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="flex items-center rounded-xl border bg-card p-0.5
                shadow-xs"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label={view === 'day' ? 'Ngày trước' : 'Tháng trước'}
                onClick={() => goTo(shiftDay(day, view, -1))}
              >
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => goTo(today)}>
                Hôm nay
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={view === 'day' ? 'Ngày sau' : 'Tháng sau'}
                onClick={() => goTo(shiftDay(day, view, 1))}
              >
                <ChevronRight />
              </Button>
            </div>
            <div
              role="tablist"
              aria-label="Chế độ xem"
              className="flex items-center rounded-xl border bg-muted/60 p-0.5"
            >
              {VIEW_TABS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={view === value}
                  onClick={() => goTo(day, value)}
                  className={cn(
                    `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm
                    font-medium transition-all`,
                    view === value
                      ? 'bg-background text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={() =>
                create(
                  view === 'board'
                    ? {}
                    : { date: view === 'day' ? day : today },
                )
              }
            >
              <Plus />
              Thêm việc
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Hôm nay" value={`${doneToday}/${ofToday.length}`}>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width]
                  duration-500"
                style={{
                  width: `${ofToday.length ? (doneToday / ofToday.length) * 100 : 0}%`,
                }}
              />
            </div>
          </Stat>
          <Stat label="Đang làm" value={doing} />
          <Stat label="Chưa lên lịch" value={backlog} />
          <Stat
            label="Tháng này"
            value={
              tasks.filter((task) => taskDay(task)?.startsWith(day.slice(0, 7)))
                .length
            }
          />
        </dl>
      </header>

      <div
        className={cn(
          'transition-opacity',
          isFetching && tasks.length > 0 && 'opacity-70',
          view !== 'board' && 'grid items-start gap-4 lg:grid-cols-[1fr_18rem]',
        )}
      >
        {view === 'month' && (
          <MonthView
            day={day}
            today={today}
            tasks={tasks}
            onOpenDay={(key) => goTo(key, 'day')}
            onCreate={(key) => create({ date: key })}
            onOpen={open}
            onMoveToDay={moveToDay}
          />
        )}
        {view === 'day' && (
          <DayView
            day={day}
            today={today}
            tasks={tasks}
            onSelectDay={(key) => goTo(key)}
            onCreate={(key, startMinute) => create({ date: key, startMinute })}
            onOpen={open}
            onMoveToDay={moveToDay}
            onSchedule={schedule}
            onResize={resize}
          />
        )}
        {view === 'board' && (
          <BoardView
            tasks={tasks}
            onCreate={(status) => create({ status })}
            onMove={moveOnBoard}
            {...cardProps}
          />
        )}
        {view !== 'board' && (
          <BacklogRail
            tasks={tasks}
            onCreate={() => create()}
            onUnschedule={unschedule}
            {...cardProps}
          />
        )}
      </div>

      <TaskDialog
        draft={draft}
        onClose={() => setDraft(null)}
        onSubmit={submit}
        onDelete={(task) => void destroy(task)}
      />
      {confirmDialog}
    </>
  )
}

function Stat({
  label,
  value,
  children,
}: {
  label: string
  value: number | string
  children?: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl border bg-card px-4 py-3
        shadow-xs"
    >
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </dd>
      {children}
    </div>
  )
}
