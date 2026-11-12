import {
  FolderUp,
  LayoutTemplate,
  ListTodo,
  type LucideIcon,
  MessagesSquare,
} from 'lucide-react'

/** One app of the launcher (`/`): its card, the header label and the page title. */
export interface AppEntry {
  id: string
  name: string
  /** One sentence: what you do there. */
  description: string
  icon: LucideIcon
  /** Icon tile colours (light / dark), one hue per app so cards are told apart at a glance. */
  tone: string
  /** `ready`: opens `href`. `soon`: shown, not clickable, with the reason. */
  status: 'ready' | 'soon'
  href: `/${string}`
}

/** Launcher order. Add an app here and give it a page under `app/(app)/<href>`. */
export const APPS: AppEntry[] = [
  {
    id: 'hellos',
    name: 'Hellos',
    description:
      'Reference CRUD: list, search, filter, sort and edit records with a paginated table.',
    icon: ListTodo,
    tone: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
    status: 'ready',
    href: '/hellos',
  },
  {
    id: 'chat',
    name: 'Chat',
    description:
      'Real-time rooms over Socket.IO: messages reach every signed-in browser at once.',
    icon: MessagesSquare,
    tone: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
    status: 'ready',
    href: '/chat',
  },
  {
    id: 'files',
    name: 'Files',
    description:
      'Upload files straight to S3 storage with presigned requests, then remove them.',
    icon: FolderUp,
    tone: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    status: 'ready',
    href: '/files',
  },
  {
    id: 'studio',
    name: 'Studio',
    description:
      'Design admin screens from a spec, preview them and export working apps.',
    icon: LayoutTemplate,
    tone: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    status: 'soon',
    href: '/studio',
  },
]

/** The app a path belongs to (`/chat`, `/hellos?page=2` …), for the header. */
export const appOf = (pathname: string) =>
  APPS.find(
    (app) => pathname === app.href || pathname.startsWith(`${app.href}/`),
  )

export function appById(id: string): AppEntry {
  const app = APPS.find((entry) => entry.id === id)
  if (!app) throw new Error(`Unknown app "${id}"`)
  return app
}
