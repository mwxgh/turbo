import type { Metadata } from 'next'

import { SidebarProvider, SidebarTrigger } from '@repo/ui/components/sidebar'

import { appById } from '@/lib/apps'

import { StudioNav } from './_components/studio-nav'

export const metadata: Metadata = { title: appById('studio').name }

/** Studio: learn programming, and generate a project (docs/product/studio.md). */
export default function StudioLayout({ children }: LayoutProps<'/studio'>) {
  return (
    <SidebarProvider className="min-h-0">
      <StudioNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="px-4 pt-4">
          <SidebarTrigger aria-label="Mở hoặc thu gọn menu Studio" />
        </div>
        {children}
      </div>
    </SidebarProvider>
  )
}
