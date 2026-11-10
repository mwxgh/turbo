'use client'

import { useForm } from '@tanstack/react-form'

import type { AuthResponse } from '@repo/types'
import { Button } from '@repo/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Field, FieldError, FieldLabel } from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'

import { ApiError, apiFetch } from '../../lib/api'

const required = (label: string) => (value: string) =>
  value.trim() ? undefined : `${label} is required`

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
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>With your email or username.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit()
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
          ).map(({ name, label, type, autoComplete }) => (
            <form.Field
              key={name}
              name={name}
              validators={{ onSubmit: ({ value }) => required(label)(value) }}
            >
              {(field) => {
                const invalid = !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={type}
                      autoComplete={autoComplete}
                      autoFocus={name === 'login'}
                      aria-invalid={invalid}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {invalid && (
                      <FieldError>
                        {field.state.meta.errors.join(', ')}
                      </FieldError>
                    )}
                  </Field>
                )
              }}
            </form.Field>
          ))}
          <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
            {(error) =>
              error ? (
                <p role="alert" className="text-sm text-destructive">
                  {String(error)}
                </p>
              ) : null
            }
          </form.Subscribe>
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  )
}
