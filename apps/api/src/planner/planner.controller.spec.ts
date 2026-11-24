import { Test } from '@nestjs/testing'
import { ThrottlerGuard } from '@nestjs/throttler'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { AuthUser } from '@repo/nest-common/auth/nest'

import { PlannerController } from './planner.controller'
import { PlannerService } from './planner.service'

describe('PlannerController', () => {
  let controller: PlannerController
  const service = {
    findRange: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
  const user = { id: '11111111-1111-4111-8111-111111111111' } as AuthUser
  const id = '22222222-2222-4222-8222-222222222222'

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      controllers: [PlannerController],
      providers: [{ provide: PlannerService, useValue: service }],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile()
    controller = moduleRef.get(PlannerController)
  })

  it('scopes every route to the signed-in user', async () => {
    const range = { from: '2026-11-01', to: '2026-11-30' }
    await controller.findRange(user, range)
    await controller.create(user, { title: 'A' })
    await controller.update(user, id, { status: 'DONE' })
    await controller.remove(user, id)

    expect(service.findRange).toHaveBeenCalledWith(user.id, range)
    expect(service.create).toHaveBeenCalledWith(user.id, { title: 'A' })
    expect(service.update).toHaveBeenCalledWith(user.id, id, {
      status: 'DONE',
    })
    expect(service.remove).toHaveBeenCalledWith(user.id, id)
  })
})
