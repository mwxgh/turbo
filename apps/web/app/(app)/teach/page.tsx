import { DEFAULT_EXAM } from '@/lib/lingo'

import { BatchesPanel } from './_components/content-panels'
import { TeachHeader } from './_components/teach-header'
import { TeachOverview } from './_components/teach-overview'

export const dynamic = 'force-dynamic'

export default function TeachPage() {
  return (
    <>
      <TeachHeader
        title="Khu ra đề"
        description="Soạn câu hỏi, để AI sinh nội dung, duyệt và xuất bản đề cho học viên."
      />
      <TeachOverview exam={DEFAULT_EXAM} />
      <BatchesPanel />
    </>
  )
}
