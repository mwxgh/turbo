import { describe, expect, it } from 'vitest'

import { scriptOf, splitPassage } from './speech'

describe('scriptOf', () => {
  const q = {
    transcript: null,
    accent: 'GB' as const,
    text: 'Where is the meeting?',
    options: ['Upstairs.', 'At noon.', 'Yes.'],
  }

  it('reads Part 2 as the question then lettered answers', () => {
    expect(scriptOf(q, true)).toEqual([
      { speaker: 'M', accent: 'GB', text: 'Where is the meeting?' },
      { speaker: 'W', accent: 'GB', text: 'A. Upstairs.' },
      { speaker: 'W', accent: 'GB', text: 'B. At noon.' },
      { speaker: 'W', accent: 'GB', text: 'C. Yes.' },
    ])
  })

  it('reads Part 1 statements by a narrator, Part 3 its script, Part 5 nothing', () => {
    expect(scriptOf({ ...q, text: null }, true)[0]).toEqual({
      speaker: 'N',
      accent: 'GB',
      text: 'A. Upstairs.',
    })
    const transcript = [{ speaker: 'W' as const, text: 'Hi' }]
    expect(scriptOf({ ...q, transcript }, false)).toBe(transcript)
    expect(scriptOf(q, false)).toEqual([])
  })
})

describe('splitPassage', () => {
  it('splits texts on a --- line', () => {
    expect(splitPassage('Ad\n---\nEmail\n\n ---- \nForm')).toEqual([
      'Ad',
      'Email',
      'Form',
    ])
    expect(splitPassage('Only one')).toEqual(['Only one'])
  })
})
