import { type ComponentRef, useRef, useState } from 'react'

import { useForm } from '@tanstack/react-form'
import { Pressable, Text, TextInput, View } from 'react-native'

import { ApiError } from '@repo/utils'

import { signIn, signUp } from '../../lib/session'
import { Button } from '../button'
import type { AuthMode } from './auth-tabs'

type TextInputRef = ComponentRef<typeof TextInput>

interface FieldSpec {
  name: string
  label: string
  secure?: boolean
  optional?: boolean
  hint?: string
  keyboard?: 'default' | 'email-address'
  autoComplete:
    'username' | 'current-password' | 'new-password' | 'email' | 'name'
  /** Checked on submit; also when leaving the field once something was typed (`onBlur`). */
  validate?: (value: string) => string | undefined
  checkOnBlur?: boolean
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

const FORMS: Record<
  AuthMode,
  { fields: FieldSpec[]; submit: string; pending: string }
> = {
  login: {
    submit: 'Sign in',
    pending: 'Signing in…',
    fields: [
      { name: 'login', label: 'Email or username', autoComplete: 'username' },
      {
        name: 'password',
        label: 'Password',
        secure: true,
        autoComplete: 'current-password',
      },
    ],
  },
  register: {
    submit: 'Create account',
    pending: 'Creating account…',
    fields: [
      { name: 'name', label: 'Name', optional: true, autoComplete: 'name' },
      {
        name: 'email',
        label: 'Email',
        keyboard: 'email-address',
        autoComplete: 'email',
        checkOnBlur: true,
        validate: (value) =>
          EMAIL.test(value.trim())
            ? undefined
            : 'Enter an email like name@example.com',
      },
      {
        name: 'password',
        label: 'Password',
        secure: true,
        autoComplete: 'new-password',
        hint: `At least ${MIN_PASSWORD} characters.`,
        checkOnBlur: true,
        validate: (value) =>
          value.length >= MIN_PASSWORD
            ? undefined
            : `Use at least ${MIN_PASSWORD} characters (${value.length} so far)`,
      },
    ],
  },
}

function errorText(mode: AuthMode, error: unknown) {
  if (error instanceof ApiError) {
    if (mode === 'login' && error.status === 401)
      return 'Wrong email / username or password'
    if (error.status === 409)
      return 'An account with this email already exists. Sign in instead.'
    if (error.status === 403)
      return 'New sign-ups are closed. Ask an administrator for an account.'
    if (error.status === 429) return 'Too many attempts, try again in a minute'
    return error.message
  }
  return 'Cannot reach the server. Check your connection and try again.'
}

const checkField = (input: FieldSpec, value: string) =>
  !value.trim()
    ? input.optional
      ? undefined
      : `Enter your ${input.label.toLowerCase()}`
    : input.validate?.(value)

/**
 * Password sign-in or sign-up; success switches the app to the signed-in screens. After a failed
 * submit the first invalid field gets focus.
 */
export function CredentialsForm({ mode }: { mode: AuthMode }) {
  const spec = FORMS[mode]
  const inputs = useRef<Record<string, TextInputRef | null>>({})
  const [revealed, setRevealed] = useState(false)

  const form = useForm({
    defaultValues: Object.fromEntries(spec.fields.map((f) => [f.name, ''])),
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          if (mode === 'login')
            await signIn(value.login!.trim(), value.password!)
          else
            await signUp({
              email: value.email!.trim(),
              password: value.password!,
              name: value.name!.trim() || undefined,
            })
        } catch (error) {
          return errorText(mode, error)
        }
        return undefined
      },
    },
  })

  async function submit() {
    await form.handleSubmit()
    if (form.state.isSubmitSuccessful) return
    const invalid = spec.fields.find(
      (f) => form.getFieldMeta(f.name)?.errors.length,
    )
    if (invalid) inputs.current[invalid.name]?.focus()
  }

  return (
    <View className="gap-4">
      {spec.fields.map((input, index) => (
        <form.Field
          key={input.name}
          name={input.name}
          validators={{
            onBlur: ({ value }) =>
              input.checkOnBlur && value ? checkField(input, value) : undefined,
            onSubmit: ({ value }) => checkField(input, value),
          }}
        >
          {(field) => {
            const invalid = !field.state.meta.isValid
            const message = field.state.meta.errors.join(', ')
            const last = index === spec.fields.length - 1
            return (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  {input.label}
                  {input.optional && (
                    <Text className="font-normal text-muted-foreground">
                      {' '}
                      (optional)
                    </Text>
                  )}
                </Text>
                <View
                  className={`min-h-12 flex-row items-center rounded-md border
                  ${invalid ? 'border-destructive' : 'border-input'}`}
                >
                  <TextInput
                    ref={(el) => {
                      inputs.current[input.name] = el
                    }}
                    accessibilityLabel={input.label}
                    // Screen readers read the error (or the hint) with the field
                    accessibilityHint={invalid ? message : input.hint}
                    autoCapitalize={input.name === 'name' ? 'words' : 'none'}
                    autoCorrect={false}
                    autoComplete={input.autoComplete}
                    keyboardType={input.keyboard ?? 'default'}
                    secureTextEntry={input.secure && !revealed}
                    returnKeyType={last ? 'go' : 'next'}
                    className="min-h-12 flex-1 px-3 text-base text-foreground"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChangeText={field.handleChange}
                    onSubmitEditing={() => {
                      const following = spec.fields[index + 1]
                      if (following) inputs.current[following.name]?.focus()
                      else void submit()
                    }}
                  />
                  {input.secure && (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Show password"
                      accessibilityState={{ checked: revealed }}
                      onPress={() => setRevealed((v) => !v)}
                      hitSlop={4}
                      className="min-h-12 min-w-14 items-center justify-center
                        px-3 active:opacity-60"
                    >
                      <Text
                        className="text-sm font-medium text-muted-foreground"
                      >
                        {revealed ? 'Hide' : 'Show'}
                      </Text>
                    </Pressable>
                  )}
                </View>
                {invalid ? (
                  <Text
                    accessibilityLiveRegion="polite"
                    className="text-sm text-destructive"
                  >
                    {message}
                  </Text>
                ) : (
                  input.hint && (
                    <Text className="text-sm text-muted-foreground">
                      {input.hint}
                    </Text>
                  )
                )}
              </View>
            )
          }}
        </form.Field>
      ))}
      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) =>
          error ? (
            <Text
              accessibilityRole="alert"
              accessibilityLiveRegion="assertive"
              className="rounded-md border border-destructive/30
                bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {String(error)}
            </Text>
          ) : null
        }
      </form.Subscribe>
      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <Button
            label={isSubmitting ? spec.pending : spec.submit}
            loading={isSubmitting}
            onPress={() => void submit()}
          />
        )}
      </form.Subscribe>
    </View>
  )
}
