import {
  Controller,
  ForbiddenException,
  Get,
  UnauthorizedException,
} from '@nestjs/common'
import type { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { describe, expect, it } from 'vitest'

import { AccessTokens } from '../tokens.js'
import { AuthGuard } from './auth.guard.js'
import { type AuthRequest, Public, Roles } from './decorators.js'

@Controller()
class TestController {
  @Get() privateRoute() {}
  @Public() @Get() publicRoute() {}
  @Roles('ADMIN') @Get() adminRoute() {}
}

const tokens = new AccessTokens('x'.repeat(32), 60)
const guard = new AuthGuard(new Reflector(), tokens, 'access_token')

function contextFor(handler: keyof TestController, request: AuthRequest) {
  return {
    getType: () => 'http',
    // Only the function reference is read (metadata key), never called
    getHandler: (): unknown =>
      Object.getOwnPropertyDescriptor(TestController.prototype, handler)?.value,
    getClass: () => TestController,
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext
}

const bearer = async (role = 'USER') => ({
  headers: {
    authorization: `Bearer ${await tokens.sign({ id: 'u1', sessionId: 's1', role })}`,
  },
})

describe('AuthGuard', () => {
  it('rejects anonymous calls to routes that are not @Public()', async () => {
    await expect(
      guard.canActivate(contextFor('privateRoute', { headers: {} })),
    ).rejects.toBeInstanceOf(UnauthorizedException)
  })

  it('attaches the user from a valid token', async () => {
    const request: AuthRequest = await bearer()
    await expect(
      guard.canActivate(contextFor('privateRoute', request)),
    ).resolves.toBe(true)
    expect(request.user).toEqual({ id: 'u1', sessionId: 's1', role: 'USER' })
  })

  it('lets anonymous callers through @Public() routes', async () => {
    await expect(
      guard.canActivate(contextFor('publicRoute', { headers: {} })),
    ).resolves.toBe(true)
  })

  it('enforces @Roles()', async () => {
    await expect(
      guard.canActivate(contextFor('adminRoute', await bearer('USER'))),
    ).rejects.toBeInstanceOf(ForbiddenException)
    await expect(
      guard.canActivate(contextFor('adminRoute', await bearer('ADMIN'))),
    ).resolves.toBe(true)
  })

  it('leaves non-HTTP contexts to their own auth (socket handshake)', async () => {
    const ws = { getType: () => 'ws' } as unknown as ExecutionContext
    await expect(guard.canActivate(ws)).resolves.toBe(true)
  })
})
