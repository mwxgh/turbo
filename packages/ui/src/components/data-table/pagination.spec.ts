import { describe, expect, it } from 'vitest'

import { pageItems } from '@repo/ui/components/data-table/pagination'

describe('pageItems', () => {
  it('lists every page when there are few', () => {
    expect(pageItems(1, 1)).toEqual([1])
    expect(pageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('keeps 7 slots with gaps around the current page', () => {
    expect(pageItems(1, 10)).toEqual([1, 2, 3, 4, 5, null, 10])
    expect(pageItems(4, 10)).toEqual([1, null, 3, 4, 5, null, 10])
    expect(pageItems(5, 10)).toEqual([1, null, 4, 5, 6, null, 10])
    expect(pageItems(10, 10)).toEqual([1, null, 6, 7, 8, 9, 10])
  })
})
