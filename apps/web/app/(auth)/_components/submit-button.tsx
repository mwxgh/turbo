'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@repo/ui/components/button'

/** The form's single primary action; disabled with a spinner while the request runs. */
export function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean
  label: string
  pendingLabel: string
}) {
  return (
    <Button
      type="submit"
      size="lg"
      className="h-10 w-full cursor-pointer"
      disabled={pending}
    >
      {pending && (
        <Loader2
          aria-hidden="true"
          className="animate-spin motion-reduce:animate-none"
        />
      )}
      {pending ? pendingLabel : label}
    </Button>
  )
}

/** Form-level error (wrong password, network…): announced, and focused after a failed submit. */
export function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      tabIndex={-1}
      data-form-error
      className="rounded-lg border border-destructive/30 bg-destructive/10 px-3
        py-2 text-sm text-destructive outline-none focus-visible:ring-3
        focus-visible:ring-destructive/30"
    >
      {message}
    </p>
  )
}
