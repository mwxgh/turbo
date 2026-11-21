import { NotFoundException, ServiceUnavailableException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PrismaService } from '@repo/db/nest'

import { ChatService, TUTOR_PROMPT, chatTitle } from './chat.service'
import { TutorModel } from './tutor-model'

/** A model answer arriving in pieces. */
async function* pieces(...items: string[]) {
  for (const item of items) yield await Promise.resolve(item)
}

const USER = '11111111-1111-4111-8111-111111111111'
const CHAT = '22222222-2222-4222-8222-222222222222'

describe('ChatService', () => {
  let service: ChatService
  const prisma = {
    lingoChat: {
      findFirst: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
  }
  const model = { enabled: true, stream: vi.fn() }

  const drain = async (stream: AsyncIterable<string>) => {
    let text = ''
    for await (const piece of stream) text += piece
    return text
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    model.enabled = true
    const moduleRef = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: PrismaService, useValue: prisma },
        { provide: TutorModel, useValue: model },
      ],
    }).compile()
    service = moduleRef.get(ChatService)
  })

  it('is unavailable without a model', async () => {
    model.enabled = false
    await expect(service.ask(USER, CHAT, 'Hi')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    )
  })

  it('only answers in the learner’s own chats', async () => {
    prisma.lingoChat.findFirst.mockResolvedValue(null)
    await expect(service.ask(USER, CHAT, 'Hi')).rejects.toBeInstanceOf(
      NotFoundException,
    )
    expect(prisma.lingoChat.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: CHAT, userId: USER } }),
    )
  })

  it('sends the prompt + history oldest first, titles a new chat and saves both sides', async () => {
    prisma.lingoChat.findFirst.mockResolvedValue({
      messages: [
        { role: 'ASSISTANT', content: 'A1' },
        { role: 'USER', content: 'Q1' },
      ],
    })
    model.stream.mockImplementation(() => pieces('Hel', 'lo'))

    const text = await drain(await service.ask(USER, CHAT, 'Q2'))

    expect(text).toBe('Hello')
    expect(model.stream).toHaveBeenCalledWith(
      [
        { role: 'system', content: TUTOR_PROMPT },
        { role: 'user', content: 'Q1' },
        { role: 'assistant', content: 'A1' },
        { role: 'user', content: 'Q2' },
      ],
      undefined,
    )
    expect(prisma.lingoChat.update).toHaveBeenNthCalledWith(1, {
      where: { id: CHAT },
      data: { messages: { create: { role: 'USER', content: 'Q2' } } },
    })
    expect(prisma.lingoChat.update).toHaveBeenNthCalledWith(2, {
      where: { id: CHAT },
      data: { messages: { create: { role: 'ASSISTANT', content: 'Hello' } } },
    })
  })

  it('titles a chat with its first question', async () => {
    prisma.lingoChat.findFirst.mockResolvedValue({ messages: [] })
    model.stream.mockImplementation(() => pieces('ok'))
    await drain(await service.ask(USER, CHAT, '  What   is a gerund? '))
    expect(prisma.lingoChat.update).toHaveBeenNthCalledWith(1, {
      where: { id: CHAT },
      data: {
        title: 'What is a gerund?',
        messages: {
          create: { role: 'USER', content: '  What   is a gerund? ' },
        },
      },
    })
  })

  it('keeps a partial answer when the model fails midway, rethrows when nothing came', async () => {
    prisma.lingoChat.findFirst.mockResolvedValue({ messages: [] })
    model.stream.mockImplementation(async function* () {
      yield* pieces('Part')
      throw new Error('boom')
    })
    await expect(drain(await service.ask(USER, CHAT, 'Q'))).resolves.toBe(
      'Part',
    )
    expect(prisma.lingoChat.update).toHaveBeenLastCalledWith({
      where: { id: CHAT },
      data: { messages: { create: { role: 'ASSISTANT', content: 'Part' } } },
    })

    prisma.lingoChat.update.mockClear()
    model.stream.mockImplementation(() => {
      throw new Error('boom')
    })
    await expect(drain(await service.ask(USER, CHAT, 'Q'))).rejects.toThrow(
      'boom',
    )
    expect(prisma.lingoChat.update).toHaveBeenCalledTimes(1)
  })

  it('removes only the learner’s own chat', async () => {
    prisma.lingoChat.deleteMany.mockResolvedValue({ count: 0 })
    await expect(service.remove(USER, CHAT)).rejects.toBeInstanceOf(
      NotFoundException,
    )
    expect(prisma.lingoChat.deleteMany).toHaveBeenCalledWith({
      where: { id: CHAT, userId: USER },
    })
  })
})

describe('chatTitle', () => {
  it('squashes whitespace and shortens long questions', () => {
    expect(chatTitle(' a \n b ')).toBe('a b')
    const title = chatTitle('x'.repeat(150))
    expect(title).toHaveLength(100)
    expect(title.endsWith('…')).toBe(true)
  })
})
