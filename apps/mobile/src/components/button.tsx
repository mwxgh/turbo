import type { ReactNode } from 'react'

import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  Text,
} from 'react-native'

const variants = {
  primary: {
    box: 'bg-primary',
    text: 'text-primary-foreground',
    spinner: 'text-primary-foreground',
  },
  outline: {
    box: 'border border-input bg-background',
    text: 'text-foreground',
    spinner: 'text-foreground',
  },
  ghost: { box: 'bg-transparent', text: 'text-foreground', spinner: '' },
  destructive: { box: 'bg-destructive', text: 'text-white', spinner: '' },
}

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  variant?: keyof typeof variants
  /** Shown before the label (e.g. a provider logo). */
  icon?: ReactNode
  /** Spinner instead of the icon, and not pressable. */
  loading?: boolean
}

export function Button({
  label,
  variant = 'primary',
  icon,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const style = variants[variant]
  const inactive = disabled || loading
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      disabled={inactive}
      className={`min-h-12 flex-row items-center justify-center gap-2.5
        rounded-md px-4 py-2.5 active:opacity-80 ${style.box}
        ${inactive ? 'opacity-50' : ''} ${className ?? ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" className={style.spinner} />
      ) : (
        icon
      )}
      <Text className={`text-base font-medium ${style.text}`}>{label}</Text>
    </Pressable>
  )
}
