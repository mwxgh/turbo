import { Logger } from '@nestjs/common'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ChatGateway } from './chat.gateway'

function setup() {
  const emit = vi.fn()
  const server = { to: vi.fn(() => ({ emit })) }
  const gateway = new ChatGateway()
  Object.assign(gateway, { server })

  const rooms = new Set<string>(['socket-1'])
  const client = {
    id: 'socket-1',
    rooms,
    join: vi.fn((room: string) => {
      rooms.add(room)
      return Promise.resolve()
    }),
  }
  // Only the members the gateway touches are mocked
  return { gateway, server, emit, client: client as never }
}

describe('ChatGateway', () => {
  beforeEach(() => {
    vi.spyOn(Logger.prototype, 'log').mockImplementation(() => {})
  })

  describe('room:join', () => {
    it('joins the trimmed room and announces it', async () => {
      const { gateway, server, emit, client } = setup()

      await expect(
        gateway.joinRoom(client, { room: ' lobby ' }),
      ).resolves.toEqual({
        ok: true,
        data: undefined,
      })
      expect(server.to).toHaveBeenCalledWith('lobby')
      expect(emit).toHaveBeenCalledWith('room:joined', {
        room: 'lobby',
        socketId: 'socket-1',
      })
    })

    it.each([undefined, 'lobby', { room: '' }, { room: 'x'.repeat(65) }])(
      'rejects %j without joining',
      async (payload) => {
        const { gateway, client, server } = setup()
        const res = await gateway.joinRoom(client, payload)
        expect(res.ok).toBe(false)
        expect(server.to).not.toHaveBeenCalled()
      },
    )
  })

  describe('chat:send', () => {
    it('broadcasts to the room and acks the stored message', async () => {
      const { gateway, client, emit } = setup()
      await gateway.joinRoom(client, { room: 'lobby' })
      emit.mockClear()

      const res = gateway.sendMessage(client, { room: 'lobby', text: ' hi ' })

      expect(res).toMatchObject({
        ok: true,
        data: { room: 'lobby', text: 'hi', senderId: 'socket-1' },
      })
      expect(emit).toHaveBeenCalledWith('chat:message', res.ok && res.data)
    })

    it('requires joining the room first', () => {
      const { gateway, client, emit } = setup()
      expect(
        gateway.sendMessage(client, { room: 'lobby', text: 'hi' }),
      ).toEqual({
        ok: false,
        errors: ['Join room "lobby" first'],
      })
      expect(emit).not.toHaveBeenCalled()
    })

    it('validates the payload', () => {
      const { gateway, client } = setup()
      expect(
        gateway.sendMessage(client, { room: 'lobby', text: '  ' }),
      ).toEqual({
        ok: false,
        errors: ['text should not be empty'],
      })
    })
  })
})
