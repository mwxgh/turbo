'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import { Badge } from '@repo/ui/components/badge'
import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Input } from '@repo/ui/components/input'

import { type ChatMessage, getSocket } from '../lib/socket'

const ROOM = 'lobby'
const ROW_HEIGHT = 28

export function Chat() {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Only the visible rows are rendered, so long chats stay fast.
  // TanStack Virtual returns fresh functions each render, so React Compiler
  // must not memoize this component (it skips it automatically).
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    // Updates are batched by React; flushSync during render only triggers warnings
    useFlushSync: false,
  })

  useEffect(() => {
    const socket = getSocket()

    const onConnect = async () => {
      setConnected(true)
      const res = await socket.emitWithAck('room:join', { room: ROOM })
      if (!res.ok) setError(res.errors.join(', '))
    }
    const onDisconnect = () => setConnected(false)
    const onMessage = (message: ChatMessage) =>
      setMessages((prev) => [...prev, message])

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat:message', onMessage)
    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('chat:message', onMessage)
      socket.disconnect()
    }
  }, [])

  // Follow the newest message
  useEffect(() => {
    if (messages.length) virtualizer.scrollToIndex(messages.length - 1)
  }, [messages.length, virtualizer])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await getSocket().emitWithAck('chat:send', {
      room: ROOM,
      text,
    })
    if (res.ok) {
      setText('')
      setError(null)
    } else {
      setError(res.errors.join(', '))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Socket
          <Badge variant={connected ? 'default' : 'destructive'}>
            {connected ? 'connected' : 'disconnected'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div
          ref={listRef}
          role="log"
          aria-label={`Messages in #${ROOM}`}
          className="h-48 overflow-y-auto rounded-md border bg-muted/30"
        >
          <div
            className="relative w-full"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((item) => {
              const m = messages[item.index]!
              return (
                <div
                  key={m.id}
                  className="absolute inset-x-0 flex items-center gap-2 px-3
                    text-sm"
                  style={{
                    height: item.size,
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  <code className="text-xs text-muted-foreground">
                    {m.senderId.slice(0, 6)}
                  </code>
                  <span>{m.text}</span>
                </div>
              )
            })}
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message #${ROOM}`}
            disabled={!connected}
          />
          <Button type="submit" disabled={!connected || !text.trim()}>
            Send
          </Button>
        </form>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  )
}
