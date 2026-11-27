import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type TrackDetail, trackQueryOptions } from '@/lib/queries/studio'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { TrackView } from './track-view'

const lesson = (
  slug: string,
  level: 'BASIC' | 'ADVANCED',
  done = false,
): TrackDetail['lessons'][number] => ({
  id: slug,
  slug,
  title: `Bài ${slug}`,
  summary: '',
  minutes: 10,
  level,
  done,
  quizScore: null,
  quizTotal: null,
})

describe('TrackView', () => {
  it('lists lessons in a section per level, numbered straight through', () => {
    const queryClient = createTestQueryClient()
    queryClient.setQueryData(trackQueryOptions('go').queryKey, {
      id: 'go',
      slug: 'go',
      category: 'LANGUAGE',
      title: 'Go',
      summary: '',
      lessons: [
        lesson('b1', 'BASIC', true),
        lesson('b2', 'BASIC'),
        lesson('a1', 'ADVANCED'),
      ],
    } satisfies TrackDetail)
    renderWithQuery(<TrackView slug="go" />, queryClient)

    const basic = screen.getByRole('region', { name: 'Cơ bản' })
    const advanced = screen.getByRole('region', { name: 'Nâng cao' })
    expect(within(basic).getByText('1/2 bài')).toBeInTheDocument()
    expect(
      within(basic)
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(['/studio/tracks/go/b1', '/studio/tracks/go/b2'])
    expect(within(advanced).getByRole('link')).toHaveTextContent('03')
    expect(
      screen.getByRole('link', { name: /Học tiếp: Bài b2/ }),
    ).toBeInTheDocument()
  })
})
