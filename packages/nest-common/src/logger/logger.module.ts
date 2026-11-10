import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'

import type { DynamicModule } from '@nestjs/common'

import { LoggerModule } from 'nestjs-pino'
import type { Options } from 'pino-http'
import pretty from 'pino-pretty'

import { LogFormat, type LogLevel } from './log-level.js'

export {
  InjectPinoLogger,
  Logger,
  LoggerErrorInterceptor,
  PinoLogger,
} from 'nestjs-pino'

/** Read from the caller (web, mobile, gateway) when valid, always sent back on the response. */
export const REQUEST_ID_HEADER = 'x-request-id'

const VALID_REQUEST_ID = /^[\w.:-]{1,128}$/

export interface AppLoggerOptions {
  /** `service` field of every log line, e.g. `api`. */
  service: string
  /** `env` field of every log line (APP_ENV). */
  env: string
  level: LogLevel
  format: LogFormat
  /** Path prefixes without request logs, e.g. health probes (`/api/health`). */
  quietPaths?: string[]
}

/** The caller's request id when it is a sane token, else a new UUID; echoed as `x-request-id`. */
export function requestId(req: IncomingMessage, res: ServerResponse): string {
  const incoming = req.headers[REQUEST_ID_HEADER]
  const id =
    typeof incoming === 'string' && VALID_REQUEST_ID.test(incoming)
      ? incoming
      : randomUUID()
  res.setHeader(REQUEST_ID_HEADER, id)
  return id
}

/** pino-http options: one line per request, `reqId` on every log written while handling it. */
export function pinoHttpOptions({
  service,
  env,
  level,
  quietPaths = [],
}: AppLoggerOptions): Options {
  return {
    level,
    base: { service, env },
    genReqId: requestId,
    // Logs inside a request carry only `reqId`, not the whole request
    quietReqLogger: true,
    autoLogging: {
      ignore: (req) => {
        const path = req.url?.split('?')[0] ?? ''
        return quietPaths.some((prefix) => path.startsWith(prefix))
      },
    },
    customLogLevel: (_req, res, err) =>
      err || res.statusCode >= 500
        ? 'error'
        : res.statusCode >= 400
          ? 'warn'
          : 'info',
    // No headers: nothing secret (authorization, cookie) can reach the logs; the id is `reqId`
    serializers: {
      req: (req: { method: string; url: string }) => ({
        method: req.method,
        url: req.url,
      }),
      res: (res: { statusCode: number }) => ({ statusCode: res.statusCode }),
    },
  }
}

/**
 * Structured logging for a Nest app (nestjs-pino). In `main.ts`:
 *
 *   const app = await NestFactory.create(AppModule, { bufferLogs: true })
 *   app.useLogger(app.get(Logger))
 */
export function createLoggerModule(options: AppLoggerOptions): DynamicModule {
  const http = pinoHttpOptions(options)
  return LoggerModule.forRoot({
    pinoHttp:
      options.format === LogFormat.Pretty
        ? [
            http,
            pretty({
              singleLine: true,
              translateTime: 'SYS:HH:MM:ss.l',
              ignore: 'pid,hostname,service,env',
            }),
          ]
        : http,
  })
}
