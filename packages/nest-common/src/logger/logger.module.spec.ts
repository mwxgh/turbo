import type { IncomingMessage, ServerResponse } from 'node:http'

import { describe, expect, it, vi } from 'vitest'

import { LogFormat, LogLevel } from './log-level.js'
import {
  REQUEST_ID_HEADER,
  createLoggerModule,
  pinoHttpOptions,
  requestId,
} from './logger.module.js'

const req = (headers: Record<string, string> = {}, url = '/api/hellos') =>
  ({ headers, url }) as unknown as IncomingMessage
const res = (statusCode = 200, setHeader = vi.fn()) =>
  ({ statusCode, setHeader }) as unknown as ServerResponse

const options = pinoHttpOptions({
  service: 'api',
  env: 'dev',
  level: LogLevel.Info,
  format: LogFormat.Json,
  quietPaths: ['/api/health'],
})

describe('requestId', () => {
  it('keeps a valid incoming id and echoes it', () => {
    const setHeader = vi.fn()
    expect(
      requestId(
        req({ [REQUEST_ID_HEADER]: 'web-1a2b.3:c' }),
        res(200, setHeader),
      ),
    ).toBe('web-1a2b.3:c')
    expect(setHeader).toHaveBeenCalledWith(REQUEST_ID_HEADER, 'web-1a2b.3:c')
  })

  it('replaces a missing or unsafe id with a UUID', () => {
    const uuid = /^[0-9a-f-]{36}$/
    expect(requestId(req(), res())).toMatch(uuid)
    expect(
      requestId(req({ [REQUEST_ID_HEADER]: 'bad id\n{"level":60}' }), res()),
    ).toMatch(uuid)
    expect(
      requestId(req({ [REQUEST_ID_HEADER]: 'x'.repeat(129) }), res()),
    ).toMatch(uuid)
  })
})

describe('pinoHttpOptions', () => {
  it('tags every line with service and env', () => {
    expect(options).toMatchObject({
      level: 'info',
      base: { service: 'api', env: 'dev' },
    })
  })

  it('skips request logs for quiet paths only', () => {
    const autoLogging = options.autoLogging as {
      ignore: (req: IncomingMessage) => boolean
    }
    expect(autoLogging.ignore(req({}, '/api/health/live?x=1'))).toBe(true)
    expect(autoLogging.ignore(req({}, '/api/hellos'))).toBe(false)
  })

  it('logs 5xx and errors as error, 4xx as warn', () => {
    const level = options.customLogLevel!
    expect(level(req(), res(200), undefined)).toBe('info')
    expect(level(req(), res(404), undefined)).toBe('warn')
    expect(level(req(), res(503), undefined)).toBe('error')
    expect(level(req(), res(200), new Error('boom'))).toBe('error')
  })

  it('never serializes request headers', () => {
    const serialize = options.serializers!.req as (r: object) => object
    expect(
      serialize({
        id: '1',
        method: 'GET',
        url: '/api/hellos',
        headers: { authorization: 'Bearer secret' },
      }),
    ).toEqual({ method: 'GET', url: '/api/hellos' })
  })
})

describe('createLoggerModule', () => {
  it('builds the nestjs-pino module for both formats', () => {
    for (const format of Object.values(LogFormat)) {
      const mod = createLoggerModule({
        service: 'api',
        env: 'dev',
        level: LogLevel.Silent,
        format,
      })
      expect(mod.module.name).toBe('LoggerModule')
    }
  })
})
