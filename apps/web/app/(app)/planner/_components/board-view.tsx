'use client'

import { type DragEvent, useState } from 'react'

import { CircleCheck, CircleDashed, CircleDot, Plus } from 'lucide-react'

import type { PlannerStatus, PlannerTask } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'

import { STATUSES, byPosition, positionBetween } from '@/lib/planner'

import { useTaskDrop } from './drag'
import { TaskCard } from './task-card'

const COLUMN_STYLE = {
  TODO: { icon: CircleDashed, accent: 'text-slate-500' },
  DOING: { icon: CircleDot, accent: 'text-sky-500' },
  DONE: { icon: CircleCheck, accent: 'text-emerald-500' },
} as const

export interface BoardViewProps {
  tasks: PlannerTask[]
  onCreate: (status: PlannerStatus) => void
  onOpen: (task: PlannerTask) => void
  onToggleDone: (task: PlannerTask) => void
  onMove: (id: string, status: PlannerStatus, position: number) => void
}

/** Kanban: drag a card to another column or to another place in its column. */
export function BoardView({ tasks, ...props }: BoardViewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STATUSES.map(({ value, label }) => (
        <Column
          key={value}
          status={value}
          label={label}
          tasks={tasks.filter((task) => task.status === value).sort(byPosition)}
          {...props}
        />
      ))}
    </div>
  )
}

/** Index a dragged card would take: before the first card whose middle is below the pointer. */
function insertIndex(event: DragEvent<HTMLElement>) {
  const cards = [
    ...event.currentTarget.querySelectorAll<HTMLElement>(
      '[data-task-card]:not([data-dragging])',
    ),
  ]
  const index = cards.findIndex((card) => {
    const rect = card.getBoundingClientRect()
    return event.clientY < rect.top + rect.height / 2
  })
  return index === -1 ? cards.length : index
}

function Column({
  status,
  label,
  tasks,
  onCreate,
  onOpen,
  onToggleDone,
  onMove,
}: Omit<BoardViewProps, 'tasks'> & {
  status: PlannerStatus
  label: string
  tasks: PlannerTask[]
}) {
  const [index, setIndex] = useState<number | null>(null)
  const { over, dropProps } = useTaskDrop(
    (id, event) => {
      const at = insertIndex(event)
      const others = tasks.filter((task) => task.id !== id)
      setIndex(null)
      onMove(
        id,
        status,
        positionBetween(others[at - 1]?.position, others[at]?.position),
      )
    },
    (event) => setIndex(insertIndex(event)),
  )
  const { icon: Icon, accent } = COLUMN_STYLE[status]
  const line = over ? index : null

  return (
    <section
      aria-label={label}
      {...dropProps}
      onDragLeave={(event) => {
        dropProps.onDragLeave(event)
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setIndex(null)
      }}
      className={cn(
        `flex min-h-72 flex-col gap-3 rounded-2xl border bg-muted/40 p-3
        transition-colors`,
        over && 'border-primary/40 bg-primary/5',
      )}
    >
      <header className="flex items-center gap-2 px-1">
        <Icon className={cn('size-4', accent)} />
        <h2 className="text-sm font-semibold">{label}</h2>
        <span
          className="rounded-full bg-background px-2 py-0.5 text-xs
            text-muted-foreground tabular-nums"
        >
          {tasks.length}
        </span>
        <button
          type="button"
          onClick={() => onCreate(status)}
          aria-label={`Thêm việc vào ${label}`}
          className="ml-auto flex size-7 items-center justify-center rounded-lg
            text-muted-foreground hover:bg-background hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </header>
      <ul className="flex flex-1 flex-col gap-2">
        {tasks.map((task, i) => (
          <li key={task.id} className="relative">
            {line === i && <InsertLine />}
            <TaskCard task={task} onOpen={onOpen} onToggleDone={onToggleDone} />
          </li>
        ))}
        <li className="relative min-h-6 flex-1">
          {line === tasks.length && <InsertLine />}
          {tasks.length === 0 && !over && (
            <p
              className="rounded-xl border border-dashed px-3 py-6 text-center
                text-xs text-muted-foreground"
            >
              Kéo việc vào đây
            </p>
          )}
        </li>
      </ul>
    </section>
  )
}

function InsertLine() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-1 -top-1.5 h-0.5 rounded-full bg-primary"
    />
  )
}
