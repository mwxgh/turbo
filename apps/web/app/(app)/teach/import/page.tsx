import {
  ImportCardsPanel,
  ImportItemsPanel,
} from '@/app/(app)/teach/_components/content-panels'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default function TeachImportPage() {
  return (
    <>
      <TeachHeader
        title="Nhập dữ liệu"
        description="Nhập câu hỏi từ JSON, từ vựng từ CSV"
      />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <ImportItemsPanel exam={DEFAULT_EXAM} />
        <ImportCardsPanel exam={DEFAULT_EXAM} />
      </div>
    </>
  )
}
