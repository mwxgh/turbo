import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import type { ChatMessage } from '../lib/socket'
import { Chat } from './chat'

/** Minimal stand-in for the socket.io client used by <Chat>. */
function createFakeSocket() {
  const handlers = new Map<string, Set<(...args: unknown[]) => unknown>>()
  return {
    handlers,
    on: vi.fn((event: string, fn: (...args: unknown[]) => unknown) => {
      if (!handlers.has(event)) handlers.set(event, new Set())
      handlers.get(event)!.add(fn)
    }),
    off: vi.fn((event: string, fn: (...args: unknown[]) => unknown) => {
      handlers.get(event)?.delete(fn)
    }),
    connect: vi.fn(),
    disconnect: vi.fn(),
    emitWithAck: vi.fn(),
    async fire(event: string, ...args: unknown[]) {
      await act(async () => {
        for (const fn of handlers.get(event) ?? []) await fn(...args)
      })
    },
    /** Many events in one act(): one React render instead of one per event. */
    async fireEach(event: string, payloads: unknown[]) {
      await act(async () => {
        for (const payload of payloads)
          for (const fn of handlers.get(event) ?? []) await fn(payload)
      })
    },
  }
}

const socket = vi.hoisted(() => ({
  current: null as ReturnType<typeof createFakeSocket> | null,
}))
vi.mock('../lib/socket', () => ({ getSocket: () => socket.current }))

const message = (text: string): ChatMessage => ({
  id: crypto.randomUUID(),
  room: 'lobby',
  text,
  senderId: 'abcdef123',
  sentAt: new Date().toISOString(),
})

// jsdom has no layout: give the virtualized list a viewport so rows render
const layout = ['clientHeight', 'clientWidth', 'scrollHeight'] as const
const originals = layout.map((key) =>
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, key),
)
beforeAll(() => {
  for (const key of ['clientHeight', 'clientWidth'] as const) {
    Object.defineProperty(HTMLElement.prototype, key, {
      configurable: true,
      get: () => 400,
    })
  }
  // Content height = the sizer element the virtualizer styles with the total size
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get(this: HTMLElement) {
      const sizer = this.firstElementChild as HTMLElement | null
      return Number.parseFloat(sizer?.style.height ?? '') || 0
    },
  })
  // Like a browser: move the scroll position and notify listeners
  Element.prototype.scrollTo = function (
    this: Element,
    options?: ScrollToOptions | number,
  ) {
    const top = typeof options === 'number' ? options : (options?.top ?? 0)
    // jsdom's scrollTop is always 0 (no layout): keep the value on the element
    Object.defineProperty(this, 'scrollTop', {
      configurable: true,
      writable: true,
      value: top,
    })
    this.dispatchEvent(new Event('scroll'))
  }
})
afterAll(() => {
  layout.forEach((key, i) => {
    if (originals[i])
      Object.defineProperty(HTMLElement.prototype, key, originals[i])
  })
})

describe('Chat', () => {
  beforeEach(() => {
    socket.current = createFakeSocket()
  })

  it('connects, joins the lobby and cleans up on unmount', async () => {
    const fake = socket.current!
    fake.emitWithAck.mockResolvedValue({ ok: true, data: undefined })
    const { unmount } = render(<Chat />)

    expect(fake.connect).toHaveBeenCalled()
    expect(screen.getByText('disconnected')).toBeInTheDocument()

    await fake.fire('connect')
    expect(screen.getByText('connected')).toBeInTheDocument()
    expect(fake.emitWithAck).toHaveBeenCalledWith('room:join', {
      room: 'lobby',
    })

    unmount()
    expect(fake.disconnect).toHaveBeenCalled()
    expect(fake.handlers.get('chat:message')?.size).toBe(0)
  })

  it('renders incoming messages', async () => {
    const fake = socket.current!
    render(<Chat />)
    await fake.fire('chat:message', message('xin chào'))
    expect(screen.getByText('xin chào')).toBeInTheDocument()
  })

  it('sends a message and clears the input', async () => {
    const fake = socket.current!
    fake.emitWithAck.mockResolvedValue({ ok: true, data: message('hi') })
    render(<Chat />)
    await fake.fire('connect')

    const input = screen.getByPlaceholderText('Message #lobby')
    await userEvent.type(input, 'hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(fake.emitWithAck).toHaveBeenLastCalledWith('chat:send', {
      room: 'lobby',
      text: 'hi',
    })
    expect(input).toHaveValue('')
  })

  it('shows errors acked by the server', async () => {
    const fake = socket.current!
    fake.emitWithAck
      .mockResolvedValueOnce({ ok: true, data: undefined })
      .mockResolvedValueOnce({ ok: false, errors: ['Join room "lobby" first'] })
    render(<Chat />)
    await fake.fire('connect')

    await userEvent.type(screen.getByPlaceholderText('Message #lobby'), 'hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByText('Join room "lobby" first'),
    ).toBeInTheDocument()
  })

  it('shows an error when the server does not ack in time', async () => {
    const fake = socket.current!
    fake.emitWithAck
      .mockResolvedValueOnce({ ok: true, data: undefined })
      .mockRejectedValueOnce(new Error('operation has timed out'))
    render(<Chat />)
    await fake.fire('connect')

    const input = screen.getByPlaceholderText('Message #lobby')
    await userEvent.type(input, 'hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByText('The server did not answer. Try again.'),
    ).toBeInTheDocument()
    expect(input).toHaveValue('hi') // kept so the user can resend
  })

  it('virtualizes long histories (renders only visible rows)', async () => {
    const fake = socket.current!
    render(<Chat />)
    await fake.fireEach(
      'chat:message',
      Array.from({ length: 500 }, (_, i) => message(`msg ${i}`)),
    )

    const log = screen.getByRole('log', { name: 'Messages in #lobby' })
    const rendered = log.querySelectorAll('code').length
    expect(rendered).toBeGreaterThan(0)
    expect(rendered).toBeLessThan(50)
    // follows the newest message
    expect(await screen.findByText('msg 499')).toBeInTheDocument()
  })
})
