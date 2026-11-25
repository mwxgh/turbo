'use server'

// Writes of Studio learning. Callers toast the outcome and invalidate `studioKeys.learn`.
import { run } from '@/lib/action-result'
import { apiFetch } from '@/lib/api'
import type { QuizResult } from '@/lib/queries/studio'

const send = <T>(method: string, path: string, body: unknown) =>
  apiFetch<T>(path, { method, body: JSON.stringify(body) })

export async function setLessonDone(lessonId: string, done: boolean) {
  return run(() =>
    send<unknown>(
      'PUT',
      `/studio/lessons/${encodeURIComponent(lessonId)}/done`,
      {
        done,
      },
    ),
  )
}

export async function submitQuiz(lessonId: string, answers: number[]) {
  return run(() =>
    send<QuizResult>(
      'POST',
      `/studio/lessons/${encodeURIComponent(lessonId)}/quiz`,
      { answers },
    ),
  )
}
