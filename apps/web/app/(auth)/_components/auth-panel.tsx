import type { PulsoIcon } from 'pulsoicon-react'

import { GrowingTree } from '@/components/growing-tree'
import { BookOpen, CalendarDays, Code, Dumbbell } from '@/components/icons'
import { Wordmark } from '@/components/wordmark'

/** Areas of personal growth the product is about. */
const AREAS: {
  name: string
  detail: string
  icon: PulsoIcon
  tile: string
}[] = [
  {
    name: 'Learn',
    detail: 'Languages and exams',
    icon: BookOpen,
    tile: 'bg-rose-500/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  },
  {
    name: 'Build',
    detail: 'Projects and code',
    icon: Code,
    tile: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
  },
  {
    name: 'Plan',
    detail: 'Tasks and your week',
    icon: CalendarDays,
    tile: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
  },
  {
    name: 'Train',
    detail: 'Workouts and habits',
    icon: Dumbbell,
    tile: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
  },
]

/**
 * Left half of the sign-in page (from `lg`): the product's idea, small daily gains that compound,
 * as a tree watered every day, then the areas of growth.
 */
export function AuthPanel() {
  return (
    <aside
      aria-labelledby="auth-panel-heading"
      className="relative hidden overflow-hidden border-r bg-muted/40
        lg:order-first lg:flex"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0
          bg-[radial-gradient(currentColor_1px,transparent_1px)]
          [mask-image:linear-gradient(to_top,black,transparent_85%)]
          bg-size-[20px_20px] text-foreground/15"
      />
      <div
        className="relative mx-auto flex w-full max-w-lg flex-col
          justify-between gap-12 px-12 py-10"
      >
        <Wordmark />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2
              id="auth-panel-heading"
              className="text-3xl font-medium tracking-tight text-balance"
            >
              1% better every day
            </h2>
            <p
              className="text-sm leading-relaxed text-pretty
                text-muted-foreground"
            >
              Learn, build, plan your week, train. Water it a little each day
              and it compounds: 1.01 to the power of 365 is about 37.8
            </p>
          </div>

          <GrowingTree />
        </div>

        <ul
          className="grid grid-cols-4 divide-x rounded-xl border bg-card
            shadow-xs"
        >
          {AREAS.map((area) => {
            const Icon = area.icon
            return (
              <li key={area.name} className="flex flex-col gap-3 p-4">
                <span
                  className={`flex size-8 items-center justify-center rounded-lg
                  ${area.tile}`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{area.name}</span>
                  <span
                    className="text-xs leading-relaxed text-pretty
                      text-muted-foreground"
                  >
                    {area.detail}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
