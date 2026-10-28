import assert from 'node:assert/strict'

import { describe, it } from 'vitest'

import { removeDiacritics, slugify, truncate } from './string.js'

describe('string', () => {
  it('removes Vietnamese diacritics and slugifies', () => {
    assert.equal(removeDiacritics('Đà Nẵng, Việt Nam'), 'Da Nang, Viet Nam')
    assert.equal(slugify('  Xin chào, Việt Nam!  '), 'xin-chao-viet-nam')
  })

  it('truncates with a suffix', () => {
    assert.equal(truncate('hello world', 8), 'hello w…') // 8 chars incl. suffix
    assert.equal(truncate('short', 8), 'short')
  })
})
