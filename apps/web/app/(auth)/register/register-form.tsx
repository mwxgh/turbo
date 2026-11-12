'use client'

import { useForm } from '@tanstack/react-form'

import type { AuthResponse } from '@repo/types'

import {
  AuthField,
  focusFirstProblem,
} from '@/app/(auth)/_components/auth-field'
import { FormError, SubmitButton } from '@/app/(auth)/_components/submit-button'
import { ApiError, apiFetch } from '@/lib/api'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

const checkEmail = (value: string) =>
  !value.trim()
    ? 'Enter your email'
    : EMAIL.test(value.trim())
      ? undefined
      : 'Enter an email like name@example.com'

const checkPassword = (value: string) =>
  value.length >= MIN_PASSWORD
    ? undefined
    : `Use at least ${MIN_PASSWORD} characters (${value.length} so far)`

/** Name (optional), email and password; the api signs the new user in (session cookies). */
export function RegisterForm({ next }: { next: string }) {
  const form = useForm({
    defaultValues: { name: '', email: '', password: '' },
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await apiFetch<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              name: value.name.trim() || undefined,
              email: value.email.trim(),
              password: value.password,
            }),
          })
        } catch (error) {
          if (error instanceof ApiError && error.status === 409)
            return 'An account with this email already exists. Sign in instead.'
          if (error instanceof ApiError && error.status === 403)
            return 'New sign-ups are closed. Ask an administrator for an account.'
          if (error instanceof ApiError && error.status === 429)
            return 'Too many attempts, try again in a minute'
          return error instanceof Error ? error.message : 'Sign-up failed'
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
      <form.Field name="name">
        {(field) => (
          <AuthField
            name="name"
            label="Name"
            type="text"
            autoComplete="name"
            optional
            autoFocus
            value={field.state.value}
            errors={field.state.meta.errors}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      {/* Validated when leaving the field, then again on submit */}
      <form.Field
        name="email"
        validators={{
          onBlur: ({ value }) => (value ? checkEmail(value) : undefined),
          onSubmit: ({ value }) => checkEmail(value),
        }}
      >
        {(field) => (
          <AuthField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={field.state.value}
            errors={field.state.meta.errors}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      <form.Field
        name="password"
        validators={{
          onBlur: ({ value }) => (value ? checkPassword(value) : undefined),
          onSubmit: ({ value }) => checkPassword(value),
        }}
      >
        {(field) => (
          <AuthField
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            hint={`At least ${MIN_PASSWORD} characters.`}
            value={field.state.value}
            errors={field.state.meta.errors}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) => (error ? <FormError message={String(error)} /> : null)}
      </form.Subscribe>
      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(pending) => (
          <SubmitButton
            pending={pending}
            label="Create account"
            pendingLabel="Creating account…"
          />
        )}
      </form.Subscribe>
    </form>
  )
}
