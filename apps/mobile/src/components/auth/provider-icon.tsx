import { useColorScheme } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import type { SignInProvider } from '@repo/utils'

/** Provider logo (brand colours; GitHub follows the theme's text colour). */
export function ProviderIcon({ provider }: { provider: SignInProvider }) {
  const dark = useColorScheme() === 'dark'
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      color={dark ? '#fafafa' : '#0a0a0a'}
    >
      {provider.icon.map(({ d, fill }) => (
        <Path key={d} d={d} fill={fill} />
      ))}
    </Svg>
  )
}
