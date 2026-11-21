import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  type Dashboard,
  type Roadmap,
  dashboardQueryOptions,
  roadmapQueryOptions,
} from '@/lib/queries/lingo'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { RoadmapView } from './roadmap-view'

// Only reached by the error test: the others have their data cached
vi.mock('@/lib/api', () => ({
  apiFetch: () => Promise.reject(new Error('Not Found')),
}))

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
const startAttempt = vi.fn((_input: unknown) =>
  Promise.resolve({ data: { id: 'p1' } }),
)
vi.mock('@/lib/lingo-actions', () => ({
  startAttempt: (input: unknown) => startAttempt(input),
}))

const task = (
  id: string,
  kind: Roadmap['stages'][number]['tasks'][number]['kind'],
  done = false,
  part?: string,
) => ({ id, kind, label: id, detail: '', progress: done ? 1 : 0, done, part })

const roadmap = (placementDone: boolean): Roadmap => ({
  target: 650,
  estimate: placementDone ? 400 : null,
  accuracy: 0.66,
  stages: [
    {
      id: 'foundation',
      title: 'Xây nền',
      goal: '',
      tips: [],
      status: placementDone ? 'passed' : 'current',
      passScore: 350,
      tasks: [task('foundation.placement', 'placement', placementDone)],
    },
    {
      id: 'parts',
      title: 'Luyện từng Part',
      goal: '',
      tips: [],
      status: placementDone ? 'current' : 'upcoming',
      passScore: 500,
      tasks: [task('parts.P5', 'part', false, 'P5')],
    },
  ],
})

function renderRoadmap(placementDone: boolean) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    roadmapQueryOptions('TOEIC_LR').queryKey,
    roadmap(placementDone),
  )
  queryClient.setQueryData(dashboardQueryOptions('TOEIC_LR').queryKey, {
    goal: { targetScore: 650, examDate: null, newCardsPerDay: 20 },
    review: { due: 4, new: 30 },
  } as Dashboard)
  return renderWithQuery(<RoadmapView exam="TOEIC_LR" />, queryClient)
}

describe('RoadmapView', () => {
  it('asks a new learner for the placement test first', async () => {
    const user = userEvent.setup()
    renderRoadmap(false)
    const card = screen.getByRole('region', {
      name: 'Bắt đầu bằng bài kiểm tra đầu vào',
    })
    await user.click(within(card).getByRole('button', { name: 'Làm bài' }))
    expect(startAttempt).toHaveBeenCalledWith(
      expect.objectContaining({ exam: 'TOEIC_LR', placement: true }),
    )
    expect(push).toHaveBeenCalledWith('/lingo/attempts/p1/take')
  })

  it('plans today from the current stage', () => {
    renderRoadmap(true)
    const today = screen.getByRole('region', { name: 'Hôm nay' })
    expect(today).toHaveTextContent('Ôn 4 thẻ đến hạn và học 20 từ mới')
    expect(
      within(today).getByRole('button', { name: 'Luyện 10 câu' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Đã vượt qua')).toBeInTheDocument()
  })

  it('says so when the roadmap cannot be loaded', async () => {
    // Nothing cached: the (mocked) api call fails
    renderWithQuery(<RoadmapView exam="TOEIC_LR" />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không tải được lộ trình.',
    )
  })
})
