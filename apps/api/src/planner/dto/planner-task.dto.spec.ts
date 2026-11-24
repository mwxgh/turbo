import { describe, expect, it } from 'vitest'

import { validateDto } from '@repo/nest-common'

import { CreatePlannerTaskDto, UpdatePlannerTaskDto } from './planner-task.dto'

describe('CreatePlannerTaskDto', () => {
  it('accepts a scheduled task', () => {
    const res = validateDto(CreatePlannerTaskDto, {
      title: '  Standup ',
      date: '2026-11-24',
      startMinute: 540,
      durationMinutes: 15,
      priority: 'HIGH',
    })
    expect(res.ok && res.data.title).toBe('Standup')
  })

  it.each([
    {},
    { title: '' },
    { title: 'x', startMinute: 1440 },
    { title: 'x', durationMinutes: 0 },
    { title: 'x', status: 'LATER' },
    { title: 'x', date: '24/11/2026' },
  ])('rejects %j', (input) => {
    expect(validateDto(CreatePlannerTaskDto, input).ok).toBe(false)
  })
})

describe('UpdatePlannerTaskDto', () => {
  it('allows clearing the date and time', () => {
    expect(
      validateDto(UpdatePlannerTaskDto, { date: null, startMinute: null }).ok,
    ).toBe(true)
  })
})
