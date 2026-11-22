import { describe, expect, it } from 'vitest'

import { itemTemplate } from './generate-prompts'
import { itemsPerCall, mapLimit } from './generator.service'
import { getExam } from './specs'
import { itemSchema } from './specs/schemas'

const toeic = getExam('TOEIC_LR')
const parts = toeic.sections.flatMap((section) => section.parts)

describe('itemTemplate', () => {
  it.each(parts.map((part) => [part.code, part] as const))(
    'shows the model a shape %s accepts',
    (_code, part) => {
      const template = itemTemplate(part, part.questionsPerItem[0])
      const filled = {
        ...template,
        questions: template.questions.map((q) => ({ ...q, skillTags: [] })),
      }
      expect(itemSchema(toeic, part).safeParse(filled).error).toBeUndefined()
    },
  )
})

describe('itemsPerCall', () => {
  it('asks for about ten questions per call', () => {
    const per = Object.fromEntries(
      parts.map((part) => [part.code, itemsPerCall(part)]),
    )
    expect(per).toEqual({ P1: 10, P2: 10, P3: 3, P4: 3, P5: 10, P6: 2, P7: 2 })
  })
})

describe('mapLimit', () => {
  it('keeps order and never runs more than the limit at once', async () => {
    let running = 0
    let peak = 0
    const results = await mapLimit([30, 10, 20, 5], 2, async (ms, i) => {
      peak = Math.max(peak, ++running)
      await new Promise((resolve) => setTimeout(resolve, ms))
      running--
      return i
    })
    expect(results).toEqual([0, 1, 2, 3])
    expect(peak).toBe(2)
  })
})
