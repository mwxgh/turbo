import { ChevronsRight } from '@/components/icons'

/** Product name with its mark: two chevrons, the "turbo" push forward. */
export function Wordmark() {
  return (
    <span
      className="flex shrink-0 items-center gap-2 text-base font-medium
        whitespace-nowrap"
    >
      <span
        className="flex size-7 items-center justify-center rounded-md
          bg-foreground text-background"
      >
        <ChevronsRight aria-hidden="true" className="size-4.5" />
      </span>
      Turbo Dev
    </span>
  )
}
