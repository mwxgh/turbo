'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// Default position for every app: top right
const Toaster = ({ position = 'top-right', ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position={position}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
          // Light tinted outline per type (Tailwind palette). `!`: sonner's own
          // [data-sonner-toast][data-styled] rules are more specific than a class
          success:
            'border-green-500/40! bg-green-50! text-green-800! dark:bg-green-950! dark:text-green-200!',
          error:
            'border-red-500/40! bg-red-50! text-red-800! dark:bg-red-950! dark:text-red-200!',
          warning:
            'border-amber-500/40! bg-amber-50! text-amber-800! dark:bg-amber-950! dark:text-amber-200!',
          info: 'border-blue-500/40! bg-blue-50! text-blue-800! dark:bg-blue-950! dark:text-blue-200!',
          // sonner hard-codes #3f3f3f: follow the toast's color instead
          description: 'text-current! opacity-90',
        },
      }}
      {...props}
    />
  )
}

// Re-exported so apps call the same sonner instance the Toaster listens to
export { toast } from 'sonner'
export { Toaster }
