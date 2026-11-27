import { describe, expect, it } from 'vitest'

import { byLevel, levelOf } from './studio'

describe('studio levels', () => {
  it('labels each level', () => {
    expect(levelOf('BASIC').label).toBe('Cơ bản')
    expect(levelOf('INTERMEDIATE').label).toBe('Trung cấp')
    expect(levelOf('ADVANCED').label).toBe('Nâng cao')
  })

  it('splits items by level, easiest first, keeping their order and skipping empty levels', () => {
    const groups = byLevel([
      { slug: 'b1', level: 'BASIC' as const },
      { slug: 'a1', level: 'ADVANCED' as const },
      { slug: 'b2', level: 'BASIC' as const },
    ])
    expect(
      groups.map((g) => [g.info.label, g.items.map((i) => i.slug)]),
    ).toEqual([
      ['Cơ bản', ['b1', 'b2']],
      ['Nâng cao', ['a1']],
    ])
  })
})
