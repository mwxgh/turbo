import { Pressable, Text, View } from 'react-native'

export type AuthMode = 'login' | 'register'

const TABS: { mode: AuthMode; label: string }[] = [
  { mode: 'login', label: 'Sign in' },
  { mode: 'register', label: 'Create account' },
]

/** Segmented control between signing in and creating an account. */
export function AuthTabs({
  mode,
  onChange,
}: {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}) {
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row gap-1 rounded-lg bg-muted p-1"
    >
      {TABS.map((tab) => {
        const selected = tab.mode === mode
        return (
          <Pressable
            key={tab.mode}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(tab.mode)}
            className={`min-h-11 flex-1 items-center justify-center rounded-md
            ${selected ? 'bg-background shadow-sm' : ''}`}
          >
            <Text
              className={`text-sm font-medium
              ${selected ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {tab.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
