import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type StudioGarden, gardenQueryOptions } from '@/lib/queries/studio'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { GardenView } from './garden-view'

const week = (studied: boolean[]) =>
  studied.map((s, i) => ({ date: `2026-11-${21 + i}`, studied: s }))

const leaf = (slug: string, completedAt: string) => ({
  track: { slug: 'typescript', title: 'TypeScript' },
  slug,
  title: `Bài ${slug}`,
  completedAt,
})

function renderGarden(garden: StudioGarden) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(gardenQueryOptions().queryKey, garden)
  return renderWithQuery(<GardenView />, queryClient)
}

describe('GardenView', () => {
  it('draws a leaf per lesson, flowers, fruits and the streak', () => {
    const { container } = renderGarden({
      leaves: Array.from({ length: 6 }, (_, i) =>
        leaf(`l${i}`, `2026-11-2${i}T03:00:00Z`),
      ),
      flowers: [{ slug: 'typescript', title: 'TypeScript' }],
      fruits: [{ slug: 'frontend', title: 'Frontend' }],
      streak: {
        current: 3,
        best: 5,
        activeDays: 6,
        studiedToday: true,
        idleDays: 0,
        week: week([false, false, true, false, true, true, true]),
      },
    })

    expect(
      screen.getByRole('img', { name: 'Cây có 6 lá, 1 hoa, 1 quả' }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('svg[role=img] title')).toHaveLength(8)
    expect(screen.getByText('Cây non')).toBeInTheDocument()
    expect(screen.getByText('Thêm 9 lá nữa thành Cây lớn')).toBeInTheDocument()
    expect(screen.getByText('3 ngày liên tiếp')).toBeInTheDocument()
    expect(screen.getByText(/kỷ lục 5/)).toBeInTheDocument()
    // Newest first, linked to the lesson
    expect(screen.getAllByRole('link').map((a) => a.textContent)).toEqual([
      'Bài l5',
      'Bài l4',
      'Bài l3',
    ])
  })

  it('shows a seed and asks for the first lesson when empty', () => {
    renderGarden({
      leaves: [],
      flowers: [],
      fruits: [],
      streak: {
        current: 0,
        best: 0,
        activeDays: 0,
        studiedToday: false,
        idleDays: null,
        week: week(Array<boolean>(7).fill(false)),
      },
    })

    expect(screen.getByText('Hạt giống')).toBeInTheDocument()
    expect(screen.getByText(/gieo hạt/)).toBeInTheDocument()
    expect(screen.queryByText('Lá mới nhất')).not.toBeInTheDocument()
  })

  it('warns that the tree wilts after idle days', () => {
    renderGarden({
      leaves: [leaf('a', '2026-11-23T03:00:00Z')],
      flowers: [],
      fruits: [],
      streak: {
        current: 0,
        best: 1,
        activeDays: 1,
        studiedToday: false,
        idleDays: 4,
        week: week([false, false, true, false, false, false, false]),
      },
    })

    expect(screen.getByText(/héo sau 4 ngày/)).toBeInTheDocument()
  })
})
