import { EditLesson } from '@/app/(app)/teach/lessons/[id]/edit-lesson'

export const dynamic = 'force-dynamic'

export default async function EditLessonPage({
  params,
}: PageProps<'/teach/lessons/[id]'>) {
  const { id } = await params
  return <EditLesson id={id} />
}
