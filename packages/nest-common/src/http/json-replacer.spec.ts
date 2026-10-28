import { describe, expect, it } from 'vitest'

import { jsonReplacer } from './json-replacer.js'

describe('jsonReplacer', () => {
  it('sends BigInt as a string and Bytes as base64, leaves the rest alone', () => {
    const body = {
      id: 9007199254740993n,
      raw: new Uint8Array([104, 105]),
      file: Buffer.from('hi'),
      nested: [{ n: 1n }],
      at: new Date('2026-10-28T00:00:00.000Z'),
      plain: 'x',
    }
    expect(JSON.parse(JSON.stringify(body, jsonReplacer))).toEqual({
      id: '9007199254740993',
      raw: 'aGk=',
      file: 'aGk=',
      nested: [{ n: '1' }],
      at: '2026-10-28T00:00:00.000Z',
      plain: 'x',
    })
  })
})
