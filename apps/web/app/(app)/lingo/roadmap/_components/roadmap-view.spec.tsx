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

const week = (
  n: number,
  status: Roadmap['plan']['weeks'][number]['status'],
) => ({
  week: n,
  phase: 'Chắc từng Part',
  title: `Chủ đề ${n}`,
  focus: `Trọng tâm ${n}`,
  tips: [`Mẹo ${n}`],
  start: '2026-11-16T00:00:00.000Z',
  end: '2026-11-23T00:00:00.000Z',
  status,
  tasks: [task(`w${n}.P3`, 'part', false, 'P3')],
  lessons: [{ id: `lesson-${n}`, title: `Bài ${n}` }],
})

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
  plan: placementDone
    ? {
        start: '2026-11-16T00:00:00.000Z',
        currentWeek: 2,
        weeks: [week(1, 'done'), week(2, 'current'), week(3, 'upcoming')],
      }
    : {
        start: null,
        currentWeek: null,
        weeks: [week(1, 'upcoming'), week(2, 'upcoming')],
      },
})

function renderRoadmap(placementDone: boolean) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    roadmapQueryOptions('TOEIC_LR').queryKey,
    roadmap(placementDone),
  )
  queryClient.setQueryData(dashboardQueryOptions('TOEIC_LR').queryKey, {
    goal: { targetScore: null, examDate: null, newCardsPerDay: 20 },
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

  it('plans today from this week of the plan', () => {
    renderRoadmap(true)
    const today = screen.getByRole('region', { name: 'Hôm nay' })
    expect(today).toHaveTextContent('Ôn 4 thẻ đến hạn và học 20 từ mới')
    expect(today).toHaveTextContent('w2.P3')
    expect(
      within(today).getByRole('button', { name: 'Luyện 10 câu' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Đã vượt qua')).toBeInTheDocument()
  })

  it('opens the plan on this week and shows another week on click', async () => {
    const user = userEvent.setup()
    renderRoadmap(true)
    const plan = screen.getByRole('region', { name: 'Lịch 12 tuần' })
    expect(plan).toHaveTextContent('Tuần 2/12')
    expect(plan).toHaveTextContent('Tuần 2: Chủ đề 2')
    expect(within(plan).getByRole('link', { name: 'Bài 2' })).toHaveAttribute(
      'href',
      '/lingo/lessons/lesson-2',
    )
    await user.click(
      within(plan).getByRole('button', { name: /Tuần 3: Chủ đề 3/ }),
    )
    expect(plan).toHaveTextContent('Trọng tâm 3')
    // Only the current week's tasks can be started
    expect(
      within(plan).queryByRole('button', { name: 'Luyện 10 câu' }),
    ).not.toBeInTheDocument()
  })

  it('charts the roadmap, the target and this week as percentages', () => {
    renderRoadmap(true)
    // 1 of 2 roadmap tasks done; 400 of 650 points; 0 of 1 task this week
    expect(
      screen.getByRole('img', { name: /^Hoàn thành lộ trình: 50%/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /^Tiến tới mục tiêu: 62%/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /^Tuần này: 0%/ }),
    ).toBeInTheDocument()
  })

  it('sets the target in a dialog on the page, and marks the default one', async () => {
    const user = userEvent.setup()
    renderRoadmap(true)
    expect(screen.getByText('Mặc định, chưa đặt')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Đặt mục tiêu' }))
    expect(screen.getByRole('dialog', { name: 'Mục tiêu' })).toBeInTheDocument()
  })

  it('leaves the target ring empty until there is an estimate', () => {
    renderRoadmap(false)
    expect(
      screen.getByRole('img', { name: /^Tiến tới mục tiêu: chưa có dữ liệu/ }),
    ).toBeInTheDocument()
  })

  it('waits for the placement test before starting the plan', () => {
    renderRoadmap(false)
    expect(
      screen.getByRole('region', { name: 'Lịch 12 tuần' }),
    ).toHaveTextContent('Bắt đầu từ tuần bạn làm bài đầu vào')
  })

  it('says so when the roadmap cannot be loaded', async () => {
    // Nothing cached: the (mocked) api call fails
    renderWithQuery(<RoadmapView exam="TOEIC_LR" />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Không tải được lộ trình',
    )
  })
})
