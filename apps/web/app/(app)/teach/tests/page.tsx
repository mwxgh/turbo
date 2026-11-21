import { GenerateTestPanel } from '@/app/(app)/teach/_components/ai-panels'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import {
  AssembleTestPanel,
  TestsListPanel,
} from '@/app/(app)/teach/_components/tests-panel'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default function TeachTestsPage() {
  return (
    <>
      <TeachHeader
        title="Bộ đề"
        description="Ghép đề từ câu đã duyệt hoặc để AI sinh trọn bộ, rồi xem lại và xuất bản cho học viên."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <AssembleTestPanel exam={DEFAULT_EXAM} />
        <GenerateTestPanel exam={DEFAULT_EXAM} />
      </div>
      <TestsListPanel />
    </>
  )
}
