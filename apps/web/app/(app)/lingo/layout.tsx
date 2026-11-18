import type { Metadata } from 'next'

import { appById } from '@/lib/apps'
import { currentUser } from '@/lib/lingo'

import { LingoNav } from './_components/lingo-nav'

export const metadata: Metadata = { title: appById('lingo').name }

export default async function LingoLayout({ children }: LayoutProps<'/lingo'>) {
  const user = await currentUser()
  return (
    <div className="flex flex-col">
      <LingoNav isAdmin={user?.role === 'ADMIN'} />
      {children}
    </div>
  )
}
