import assert from 'node:assert/strict'

import { describe, it } from 'vitest'

import { formatCurrency, formatNumber } from './number.js'

describe('number', () => {
  it('formats with the Vietnamese locale', () => {
    assert.equal(formatNumber(1234567.5), '1.234.567,5')
    assert.equal(formatCurrency(150000).replace(/\s/g, ' '), '150.000 ₫')
  })
})
