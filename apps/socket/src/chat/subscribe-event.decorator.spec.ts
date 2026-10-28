import { MESSAGE_METADATA } from '@nestjs/websockets/constants.js'

import { describe, expect, it } from 'vitest'

import { SubscribeEvent } from './subscribe-event.decorator'

describe('SubscribeEvent', () => {
  it('registers the handler like @SubscribeMessage', () => {
    class Gateway {
      @SubscribeEvent('chat:send')
      handle() {}
    }
    // Reads metadata stored on the function; it is never called unbound
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const handler = Gateway.prototype.handle
    expect(Reflect.getMetadata(MESSAGE_METADATA, handler)).toBe('chat:send')
  })
})
