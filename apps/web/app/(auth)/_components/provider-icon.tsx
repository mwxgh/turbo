import {
  BrandFacebook,
  BrandGithub,
  BrandGoogle,
  type PulsoIcon,
} from 'pulsoicon-react'

import type { SignInProvider } from '@repo/utils'

const ICONS: Record<string, PulsoIcon> = {
  google: BrandGoogle,
  facebook: BrandFacebook,
  github: BrandGithub,
}

/**
 * Provider logo: the animated pulsoicon brand icon (one colour, follows the text), or the
 * provider's own SVG paths for a provider pulsoicon has no icon for.
 */
export function ProviderIcon({ provider }: { provider: SignInProvider }) {
  const Icon = ICONS[provider.id]
  if (Icon) return <Icon aria-hidden="true" className="size-4.5" />
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5">
      {provider.icon.map(({ d, fill }) => (
        <path key={d} d={d} fill={fill} />
      ))}
    </svg>
  )
}
