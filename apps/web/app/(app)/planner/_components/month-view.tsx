'use client'

import { Plus } from 'pulsoicon-react'

import type { PlannerTask } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'

import {
  byTime,
  colorOf,
  formatMinute,
  monthGrid,
  parseDay,
  taskDay,
} from '@/lib/planner'

import { draggableTask, useTaskDrop } from './drag'

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
/** Chips per cell before "+N" */
const VISIBLE = 3

export interface MonthViewProps {
  day: string
  today: string
  tasks: PlannerTask[]
  onOpenDay: (day: string) => void
  onCreate: (day: string) => void
  onOpen: (task: PlannerTask) => void
  onMoveToDay: (id: string, day: string) => void
}

/** Month calendar: drop a task on a day to (re)schedule it. */
export function MonthView({ day, tasks, ...props }: MonthViewProps) {
  const month = day.slice(0, 7)
  const byDay = new Map<string, PlannerTask[]>()
  for (const task of tasks) {
    const key = taskDay(task)
    if (key) byDay.set(key, [...(byDay.get(key) ?? []), task])
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
      <div className="grid grid-cols-7 border-b bg-muted/40">
        {WEEKDAYS.map((name) => (
          <div
            key={name}
            className="px-3 py-2 text-xs font-medium text-muted-foreground"
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {monthGrid(day).map((key) => (
          <DayCell
            key={key}
            dayKey={key}
            inMonth={key.startsWith(month)}
            tasks={(byDay.get(key) ?? []).sort(byTime)}
            {...props}
          />
        ))}
      </div>
    </div>
  )
}

function DayCell({
  dayKey,
  inMonth,
  today,
  tasks,
  onOpenDay,
  onCreate,
  onOpen,
  onMoveToDay,
}: Omit<MonthViewProps, 'day'> & { dayKey: string; inMonth: boolean }) {
  const { over, dropProps } = useTaskDrop((id) => onMoveToDay(id, dayKey))
  const isToday = dayKey === today
  const weekend = parseDay(dayKey).getDay() % 6 === 0
  const done = tasks.filter((task) => task.status === 'DONE').length

  return (
    <div
      {...dropProps}
      onDoubleClick={(event) => {
        if (event.target === event.currentTarget) onCreate(dayKey)
      }}
      className={cn(
        `group/cell relative flex min-h-28 flex-col gap-1 border-r border-b
        p-1.5 transition-colors nth-[7n]:border-r-0 nth-[n+36]:border-b-0`,
        !inMonth && 'bg-muted/30',
        weekend && inMonth && 'bg-muted/15',
        over && 'bg-primary/5 ring-2 ring-primary/40 ring-inset',
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenDay(dayKey)}
          aria-label={`Xem ngày ${dayKey}`}
          className={cn(
            `flex size-7 items-center justify-center rounded-full text-xs
            tabular-nums transition-colors hover:bg-muted`,
            isToday &&
              `bg-primary font-semibold text-primary-foreground
              hover:bg-primary/85`,
            !inMonth && !isToday && 'text-muted-foreground/60',
          )}
        >
          {Number(dayKey.slice(8))}
        </button>
        <span className="flex items-center gap-1">
          {tasks.length > 0 && (
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {done}/{tasks.length}
            </span>
          )}
          <button
            type="button"
            onClick={() => onCreate(dayKey)}
            aria-label={`Thêm việc ngày ${dayKey}`}
            className="flex size-6 items-center justify-center rounded-md
              text-muted-foreground opacity-0 transition-opacity
              group-hover/cell:opacity-100 hover:bg-muted
              focus-visible:opacity-100"
          >
            <Plus className="size-3.5" />
          </button>
        </span>
      </div>
      <ul className="flex flex-col gap-0.5">
        {tasks.slice(0, VISIBLE).map((task) => (
          <li key={task.id}>
            <TaskChip task={task} onOpen={onOpen} />
          </li>
        ))}
      </ul>
      {tasks.length > VISIBLE && (
        <button
          type="button"
          onClick={() => onOpenDay(dayKey)}
          className="self-start rounded px-1.5 text-[11px] font-medium
            text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          +{tasks.length - VISIBLE} việc nữa
        </button>
      )}
    </div>
  )
}

function TaskChip({
  task,
  onOpen,
}: {
  task: PlannerTask
  onOpen: (task: PlannerTask) => void
}) {
  const color = colorOf(task)
  const done = task.status === 'DONE'
  return (
    <button
      type="button"
      {...draggableTask(task.id)}
      onClick={() => onOpen(task)}
      title={task.title}
      className={cn(
        `flex w-full cursor-grab items-center gap-1.5 truncate rounded-md px-1.5
        py-0.5 text-left text-[11px] leading-5 font-medium transition-opacity
        active:cursor-grabbing data-[dragging=true]:opacity-40`,
        color.soft,
        done && 'line-through opacity-60',
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', color.dot)} />
      {task.startMinute !== null && (
        <span className="tabular-nums opacity-70">
          {formatMinute(task.startMinute)}
        </span>
      )}
      <span className="truncate">{task.title}</span>
    </button>
  )
}
