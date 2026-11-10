import { useForm } from '@tanstack/react-form'
import { ScrollView, Text, TextInput, View } from 'react-native'

import { ApiError } from '@repo/utils'

import { Button } from '../components/button'
import { signIn } from '../lib/session'

const FIELDS = [
  {
    name: 'login',
    label: 'Email or username',
    secure: false,
    autoComplete: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    secure: true,
    autoComplete: 'current-password',
  },
] as const

function errorText(error: unknown) {
  if (error instanceof ApiError && error.status === 401)
    return 'Wrong email / username or password'
  if (error instanceof ApiError && error.status === 429)
    return 'Too many attempts, try again in a minute'
  return 'Cannot reach the server'
}

/** Shown while signed out (Stack.Protected in _layout); signing in switches to the app. */
export default function Login() {
  const form = useForm({
    defaultValues: { login: '', password: '' },
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await signIn(value.login.trim(), value.password)
        } catch (error) {
          return errorText(error)
        }
        return undefined
      },
    },
  })

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 p-4"
      keyboardShouldPersistTaps="handled"
    >
      {FIELDS.map(({ name, label, secure, autoComplete }) => (
        <form.Field
          key={name}
          name={name}
          validators={{
            onSubmit: ({ value }) =>
              value.trim() ? undefined : `${label} is required`,
          }}
        >
          {(field) => {
            const invalid = !field.state.meta.isValid
            return (
              <View className="gap-1">
                <Text className="text-sm font-medium text-foreground">
                  {label}
                </Text>
                <TextInput
                  accessibilityLabel={label}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete={autoComplete}
                  secureTextEntry={secure}
                  className={`rounded-md border px-3 py-2.5 text-foreground
                  ${invalid ? 'border-destructive' : 'border-input'}`}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  onSubmitEditing={() => void form.handleSubmit()}
                />
                {invalid && (
                  <Text className="text-sm text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </Text>
                )}
              </View>
            )
          }}
        </form.Field>
      ))}
      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) =>
          error ? (
            <Text accessibilityRole="alert" className="text-destructive">
              {String(error)}
            </Text>
          ) : null
        }
      </form.Subscribe>
      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <Button
            label={isSubmitting ? 'Signing in…' : 'Sign in'}
            disabled={isSubmitting}
            onPress={() => void form.handleSubmit()}
          />
        )}
      </form.Subscribe>
    </ScrollView>
  )
}
