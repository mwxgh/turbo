import type { SignInProvider } from '@repo/utils'

/** Provider logo (brand colours; GitHub follows the text colour). */
export function ProviderIcon({ provider }: { provider: SignInProvider }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5">
      {provider.icon.map(({ d, fill }) => (
        <path key={d} d={d} fill={fill} />
      ))}
    </svg>
  )
}
