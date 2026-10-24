import { parseAppEnv } from '@repo/utils'

// `EXPO_PUBLIC_*` must be referenced statically so Expo can inline them at build time.
export const env = {
  /** dev | stg | prod – a typo fails at startup. */
  appEnv: parseAppEnv(process.env.EXPO_PUBLIC_APP_ENV),
  /** Android emulator: http://10.0.2.2:4000/api; a device: the machine's LAN IP. */
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api',
}
