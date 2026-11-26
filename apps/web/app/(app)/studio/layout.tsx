import type { Metadata } from 'next'

import { appById } from '@/lib/apps'

import { StudioNav } from './_components/studio-nav'

export const metadata: Metadata = { title: appById('studio').name }

/** Studio: learn programming, and generate a project (docs/product/studio.md). */
export default function StudioLayout({ children }: LayoutProps<'/studio'>) {
  return (
    <div className="flex flex-col">
      <StudioNav />
      {children}
    </div>
  )
}
