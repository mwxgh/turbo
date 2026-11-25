import type { StudioRoadmap, StudioTrack } from '@repo/db'
import { defineListSpecFor } from '@repo/utils'

/** GET /api/studio/admin/tracks: every track, drafts included. */
export const trackListSpec = defineListSpecFor<StudioTrack>()({
  keywordFields: ['title', 'slug'],
  sortable: ['order', 'title', 'updatedAt', 'createdAt'],
  defaultSort: { field: 'updatedAt', dir: 'desc' },
  filters: {
    category: {
      type: 'enum',
      values: ['LANGUAGE', 'FRAMEWORK', 'PATTERN', 'FUNDAMENTAL', 'TOOL'],
    },
    status: { type: 'enum', values: ['DRAFT', 'PUBLISHED'] },
  },
})

/** GET /api/studio/admin/roadmaps: every roadmap, drafts included. */
export const roadmapListSpec = defineListSpecFor<StudioRoadmap>()({
  keywordFields: ['title', 'slug'],
  sortable: ['order', 'title', 'updatedAt'],
  defaultSort: { field: 'order', dir: 'asc' },
  filters: { status: { type: 'enum', values: ['DRAFT', 'PUBLISHED'] } },
})
