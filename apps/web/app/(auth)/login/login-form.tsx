'use client'

import { useForm } from '@tanstack/react-form'

import type { AuthResponse } from '@repo/types'

import {
  AuthField,
  focusFirstProblem,
} from '@/app/(auth)/_components/auth-field'
import { FormError, SubmitButton } from '@/app/(auth)/_components/submit-button'
import { ApiError, apiFetch } from '@/lib/api'

const required = (label: string) => (value: string) =>
  value.trim() ? undefined : `Enter your ${label.toLowerCase()}`

/** Email or username + password; the api sets the session cookies. */
export function LoginForm({ next }: { next: string }) {
  const form = useForm({
    defaultValues: { login: '', password: '' },
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await apiFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              login: value.login.trim(),
              password: value.password,
            }),
          })
        } catch (error) {
          if (error instanceof ApiError && error.status === 401)
            return 'Wrong email / username or password'
          if (error instanceof ApiError && error.status === 429)
            return 'Too many attempts, try again in a minute'
          return error instanceof Error ? error.message : 'Sign-in failed'
        }
        return undefined
      },
    },
    // Full load: server components render with the new cookies, caches start empty
    onSubmit: () => window.location.assign(next),
  })

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        const element = event.currentTarget
        void form.handleSubmit().then(() => {
          if (!form.state.isSubmitSuccessful) focusFirstProblem(element)
        })
      }}
    >
      {(
        [
          {
            name: 'login',
            label: 'Email or username',
            type: 'text',
            autoComplete: 'username',
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            autoComplete: 'current-password',
          },
        ] as const
      ).map((input) => (
        <form.Field
          key={input.name}
          name={input.name}
          validators={{ onSubmit: ({ value }) => required(input.label)(value) }}
        >
          {(field) => (
            <AuthField
              {...input}
              autoFocus={input.name === 'login'}
              value={field.state.value}
              errors={field.state.meta.errors}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
            />
          )}
        </form.Field>
      ))}
      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) => (error ? <FormError message={String(error)} /> : null)}
      </form.Subscribe>
      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(pending) => (
          <SubmitButton
            pending={pending}
            label="Sign in"
            pendingLabel="Signing in…"
          />
        )}
      </form.Subscribe>
    </form>
  )
}
