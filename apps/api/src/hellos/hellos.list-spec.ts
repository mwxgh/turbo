import type { Hello } from '@repo/db'
import { defineListSpecFor } from '@repo/utils'

/**
 * What GET /api/hellos lets clients search, filter and sort. Anything else is
 * rejected with 400; Swagger documents it via @ApiListQuery. Field names are
 * checked against the Prisma model.
 */
export const helloListSpec = defineListSpecFor<Hello>()({
  keywordFields: ['message'],
  sortable: ['message', 'createdAt', 'updatedAt'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    id: { type: 'uuid' },
    message: { type: 'string' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
  },
})
