import {
  GenerateCardsPanel,
  GenerateItemsPanel,
} from '@/app/(app)/teach/_components/ai-panels'
import { BatchesPanel } from '@/app/(app)/teach/_components/content-panels'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default function TeachAiPage() {
  return (
    <>
      <TeachHeader
        title="Sinh bằng AI"
        description="AI soạn câu theo Part hoặc điền thẻ từ vựng. Kết quả vào ngân hàng câu hỏi ở trạng thái nháp để bạn duyệt."
      />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <GenerateItemsPanel exam={DEFAULT_EXAM} />
        <GenerateCardsPanel exam={DEFAULT_EXAM} />
      </div>
      <BatchesPanel />
    </>
  )
}
