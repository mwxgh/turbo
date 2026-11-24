'use client'

import { type PointerEvent, useEffect, useRef, useState } from 'react'

import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

import type { PlannerTask } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'

import {
  byTime,
  colorOf,
  formatMinute,
  layoutDay,
  parseDay,
  taskDay,
  timeLabel,
  weekDays,
} from '@/lib/planner'

import { draggableTask, useTaskDrop } from './drag'

/** Height of one hour on the timeline */
const HOUR_PX = 56
/** Drops and resizes snap to this many minutes */
const SNAP = 15
const HOURS = Array.from({ length: 24 }, (_, h) => h)

const snap = (minute: number) =>
  Math.min(Math.max(Math.round(minute / SNAP) * SNAP, 0), 1440 - SNAP)

export interface DayViewProps {
  day: string
  today: string
  tasks: PlannerTask[]
  onSelectDay: (day: string) => void
  onCreate: (day: string, startMinute?: number) => void
  onOpen: (task: PlannerTask) => void
  onMoveToDay: (id: string, day: string) => void
  onSchedule: (id: string, day: string, startMinute: number | null) => void
  onResize: (task: PlannerTask, durationMinutes: number) => void
}

/** One day as a timeline: drop a task at a time, drag the bottom edge to change its length. */
export function DayView({
  day,
  today,
  tasks,
  onSelectDay,
  onCreate,
  onOpen,
  onMoveToDay,
  onSchedule,
  onResize,
}: DayViewProps) {
  const ofDay = tasks.filter((task) => taskDay(task) === day)
  const allDay = ofDay.filter((task) => task.startMinute === null).sort(byTime)
  const scroller = useRef<HTMLDivElement>(null)

  // Open on the working day (or the first task), not at midnight
  useEffect(() => {
    const first = ofDay
      .map((task) => task.startMinute)
      .filter((minute) => minute !== null)
      .sort((a, b) => a - b)[0]
    if (scroller.current)
      scroller.current.scrollTop =
        (Math.min(first ?? 7 * 60, 7 * 60) / 60) * HOUR_PX - 8
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the day changes
  }, [day])

  const timeline = useTaskDrop((id, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onSchedule(id, day, snap(((event.clientY - rect.top) / HOUR_PX) * 60))
  })
  const allDayDrop = useTaskDrop((id) => onSchedule(id, day, null))

  return (
    <div className="flex flex-col gap-4">
      <WeekStrip
        day={day}
        today={today}
        tasks={tasks}
        onSelectDay={onSelectDay}
        onMoveToDay={onMoveToDay}
      />

      <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
        <div
          {...allDayDrop.dropProps}
          className={cn(
            `flex min-h-12 items-start gap-3 border-b px-3 py-2
            transition-colors`,
            allDayDrop.over && 'bg-primary/5',
          )}
        >
          <span className="w-12 shrink-0 pt-1 text-[11px] text-muted-foreground">
            Cả ngày
          </span>
          <div className="flex flex-1 flex-wrap gap-1.5">
            {allDay.length === 0 && (
              <span className="pt-1 text-xs text-muted-foreground/70">
                Kéo việc vào đây để làm trong ngày, không giờ cố định
              </span>
            )}
            {allDay.map((task) => (
              <button
                key={task.id}
                type="button"
                {...draggableTask(task.id)}
                onClick={() => onOpen(task)}
                className={cn(
                  `cursor-grab rounded-lg px-2.5 py-1 text-xs font-medium
                  active:cursor-grabbing data-[dragging=true]:opacity-40`,
                  colorOf(task).soft,
                  task.status === 'DONE' && 'line-through opacity-60',
                )}
              >
                {task.title}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          className="max-h-[calc(100dvh-20rem)] min-h-96 overflow-y-auto"
        >
          <div className="flex">
            <div className="w-15 shrink-0">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  style={{ height: HOUR_PX }}
                  className="relative pr-2 text-right text-[11px]
                    text-muted-foreground tabular-nums"
                >
                  {hour > 0 && (
                    <span className="absolute -top-2 right-2">
                      {formatMinute(hour * 60)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              {...timeline.dropProps}
              onDoubleClick={(event) => {
                if (event.target !== event.currentTarget) return
                const rect = event.currentTarget.getBoundingClientRect()
                onCreate(
                  day,
                  snap(((event.clientY - rect.top) / HOUR_PX) * 60 - SNAP),
                )
              }}
              className={cn(
                'relative flex-1 border-l transition-colors',
                timeline.over && 'bg-primary/3',
              )}
              style={{
                height: HOUR_PX * 24,
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${HOUR_PX - 1}px, var(--border) ${HOUR_PX - 1}px ${HOUR_PX}px)`,
              }}
            >
              {day === today && <NowLine />}
              {layoutDay(ofDay).map(({ task, lane, lanes }) => (
                <TimeBlock
                  key={task.id}
                  task={task}
                  lane={lane}
                  lanes={lanes}
                  onOpen={onOpen}
                  onResize={onResize}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimeBlock({
  task,
  lane,
  lanes,
  onOpen,
  onResize,
}: {
  task: PlannerTask
  lane: number
  lanes: number
  onOpen: (task: PlannerTask) => void
  onResize: (task: PlannerTask, durationMinutes: number) => void
}) {
  // Live length while the bottom edge is dragged
  const [preview, setPreview] = useState<number | null>(null)
  const start = useRef(0)
  const duration = preview ?? task.durationMinutes
  const color = colorOf(task)
  const short = duration < 45

  const resize = {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.setPointerCapture(event.pointerId)
      start.current = event.clientY
      setPreview(task.durationMinutes)
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (preview === null) return
      const delta = ((event.clientY - start.current) / HOUR_PX) * 60
      const max = 1440 - task.startMinute!
      setPreview(
        Math.min(
          Math.max(
            Math.round((task.durationMinutes + delta) / SNAP) * SNAP,
            SNAP,
          ),
          max,
        ),
      )
    },
    onPointerUp: () => {
      if (preview !== null && preview !== task.durationMinutes)
        onResize(task, preview)
      setPreview(null)
    },
  }

  return (
    <div
      {...draggableTask(task.id)}
      style={{
        top: (task.startMinute! / 60) * HOUR_PX + 1,
        height: Math.max((duration / 60) * HOUR_PX - 2, 20),
        left: `calc(${(lane / lanes) * 100}% + 4px)`,
        width: `calc(${100 / lanes}% - 8px)`,
      }}
      className={cn(
        `group absolute cursor-grab overflow-hidden rounded-lg border-l-4
        shadow-xs transition-[box-shadow,opacity] hover:z-10 hover:shadow-md
        active:cursor-grabbing data-[dragging=true]:opacity-40`,
        color.soft,
        color.bar,
        task.status === 'DONE' && 'opacity-60',
        preview !== null && 'z-20 shadow-lg',
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(task)}
        className={cn(
          'flex size-full gap-x-2 px-2 text-left',
          short ? 'items-center py-0' : 'flex-col py-1.5',
        )}
      >
        <span
          className={cn(
            'truncate text-xs font-semibold',
            task.status === 'DONE' && 'line-through',
          )}
        >
          {task.title}
        </span>
        <span className="shrink-0 text-[11px] tabular-nums opacity-75">
          {timeLabel({ ...task, durationMinutes: duration })}
        </span>
      </button>
      <div
        {...resize}
        role="separator"
        aria-label="Kéo để đổi thời lượng"
        className="absolute inset-x-0 bottom-0 h-2 cursor-ns-resize opacity-0
          group-hover:opacity-100"
      >
        <div
          className="mx-auto mt-0.5 h-1 w-8 rounded-full bg-current opacity-30"
        />
      </div>
    </div>
  )
}

/** Red line at the current time, moved every minute. */
function NowLine() {
  const [minute, setMinute] = useState(() => minuteNow())
  useEffect(() => {
    const timer = setInterval(() => setMinute(minuteNow()), 60_000)
    return () => clearInterval(timer)
  }, [])
  return (
    // The minute may change between the server render and hydration: the next tick moves it
    <div
      suppressHydrationWarning
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-30 flex items-center"
      style={{ top: (minute / 60) * HOUR_PX }}
    >
      <span className="-ml-1.5 size-3 rounded-full bg-rose-500" />
      <span className="h-0.5 flex-1 bg-rose-500" />
    </div>
  )
}

function minuteNow() {
  const [h, m] = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
    .format(new Date())
    .split(':')
  return Number(h) * 60 + Number(m)
}

function WeekStrip({
  day,
  today,
  tasks,
  onSelectDay,
  onMoveToDay,
}: Pick<
  DayViewProps,
  'day' | 'today' | 'tasks' | 'onSelectDay' | 'onMoveToDay'
>) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDays(day).map((key) => (
        <WeekDay
          key={key}
          dayKey={key}
          selected={key === day}
          isToday={key === today}
          tasks={tasks.filter((task) => taskDay(task) === key)}
          onSelectDay={onSelectDay}
          onMoveToDay={onMoveToDay}
        />
      ))}
    </div>
  )
}

function WeekDay({
  dayKey,
  selected,
  isToday,
  tasks,
  onSelectDay,
  onMoveToDay,
}: {
  dayKey: string
  selected: boolean
  isToday: boolean
  tasks: PlannerTask[]
  onSelectDay: (day: string) => void
  onMoveToDay: (id: string, day: string) => void
}) {
  const { over, dropProps } = useTaskDrop((id) => onMoveToDay(id, dayKey))
  const date = parseDay(dayKey)
  const done = tasks.filter((task) => task.status === 'DONE').length
  return (
    <button
      type="button"
      {...dropProps}
      onClick={() => onSelectDay(dayKey)}
      aria-current={selected ? 'date' : undefined}
      className={cn(
        `flex flex-col items-center gap-1 rounded-2xl border px-1 py-2.5
        transition-all hover:bg-muted/60`,
        selected
          ? `border-primary bg-primary text-primary-foreground shadow-md
            hover:bg-primary/90`
          : 'bg-card',
        over && 'scale-105 ring-2 ring-primary/50',
      )}
    >
      <span
        className={cn(
          'text-[11px] font-medium uppercase',
          selected ? 'opacity-80' : 'text-muted-foreground',
        )}
      >
        {format(date, 'EEEEEE', { locale: vi })}
      </span>
      <span className="text-lg leading-none font-semibold tabular-nums">
        {format(date, 'd')}
      </span>
      <span className="flex h-1.5 items-center gap-0.5">
        {tasks.slice(0, 4).map((task) => (
          <span
            key={task.id}
            className={cn(
              'size-1.5 rounded-full',
              selected ? 'bg-primary-foreground/70' : colorOf(task).dot,
            )}
          />
        ))}
      </span>
      {isToday && !selected && (
        <span className="text-[10px] font-medium text-primary">Hôm nay</span>
      )}
      {tasks.length > 0 && (selected || !isToday) && (
        <span
          className={cn(
            'text-[10px] tabular-nums',
            selected ? 'opacity-80' : 'text-muted-foreground',
          )}
        >
          {done}/{tasks.length}
        </span>
      )}
    </button>
  )
}
