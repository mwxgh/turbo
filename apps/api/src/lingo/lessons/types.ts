/** A worked example of a lesson: English line, Vietnamese meaning, optional note on why. */
export interface LessonExample {
  en: string
  vi: string
  note?: string
}

export interface LessonSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  examples?: LessonExample[]
}

export type ModuleId =
  'grammar' | 'vocab' | 'listening' | 'reading' | 'strategy'

/**
 * One lesson of the Lingo course (written for Lingo, not copied from a book or course). Practice
 * draws published questions of `practice.part`, only those tagged `practice.skillTag` when set.
 */
export interface LessonSpec {
  id: string
  module: ModuleId
  title: string
  summary: string
  minutes: number
  /** Parts the lesson is about (P1…P7) */
  parts: string[]
  sections: LessonSection[]
  /** Short checklist to keep in mind during the exam */
  keyPoints: string[]
  practice?: { part: string; skillTag?: string }
}
