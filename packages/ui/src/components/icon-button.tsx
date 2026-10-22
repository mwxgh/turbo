'use client'

import { type ComponentProps, type ReactElement, cloneElement } from 'react'

import { Button } from '@repo/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/tooltip'

export interface IconButtonProps extends ComponentProps<typeof Button> {
  /** Accessible name and tooltip text. */
  label: string
  /** Element the tooltip trigger renders instead of the Button (e.g. a menu trigger). */
  render?: ReactElement<{ render?: ReactElement }>
}

/** Icon-only button whose label is both its accessible name and its tooltip. */
export function IconButton({
  label,
  render,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: IconButtonProps) {
  const button = (
    <Button variant={variant} size={size} aria-label={label} {...props} />
  )
  return (
    <Tooltip>
      <TooltipTrigger
        render={render ? cloneElement(render, { render: button }) : button}
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
