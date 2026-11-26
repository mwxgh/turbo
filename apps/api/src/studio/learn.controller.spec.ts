import { Test } from '@nestjs/testing'
import { ThrottlerGuard } from '@nestjs/throttler'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AdminLearnController } from './admin-learn.controller'
import { AdminLearnService } from './admin-learn.service'
import { LearnController } from './learn.controller'
import { LearnService } from './learn.service'

const ID = '11111111-1111-4111-8111-111111111111'
const user = { id: ID, sessionId: ID, role: 'USER' as const }

describe('Studio learn controllers', () => {
  let learn: LearnController
  let admin: AdminLearnController
  const learnService = {
    overview: vi.fn(),
    tracks: vi.fn(),
    track: vi.fn(),
    lesson: vi.fn(),
    roadmaps: vi.fn(),
    roadmap: vi.fn(),
    setDone: vi.fn(),
    submitQuiz: vi.fn(),
  }
  const adminService = {
    tracks: vi.fn(),
    updateLesson: vi.fn(),
    removeRoadmap: vi.fn(),
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      controllers: [LearnController, AdminLearnController],
      providers: [
        { provide: LearnService, useValue: learnService },
        { provide: AdminLearnService, useValue: adminService },
      ],
    })
      // Rate limiting is covered by test/security.e2e-spec.ts
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile()
    learn = moduleRef.get(LearnController)
    admin = moduleRef.get(AdminLearnController)
  })

  it('scopes learner routes to the signed-in user', async () => {
    await learn.lesson(user, 'ts', 'intro')
    await learn.setDone(user, ID, { done: true })
    await learn.submitQuiz(user, ID, { answers: [0, 1] })

    expect(learnService.lesson).toHaveBeenCalledWith(ID, 'ts', 'intro')
    expect(learnService.setDone).toHaveBeenCalledWith(ID, ID, true)
    expect(learnService.submitQuiz).toHaveBeenCalledWith(ID, ID, [0, 1])
  })

  it('delegates admin routes', async () => {
    const query = { page: 1, pageSize: 20 }
    const body = { slug: 'intro', title: 'Intro' }
    await admin.tracks(query)
    await admin.updateLesson(ID, body)
    await admin.removeRoadmap(ID)

    expect(adminService.tracks).toHaveBeenCalledWith(query)
    expect(adminService.updateLesson).toHaveBeenCalledWith(ID, body)
    expect(adminService.removeRoadmap).toHaveBeenCalledWith(ID)
  })
})
