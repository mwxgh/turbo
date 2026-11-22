import { describe, expect, it } from 'vitest'

import { getExam } from '../specs'
import { LESSONS, LESSON_MODULES } from './index'
import { LESSON_IDS } from './plan'

const exam = getExam('TOEIC_LR')
const parts = new Set(exam.sections.flatMap((s) => s.parts.map((p) => p.code)))

describe('course', () => {
  it.each(LESSON_MODULES.map((m) => m.id))(
    'module %s has its planned lessons in order',
    (module) => {
      expect(
        LESSONS.filter((l) => l.module === module).map((l) => l.id),
      ).toEqual(LESSON_IDS[module])
    },
  )

  it('has well-formed lessons', () => {
    const problems: string[] = []
    for (const l of LESSONS) {
      if (!l.title || !l.summary) problems.push(`${l.id}: title / summary`)
      if (l.minutes < 5 || l.minutes > 40) problems.push(`${l.id}: minutes`)
      if (l.sections.length < 2) problems.push(`${l.id}: sections`)
      if (l.keyPoints.length < 2) problems.push(`${l.id}: key points`)
      for (const p of l.parts)
        if (!parts.has(p)) problems.push(`${l.id}: part ${p}`)
      for (const s of l.sections)
        if (!s.heading || !s.paragraphs.length)
          problems.push(`${l.id}: section "${s.heading}"`)
      if (l.practice) {
        if (!parts.has(l.practice.part)) problems.push(`${l.id}: practice part`)
        if (l.practice.skillTag && !(l.practice.skillTag in exam.skillTags))
          problems.push(`${l.id}: skill tag ${l.practice.skillTag}`)
      }
    }
    expect(problems).toEqual([])
  })
})
