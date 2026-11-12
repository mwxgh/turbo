import { parseAppEnv, parseUrlEnv } from '@repo/utils'

// `EXPO_PUBLIC_*` must be referenced statically so Expo can inline them at build time.
const appEnv = parseAppEnv(process.env.EXPO_PUBLIC_APP_ENV)

export const env = {
  /** dev | stg | prod – a typo fails at startup. */
  appEnv,
  /**
   * Required on stg/prod. Dev default: localhost (iOS simulator, web);
   * Android emulator: http://10.0.2.2:3001/api; a device: the machine's LAN IP.
   */
  apiUrl: parseUrlEnv('EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL, {
    appEnv,
    devDefault: 'http://localhost:3001/api',
  }),
}
