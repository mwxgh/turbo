import { useForm } from '@tanstack/react-form'
import { Text, TextInput, View } from 'react-native'

import type { Hello } from '@repo/types'

import { Button } from './button'

/** Body of POST /hellos (PATCH accepts any subset). */
export type HelloInput = Pick<Hello, 'message'>

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
  /** Rejects with the API error; the mutation already toasts it. */
  onSubmit: (input: HelloInput) => Promise<unknown>
  defaultMessage?: string
  submitLabel: string
  placeholder?: string
  autoFocus?: boolean
  /** Called after a successful submit (e.g. close the inline editor). */
  onSuccess?: () => void
  onCancel?: () => void
}

export function HelloForm({
  onSubmit,
  defaultMessage = '',
  submitLabel,
  placeholder,
  autoFocus,
  onSuccess,
  onCancel,
}: HelloFormProps) {
  const form = useForm({
    defaultValues: { message: defaultMessage },
    onSubmit: async ({ value, formApi }) => {
      try {
        await onSubmit({ message: value.message.trim() })
      } catch {
        return // the mutation already toasted the API error
      }
      if (!defaultMessage) formApi.reset()
      onSuccess?.()
    },
  })

  return (
    <View className="gap-2">
      <form.Field
        name="message"
        validators={{ onChange: ({ value }) => validateMessage(value) }}
      >
        {(field) => {
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <View className="gap-1">
              <TextInput
                accessibilityLabel={submitLabel}
                className={`rounded-md border px-3 py-2.5 text-foreground
                placeholder:text-muted-foreground
                ${invalid ? 'border-destructive' : 'border-input'}`}
                placeholder={placeholder}
                autoFocus={autoFocus}
                maxLength={MESSAGE_MAX}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                onSubmitEditing={() => void form.handleSubmit()}
                returnKeyType="done"
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
      <View className="flex-row justify-end gap-2">
        {onCancel && (
          <Button label="Cancel" variant="ghost" onPress={onCancel} />
        )}
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              label={submitLabel}
              disabled={!canSubmit || isSubmitting}
              onPress={() => void form.handleSubmit()}
            />
          )}
        </form.Subscribe>
      </View>
    </View>
  )
}
