'use client'

import { CalendarDays, Check, Clock, Flag } from 'lucide-react'

import type { PlannerTask } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'
import { formatDate } from '@repo/utils'

import { colorOf, taskDay, timeLabel } from '@/lib/planner'

import { draggableTask } from './drag'

const PRIORITY_FLAG = {
  HIGH: 'text-rose-500',
  MEDIUM: 'text-amber-500',
  LOW: 'text-muted-foreground/60',
} as const

export interface TaskCardProps {
  task: PlannerTask
  onOpen: (task: PlannerTask) => void
  onToggleDone: (task: PlannerTask) => void
  /** Show the scheduled day (board, backlog); calendar views already place it */
  showDate?: boolean
}

/** Board / backlog card: drag it, click it to edit, tick it off. */
export function TaskCard({
  task,
  onOpen,
  onToggleDone,
  showDate = true,
}: TaskCardProps) {
  const done = task.status === 'DONE'
  const time = timeLabel(task)
  const day = taskDay(task)
  return (
    <div
      {...draggableTask(task.id)}
      data-task-card
      className={cn(
        `group relative flex cursor-grab items-start gap-2.5 rounded-xl border
        border-l-4 bg-card p-3 shadow-xs
        transition-[box-shadow,transform,opacity] hover:-translate-y-px
        hover:shadow-md active:cursor-grabbing data-[dragging=true]:opacity-40
        motion-reduce:transition-none`,
        colorOf(task).bar,
      )}
    >
      <button
        type="button"
        aria-label={done ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu hoàn thành'}
        aria-pressed={done}
        onClick={() => onToggleDone(task)}
        className={cn(
          `mt-0.5 flex size-4.5 shrink-0 items-center justify-center
          rounded-full border transition-colors`,
          done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-muted-foreground/40 hover:border-emerald-500',
        )}
      >
        {done && <Check className="size-3" strokeWidth={3} />}
      </button>
      <button
        type="button"
        onClick={() => onOpen(task)}
        className="flex min-w-0 flex-1 flex-col gap-1.5 text-left outline-none
          after:absolute after:inset-0 after:rounded-xl
          focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
      >
        <span
          className={cn(
            'text-sm leading-snug font-medium text-pretty',
            done && 'text-muted-foreground line-through',
          )}
        >
          {task.title}
        </span>
        {task.note && (
          <span className="line-clamp-2 text-xs text-muted-foreground">
            {task.note}
          </span>
        )}
        {(time || (showDate && day) || task.priority !== 'MEDIUM') && (
          <span
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs
              text-muted-foreground"
          >
            {showDate && day && (
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {formatDate(day, 'dd/MM')}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1 tabular-nums">
                <Clock className="size-3.5" />
                {time}
              </span>
            )}
            {task.priority !== 'MEDIUM' && (
              <span className="flex items-center gap-1">
                <Flag
                  className={cn('size-3.5', PRIORITY_FLAG[task.priority])}
                />
                {task.priority === 'HIGH' ? 'Ưu tiên cao' : 'Ưu tiên thấp'}
              </span>
            )}
          </span>
        )}
      </button>
    </div>
  )
}
