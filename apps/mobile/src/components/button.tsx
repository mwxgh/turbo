import { Pressable, type PressableProps, Text } from 'react-native'

const variants = {
  primary: { box: 'bg-primary', text: 'text-primary-foreground' },
  ghost: { box: 'bg-transparent', text: 'text-foreground' },
  destructive: { box: 'bg-destructive', text: 'text-white' },
}

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  variant?: keyof typeof variants
}

export function Button({
  label,
  variant = 'primary',
  disabled,
  className,
  ...props
}: ButtonProps) {
  const style = variants[variant]
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`items-center justify-center rounded-md px-4 py-2.5
        active:opacity-80 ${style.box} ${disabled ? 'opacity-50' : ''}
        ${className ?? ''}`}
      {...props}
    >
      <Text className={`text-sm font-medium ${style.text}`}>{label}</Text>
    </Pressable>
  )
}
