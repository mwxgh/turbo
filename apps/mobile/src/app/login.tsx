import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { enabledSignInProviders, oauthErrorMessage } from '@repo/utils'

import { type AuthMode, AuthTabs } from '../components/auth/auth-tabs'
import { CredentialsForm } from '../components/auth/credentials-form'
import { ProviderIcon } from '../components/auth/provider-icon'
import { Button } from '../components/button'
import { OAuthSignInError, signInWithProvider } from '../lib/oauth'
import { authMethodsQueryOptions } from '../lib/queries/auth-methods'

const COPY: Record<AuthMode, { title: string; description: string }> = {
  login: { title: 'Welcome back', description: 'Sign in to continue.' },
  register: {
    title: 'Create your account',
    description: 'It takes less than a minute.',
  },
}

/**
 * Shown while signed out (Stack.Protected in _layout); signing in switches to the app. Providers
 * run in the system browser, so the Expo web build shows the password form only.
 */
export default function Login() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [providerError, setProviderError] = useState<string>()
  const [pendingProvider, setPendingProvider] = useState<string>()
  const { data: methods } = useQuery(authMethodsQueryOptions())

  const providers =
    Platform.OS === 'web'
      ? []
      : enabledSignInProviders(methods?.providers ?? [])
  const current = methods?.registration ? mode : 'login'
  const verb = current === 'login' ? 'Continue' : 'Sign up'

  async function withProvider(id: string) {
    setProviderError(undefined)
    setPendingProvider(id)
    try {
      await signInWithProvider(id)
    } catch (error) {
      setProviderError(
        oauthErrorMessage(
          error instanceof OAuthSignInError ? error.code : 'provider_error',
        ),
      )
    } finally {
      setPendingProvider(undefined)
    }
  }

  return (
    // The stack header covers the top inset; keep the form clear of the home indicator
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: current === 'login' ? 'Sign in' : 'Create account' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 bg-background"
          contentContainerClassName="w-full max-w-md grow justify-center
            gap-6 self-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View className="items-center gap-1.5">
            <Text
              accessibilityRole="header"
              className="text-2xl font-semibold text-foreground"
            >
              {COPY[current].title}
            </Text>
            <Text className="text-base text-muted-foreground">
              {COPY[current].description}
            </Text>
          </View>

          {methods?.registration && (
            <AuthTabs
              mode={current}
              onChange={(next) => {
                setProviderError(undefined)
                setMode(next)
              }}
            />
          )}

          {providerError && (
            <Text
              accessibilityRole="alert"
              accessibilityLiveRegion="assertive"
              className="rounded-md border border-destructive/30
                bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {providerError}
            </Text>
          )}

          {providers.length > 0 && (
            <>
              <View className="gap-2.5">
                {providers.map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    icon={<ProviderIcon provider={provider} />}
                    label={`${verb} with ${provider.label}`}
                    loading={pendingProvider === provider.id}
                    disabled={
                      pendingProvider !== undefined &&
                      pendingProvider !== provider.id
                    }
                    onPress={() => void withProvider(provider.id)}
                  />
                ))}
              </View>
              <View
                className="flex-row items-center gap-3"
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden
              >
                <View className="h-px flex-1 bg-border" />
                <Text className="text-xs text-muted-foreground">
                  or with email
                </Text>
                <View className="h-px flex-1 bg-border" />
              </View>
            </>
          )}

          {/* key: switching tabs starts a fresh form */}
          <CredentialsForm key={current} mode={current} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
