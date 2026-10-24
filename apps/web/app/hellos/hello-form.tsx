'use client'

import { useForm } from '@tanstack/react-form'

import { Button } from '@repo/ui/components/button'
import { Field, FieldError } from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'

import type { ActionState, HelloInput } from '../../lib/types'

export const MESSAGE_MAX = 255

/** Client-side rules (instant feedback); the API DTO stays the source of truth. */
export function validateMessage(value: string): string | undefined {
  const message = value.trim()
  if (!message) return 'Message is required'
  if (message.length > MESSAGE_MAX)
    return `Message must be at most ${MESSAGE_MAX} characters`
  return undefined
}

export interface HelloFormProps {
  /** Server action; returned `errors` are shown on the form. */
  action: (input: HelloInput) => Promise<ActionState>
  defaultMessage?: string
  submitLabel: string
  inputLabel: string
  placeholder?: string
  autoFocus?: boolean
  /** Called after a successful submit (e.g. close the inline editor). */
  onSuccess?: () => void
  onCancel?: () => void
}

export function HelloForm({
  action,
  defaultMessage = '',
  submitLabel,
  inputLabel,
  placeholder,
  autoFocus,
  onSuccess,
  onCancel,
}: HelloFormProps) {
  const form = useForm({
    defaultValues: { message: defaultMessage },
    validators: {
      // API errors (DTO validation, 404…) become form-level errors
      onSubmitAsync: async ({ value }) => {
        const res = await action({ message: value.message.trim() })
        return res.errors?.join(', ')
      },
    },
    onSubmit: ({ formApi }) => {
      if (!defaultMessage) formApi.reset()
      onSuccess?.()
    },
  })

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      <div className="flex items-start gap-2">
        <form.Field
          name="message"
          validators={{ onChange: ({ value }) => validateMessage(value) }}
        >
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={invalid} className="flex-1">
                <Input
                  name={field.name}
                  aria-label={inputLabel}
                  aria-invalid={invalid}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {invalid && (
                  <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
                )}
              </Field>
            )
          }}
        </form.Field>
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {submitLabel}
            </Button>
          )}
        </form.Subscribe>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) =>
          error ? (
            <p role="alert" className="text-sm text-destructive">
              {String(error)}
            </p>
          ) : null
        }
      </form.Subscribe>
    </form>
  )
}
