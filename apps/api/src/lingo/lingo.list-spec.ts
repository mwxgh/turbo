import type { LingoAttempt, LingoChat, LingoItem } from '@repo/db'
import { defineListSpecFor } from '@repo/utils'

/** GET /api/lingo/attempts: the learner's own attempts (scoped to the user by the service). */
export const attemptListSpec = defineListSpecFor<LingoAttempt>()({
  sortable: ['startedAt', 'submittedAt'],
  defaultSort: { field: 'startedAt', dir: 'desc' },
  filters: {
    exam: { type: 'string' },
    mode: { type: 'enum', values: ['QUICK', 'PRACTICE', 'FULL_TEST'] },
    submittedAt: { type: 'date' },
  },
})

/** GET /api/lingo/admin/items: the review queue and content browser. */
export const itemListSpec = defineListSpecFor<LingoItem>()({
  keywordFields: ['topic'],
  sortable: ['createdAt', 'updatedAt', 'part', 'difficulty'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    exam: { type: 'string' },
    part: { type: 'string' },
    status: {
      type: 'enum',
      values: ['DRAFT', 'NEEDS_REVIEW', 'PUBLISHED', 'REJECTED'],
    },
    difficulty: { type: 'enum', values: ['EASY', 'MEDIUM', 'HARD'] },
    batchId: { type: 'uuid' },
    createdAt: { type: 'date' },
  },
})

/** GET /api/lingo/chats: the learner's AI tutor chats (scoped to the user by the service). */
export const chatListSpec = defineListSpecFor<LingoChat>()({
  keywordFields: ['title'],
  sortable: ['updatedAt', 'createdAt'],
  defaultSort: { field: 'updatedAt', dir: 'desc' },
})
