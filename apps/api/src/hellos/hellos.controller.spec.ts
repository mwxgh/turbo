import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HellosController } from './hellos.controller'
import { HellosService } from './hellos.service'

describe('HellosController', () => {
  let controller: HellosController
  const service = {
    findAll: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      controllers: [HellosController],
      providers: [{ provide: HellosService, useValue: service }],
    }).compile()
    controller = moduleRef.get(HellosController)
  })

  it('delegates every route to HellosService', async () => {
    const id = '11111111-1111-4111-8111-111111111111'
    service.findAll.mockResolvedValue('list')
    service.findOne.mockResolvedValue('one')
    service.create.mockResolvedValue('created')
    service.update.mockResolvedValue('updated')
    service.remove.mockResolvedValue(undefined)

    await expect(controller.findAll({ page: 1, pageSize: 20 })).resolves.toBe(
      'list',
    )
    await expect(controller.findOne(id)).resolves.toBe('one')
    await expect(controller.create({ message: 'Hi' })).resolves.toBe('created')
    await expect(controller.update(id, { message: 'New' })).resolves.toBe(
      'updated',
    )
    await expect(controller.remove(id)).resolves.toBeUndefined()

    expect(service.findAll).toHaveBeenCalledWith({ page: 1, pageSize: 20 })
    expect(service.update).toHaveBeenCalledWith(id, { message: 'New' })
    expect(service.remove).toHaveBeenCalledWith(id)
  })
})
