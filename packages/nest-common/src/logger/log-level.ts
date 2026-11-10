/** `LOG_LEVEL`: pino levels; `silent` turns logging off (tests). */
export const LogLevel = {
  Fatal: 'fatal',
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Debug: 'debug',
  Trace: 'trace',
  Silent: 'silent',
} as const

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

/** `LOG_FORMAT`: one JSON object per line (servers, log collectors) or coloured lines (local). */
export const LogFormat = {
  Json: 'json',
  Pretty: 'pretty',
} as const

export type LogFormat = (typeof LogFormat)[keyof typeof LogFormat]
