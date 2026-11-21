import { ReviewQueuePanel } from '@/app/(app)/teach/_components/content-panels'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default function TeachItemsPage() {
  return (
    <>
      <TeachHeader
        title="Ngân hàng câu hỏi"
        description="Đọc từng câu, tải ảnh Part 1, rồi duyệt hoặc loại. Học viên chỉ thấy câu đã xuất bản."
      />
      <ReviewQueuePanel exam={DEFAULT_EXAM} />
    </>
  )
}
