'use client'

import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'

export interface AuthFieldProps {
  name: string
  label: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
  value: string
  errors: unknown[]
  onChange: (value: string) => void
  onBlur: () => void
  /** Persistent helper text under the input (replaced by the error while invalid). */
  hint?: string
  optional?: boolean
  autoFocus?: boolean
}

/**
 * Labelled input of the sign-in / sign-up forms: error and hint linked with `aria-describedby`,
 * show / hide toggle on passwords (paste and password managers keep working).
 */
export function AuthField({
  name,
  label,
  type,
  autoComplete,
  value,
  errors,
  onChange,
  onBlur,
  hint,
  optional,
  autoFocus,
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false)
  const invalid = errors.length > 0
  const errorId = `${name}-error`
  const hintId = `${name}-hint`
  const isPassword = type === 'password'

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={name}>
        {label}
        {optional && (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </FieldLabel>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={isPassword && visible ? 'text' : type}
          autoComplete={autoComplete}
          autoCapitalize={type === 'text' && name === 'name' ? 'words' : 'none'}
          autoCorrect="off"
          spellCheck={false}
          autoFocus={autoFocus}
          required={!optional}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : hint ? hintId : undefined}
          className={`h-10 ${isPassword ? 'pr-11' : ''}`}
          value={value}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            aria-label="Show password"
            aria-pressed={visible}
            aria-controls={name}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-10 cursor-pointer
              items-center justify-center rounded-r-lg text-muted-foreground
              transition-colors outline-none hover:text-foreground
              focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {visible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        )}
      </div>
      {invalid ? (
        <FieldError id={errorId}>{errors.join(', ')}</FieldError>
      ) : (
        hint && <FieldDescription id={hintId}>{hint}</FieldDescription>
      )}
    </Field>
  )
}

/**
 * After a failed submit: focus the first invalid field, else the form-level error
 * (`[data-form-error]`), so keyboard and screen reader users land on the problem.
 */
export function focusFirstProblem(form: HTMLFormElement) {
  // After React has rendered the new error state
  requestAnimationFrame(() => {
    const target =
      form.querySelector<HTMLElement>('[aria-invalid="true"]') ??
      form.querySelector<HTMLElement>('[data-form-error]')
    target?.focus()
  })
}
