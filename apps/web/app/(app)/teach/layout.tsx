import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { currentUser } from '@/lib/lingo'

import { TeachNav } from './_components/teach-nav'

export const metadata: Metadata = { title: 'Lingo · Ra đề' }

/** Teacher site: write, generate, review and publish tests. Admins only (the api enforces it too). */
export default async function TeachLayout({ children }: LayoutProps<'/teach'>) {
  const user = await currentUser()
  if (user?.role !== 'ADMIN') notFound()
  return (
    <div
      className="mx-auto grid w-full max-w-7xl lg:grid-cols-[15rem_1fr]
        lg:gap-6"
    >
      <TeachNav />
      <main className="flex min-w-0 flex-col gap-8 px-4 py-8 sm:py-10">
        {children}
      </main>
    </div>
  )
}
