import { createEvent, fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { PlannerTask } from '@repo/types'

import { plannerRange } from '@/lib/planner'
import { plannerTasksQueryOptions } from '@/lib/queries/planner'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { PlannerView } from './planner-view'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('@/lib/api', () => ({ apiFetch }))

const actions = vi.hoisted(() => ({
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}))
vi.mock('@/app/(app)/planner/actions', () => actions)

const { toast } = vi.hoisted(() => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))
vi.mock('@repo/ui/components/sonner', () => ({ toast }))

const DAY = '2026-11-24'
const task = (id: string, patch: Partial<PlannerTask>): PlannerTask => ({
  id,
  userId: 'u',
  title: id,
  note: null,
  status: 'TODO',
  priority: 'MEDIUM',
  date: null,
  startMinute: null,
  durationMinutes: 60,
  color: 'sky',
  position: 1,
  createdAt: '2026-11-01T00:00:00.000Z',
  updatedAt: '2026-11-01T00:00:00.000Z',
  ...patch,
})

/** jsdom has no DataTransfer: a minimal one that carries the dragged id. */
function drag(source: HTMLElement, target: HTMLElement) {
  const data = new Map<string, string>()
  const dataTransfer = {
    setData: (type: string, value: string) => data.set(type, value),
    getData: (type: string) => data.get(type) ?? '',
    get types() {
      return [...data.keys()]
    },
    effectAllowed: 'all',
    dropEffect: 'none',
  }
  fireEvent.dragStart(source, { dataTransfer })
  fireEvent.dragOver(target, { dataTransfer })
  const drop = createEvent.drop(target, { dataTransfer })
  fireEvent(target, drop)
}

function renderPlanner(view: string, tasks: PlannerTask[]) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    plannerTasksQueryOptions(plannerRange(DAY)).queryKey,
    tasks,
  )
  apiFetch.mockResolvedValue(tasks)
  return renderWithQuery(
    <PlannerView />,
    queryClient,
    `?view=${view}&date=${DAY}`,
  )
}

describe('PlannerView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    actions.updateTask.mockResolvedValue({})
  })

  it('moves a card to another kanban column', async () => {
    renderPlanner('board', [
      task('Write report', { position: 1 }),
      task('Review', { status: 'DOING', position: 1 }),
    ])
    const card = screen.getByText('Write report').closest('[draggable]')!
    drag(
      card as HTMLElement,
      screen.getByRole('region', { name: 'Hoàn thành' }),
    )

    await waitFor(() =>
      expect(actions.updateTask).toHaveBeenCalledWith('Write report', {
        status: 'DONE',
        position: 1,
      }),
    )
    expect(toast.success).toHaveBeenCalledWith('Chuyển sang Hoàn thành')
  })

  it('schedules a backlog task by dropping it on a day', async () => {
    renderPlanner('month', [task('Someday', {})])
    const chip = screen.getByText('Someday').closest('[draggable]')!
    const cell = screen
      .getByRole('button', { name: 'Xem ngày 2026-11-27' })
      .closest('div.group\\/cell')!
    // The refetch after the move returns it scheduled
    apiFetch.mockResolvedValue([
      task('Someday', { date: '2026-11-27T00:00:00.000Z' }),
    ])
    drag(chip as HTMLElement, cell as HTMLElement)

    await waitFor(() =>
      expect(actions.updateTask).toHaveBeenCalledWith('Someday', {
        date: '2026-11-27',
      }),
    )
    await waitFor(() => expect(cell).toHaveTextContent('Someday'))
  })

  it('ticks a task off from the board', async () => {
    renderPlanner('board', [task('Call', {})])
    fireEvent.click(screen.getByRole('button', { name: 'Đánh dấu hoàn thành' }))
    await waitFor(() =>
      expect(actions.updateTask).toHaveBeenCalledWith('Call', {
        status: 'DONE',
      }),
    )
  })

  it('shows the timed tasks of the day on the timeline', () => {
    renderPlanner('day', [
      task('Standup', {
        date: `${DAY}T00:00:00.000Z`,
        startMinute: 540,
        durationMinutes: 15,
      }),
    ])
    expect(screen.getByText('Standup')).toBeInTheDocument()
    expect(screen.getByText('09:00 – 09:15')).toBeInTheDocument()
  })
})
