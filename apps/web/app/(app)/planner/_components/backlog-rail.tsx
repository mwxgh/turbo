'use client'

import { Inbox, Plus } from 'pulsoicon-react'

import type { PlannerTask } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'

import { byPosition, taskDay } from '@/lib/planner'

import { useTaskDrop } from './drag'
import { TaskCard } from './task-card'

export interface BacklogRailProps {
  tasks: PlannerTask[]
  onCreate: () => void
  onOpen: (task: PlannerTask) => void
  onToggleDone: (task: PlannerTask) => void
  onUnschedule: (id: string) => void
}

/** Tasks without a day: drag one onto the calendar, or drop a scheduled one here to unschedule it. */
export function BacklogRail({
  tasks,
  onCreate,
  onOpen,
  onToggleDone,
  onUnschedule,
}: BacklogRailProps) {
  const backlog = tasks
    .filter((task) => taskDay(task) === null && task.status !== 'DONE')
    .sort(byPosition)
  const { over, dropProps } = useTaskDrop(onUnschedule)

  return (
    <aside
      {...dropProps}
      aria-label="Chưa lên lịch"
      className={cn(
        `flex flex-col gap-3 rounded-2xl border bg-muted/40 p-3
        transition-colors lg:sticky lg:top-20 lg:max-h-[calc(100dvh-7rem)]`,
        over && 'border-primary/40 bg-primary/5',
      )}
    >
      <header className="flex items-center gap-2 px-1">
        <Inbox className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Chưa lên lịch</h2>
        <span
          className="rounded-full bg-background px-2 py-0.5 text-xs
            text-muted-foreground tabular-nums"
        >
          {backlog.length}
        </span>
        <button
          type="button"
          onClick={onCreate}
          aria-label="Thêm việc chưa lên lịch"
          className="ml-auto flex size-7 items-center justify-center rounded-lg
            text-muted-foreground hover:bg-background hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </header>
      <ul className="flex flex-col gap-2 overflow-y-auto">
        {backlog.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              onOpen={onOpen}
              onToggleDone={onToggleDone}
              showDate={false}
            />
          </li>
        ))}
      </ul>
      <p
        className="rounded-xl border border-dashed px-3 py-4 text-center text-xs
          text-muted-foreground"
      >
        {backlog.length === 0
          ? 'Trống. Thêm ý tưởng ở đây rồi kéo vào lịch.'
          : 'Kéo việc vào lịch để xếp ngày, kéo về đây để gỡ lịch.'}
      </p>
    </aside>
  )
}
