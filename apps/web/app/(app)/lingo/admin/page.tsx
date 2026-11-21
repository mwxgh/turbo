import { permanentRedirect } from 'next/navigation'

/** Old address of the content tools: they moved to the teacher site. */
export default function LingoAdminPage() {
  permanentRedirect('/teach')
}
