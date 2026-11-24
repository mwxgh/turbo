import { describe, expect, it } from 'vitest'

import type { PlannerTask } from '@repo/types'

import { patchTasks } from './use-planner-mutations'

const task = { id: 'a', date: null, status: 'TODO' } as PlannerTask

describe('patchTasks', () => {
  it('applies the patch with the date shaped like the API', () => {
    expect(
      patchTasks([task], 'a', { date: '2026-11-24', status: 'DONE' }),
    ).toEqual([{ ...task, date: '2026-11-24T00:00:00.000Z', status: 'DONE' }])
  })

  it('keeps the date when the patch has none and leaves other tasks alone', () => {
    const dated = { ...task, id: 'b', date: '2026-11-01T00:00:00.000Z' }
    expect(patchTasks([task, dated], 'b', { position: 3 })).toEqual([
      task,
      { ...dated, position: 3 },
    ])
    expect(patchTasks(undefined, 'a', {})).toBeUndefined()
  })
})
