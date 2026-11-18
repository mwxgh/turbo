import { notFound } from 'next/navigation'

import { DEFAULT_EXAM } from '@/lib/lingo'
import { currentUser } from '@/lib/lingo'

import { AdminPanel } from './_components/admin-panel'

export const dynamic = 'force-dynamic'

/** Content management: admins only (the api enforces it too). */
export default async function LingoAdminPage() {
  const user = await currentUser()
  if (user?.role !== 'ADMIN') notFound()
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Quản trị nội dung</h1>
        <p className="text-muted-foreground">
          Nhập câu hỏi và từ vựng, duyệt trước khi người học thấy.
        </p>
      </div>
      <AdminPanel exam={DEFAULT_EXAM} />
    </main>
  )
}
