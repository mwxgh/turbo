import { ModeToggle } from '@repo/ui/components/mode-toggle'

/** Public pages (sign-in): no user menu; list them in PUBLIC_PATHS of proxy.ts. */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <ModeToggle />
      </header>
      {children}
    </>
  )
}
