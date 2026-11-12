import { describe, expect, it } from 'vitest'

import { APPS, appById, appOf } from './apps'

describe('app registry', () => {
  it('finds the app of a path, including its sub-pages', () => {
    expect(appOf('/chat')?.id).toBe('chat')
    expect(appOf('/hellos/123')?.id).toBe('hellos')
    expect(appOf('/')).toBeUndefined()
    // A prefix of another word is not that app
    expect(appOf('/chatter')).toBeUndefined()
  })

  it('has unique ids and paths', () => {
    expect(new Set(APPS.map((a) => a.id)).size).toBe(APPS.length)
    expect(new Set(APPS.map((a) => a.href)).size).toBe(APPS.length)
  })

  it('throws on an unknown id', () => {
    expect(() => appById('nope')).toThrow(/Unknown app/)
  })
})
