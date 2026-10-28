import { describe, expect, it } from 'vitest'

import { validateDto } from '@repo/nest-common'

import { CreateHelloDto } from './create-hello.dto'
import { UpdateHelloDto } from './update-hello.dto'

describe('CreateHelloDto', () => {
  it('trims the message', () => {
    expect(validateDto(CreateHelloDto, { message: '  hi  ' })).toEqual({
      ok: true,
      data: { message: 'hi' },
    })
  })

  it.each([{}, { message: '' }, { message: 'x'.repeat(256) }, { message: 1 }])(
    'rejects %j',
    (input) => {
      expect(validateDto(CreateHelloDto, input).ok).toBe(false)
    },
  )
})

describe('UpdateHelloDto', () => {
  it('makes every field optional but still validates present ones', () => {
    expect(validateDto(UpdateHelloDto, {}).ok).toBe(true)
    expect(validateDto(UpdateHelloDto, { message: '' }).ok).toBe(false)
  })
})
