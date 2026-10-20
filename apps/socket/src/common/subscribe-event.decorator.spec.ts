import { MESSAGE_METADATA } from '@nestjs/websockets/constants.js'

import { describe, expect, it } from 'vitest'

import { SubscribeEvent } from './subscribe-event.decorator.js'

describe('SubscribeEvent', () => {
  it('registers the handler like @SubscribeMessage', () => {
    class Gateway {
      @SubscribeEvent('chat:send')
      handle() {}
    }
    expect(
      Reflect.getMetadata(MESSAGE_METADATA, Gateway.prototype.handle),
    ).toBe('chat:send')
  })
})
