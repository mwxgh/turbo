import '../global.css'

import { useEffect } from 'react'

import { QueryClientProvider, focusManager } from '@tanstack/react-query'
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AppState, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from 'sonner-native'

import { queryClient } from '../lib/query-client'
import { loadSession, useSessionStatus } from '../lib/session'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const session = useSessionStatus()

  useEffect(() => {
    void loadSession()
  }, [])

  // Refetch stale queries when the app comes back to the foreground
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) =>
      focusManager.setFocused(state === 'active'),
    )
    return () => sub.remove()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          {/* Nothing until the saved tokens are read (no login screen flash) */}
          {session !== 'loading' && (
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: 'transparent' },
              }}
            >
              <Stack.Protected guard={session === 'signedIn'}>
                <Stack.Screen
                  name="index"
                  options={{ title: 'Turborepo base' }}
                />
                <Stack.Screen name="hellos" options={{ title: 'Hellos' }} />
              </Stack.Protected>
              <Stack.Protected guard={session === 'signedOut'}>
                <Stack.Screen name="login" options={{ title: 'Sign in' }} />
              </Stack.Protected>
            </Stack>
          )}
          <StatusBar style="auto" />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
