import { ModeToggle } from '@repo/ui/components/mode-toggle'

/** Public pages (sign-in): no user menu; list them in PUBLIC_PATHS of proxy.ts. */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="flex items-center justify-end gap-4 px-4 pt-4">
        <ModeToggle />
      </header>
      {children}
    </>
  )
}
