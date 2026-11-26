import type { PulsoIcon } from 'pulsoicon-react'

import {
  CalendarCheck,
  FilePenLine,
  FolderUp,
  Languages,
  LayoutTemplate,
  ListTodo,
  MessagesSquare,
} from '@/components/icons'

/** One app of the launcher (`/`): its card, the header label and the page title. */
export interface AppEntry {
  id: string
  name: string
  /** One sentence: what you do there. */
  description: string
  icon: PulsoIcon
  /** Icon tile colours (light / dark), one hue per app so cards are told apart at a glance. */
  tone: string
  /** `ready`: opens `href`. `soon`: shown, not clickable, with the reason. */
  status: 'ready' | 'soon'
  href: `/${string}`
  /** Shown on the launcher to admins only */
  adminOnly?: boolean
  /** Off the launcher and the sign-in page; the page still opens by URL (reference code) */
  hidden?: boolean
}

/** Launcher order. Add an app here and give it a page under `app/(app)/<href>`. */
export const APPS: AppEntry[] = [
  {
    id: 'hellos',
    name: 'Hellos',
    description:
      'Reference CRUD: list, search, filter, sort and edit records with a paginated table',
    icon: ListTodo,
    tone: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
    status: 'ready',
    href: '/hellos',
    hidden: true,
  },
  {
    id: 'chat',
    name: 'Chat',
    description:
      'Real-time rooms over Socket.IO: messages reach every signed-in browser at once',
    icon: MessagesSquare,
    tone: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
    status: 'ready',
    href: '/chat',
    hidden: true,
  },
  {
    id: 'files',
    name: 'Files',
    description:
      'Upload files straight to S3 storage with presigned requests, then remove them',
    icon: FolderUp,
    tone: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    status: 'ready',
    href: '/files',
    hidden: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    description:
      'Learn programming: roadmaps, languages, frameworks, design patterns; and generate a project',
    icon: LayoutTemplate,
    tone: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    status: 'ready',
    href: '/studio',
  },
  {
    id: 'planner',
    name: 'Planner',
    description:
      'Plan your day and month: calendar, timeline and a drag-and-drop kanban board',
    icon: CalendarCheck,
    tone: 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300',
    status: 'ready',
    href: '/planner',
  },
  {
    id: 'lingo',
    name: 'Lingo',
    description:
      'Learn languages and prepare for exams: TOEIC practice, vocabulary with spaced repetition',
    icon: Languages,
    tone: 'bg-rose-500/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
    status: 'ready',
    href: '/lingo',
  },
  {
    id: 'teach',
    name: 'Lingo Teach',
    description:
      'Write, generate with AI, review and publish Lingo tests for learners',
    icon: FilePenLine,
    tone: 'bg-rose-500/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
    status: 'ready',
    href: '/teach',
    adminOnly: true,
  },
]

/** Apps listed on the launcher (and, for a signed-out visitor, on the sign-in page). */
export const launcherApps = (isAdmin: boolean) =>
  APPS.filter((app) => !app.hidden && (!app.adminOnly || isAdmin))

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
