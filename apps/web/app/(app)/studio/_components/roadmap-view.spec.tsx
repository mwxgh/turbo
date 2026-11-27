import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type RoadmapDetail, roadmapQueryOptions } from '@/lib/queries/studio'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { RoadmapView, stepState } from './roadmap-view'

const roadmap: RoadmapDetail = {
  slug: 'frontend',
  title: 'Frontend',
  summary: 'Từ HTML tới React',
  steps: [
    {
      id: 's1',
      title: 'Ngôn ngữ',
      description: 'Nắm vững JavaScript trước',
      track: {
        slug: 'javascript',
        title: 'JavaScript',
        category: 'LANGUAGE',
        lessons: 3,
        done: 1,
        items: [
          { slug: 'bien', title: 'Biến', state: 'done' },
          { slug: 'ham', title: 'Hàm', state: 'started' },
          { slug: 'mang', title: 'Mảng', state: 'todo' },
        ],
      },
    },
    { id: 's2', title: 'Kiểm thử', description: '', track: null },
  ],
}

describe('RoadmapView', () => {
  it('derives a step state from its lessons', () => {
    const step = roadmap.steps[0]!
    const withStates = (...states: ('done' | 'started' | 'todo')[]) => ({
      ...step,
      track: {
        ...step.track!,
        items: states.map((state, i) => ({ slug: `${i}`, title: '', state })),
      },
    })
    expect(stepState(withStates('done', 'done'))).toBe('done')
    expect(stepState(withStates('done', 'todo'))).toBe('started')
    expect(stepState(withStates('todo', 'todo'))).toBe('todo')
    expect(stepState(roadmap.steps[1]!)).toBe('todo')
  })

  it('links each step to its track and each lesson with its state', () => {
    const queryClient = createTestQueryClient()
    queryClient.setQueryData(roadmapQueryOptions('frontend').queryKey, roadmap)
    renderWithQuery(<RoadmapView slug="frontend" />, queryClient)

    expect(
      screen.getByRole('heading', { name: 'Ngôn ngữ' }).closest('a'),
    ).toHaveAttribute('href', '/studio/tracks/javascript')
    expect(screen.getByRole('link', { name: /Biến/ })).toHaveAttribute(
      'href',
      '/studio/tracks/javascript/bien',
    )
    expect(
      screen.getByRole('link', { name: /Hàm/ }).querySelector('[aria-label]'),
    ).toHaveAttribute('aria-label', 'Đang học')
    expect(screen.getByText('Chưa có bài cho bước này')).toBeInTheDocument()
    // Overall bar and the step node
    expect(screen.getAllByText('1/3 bài')).toHaveLength(2)
  })
})
