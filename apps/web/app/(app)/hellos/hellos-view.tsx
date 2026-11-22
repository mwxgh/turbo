'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

import { appById } from '@/lib/apps'

import { HelloForm } from './hello-form'
import { HellosTable } from './hellos-table'
import { useHelloActions } from './use-hello-mutations'

const app = appById('hellos')

/** Client part of /hellos: create form + the list (prefetched on the server). */
export function HellosView() {
  const actions = useHelloActions()

  return (
    <>
      <div className="mb-2 flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">{app.name}</h1>
        <p className="text-pretty text-muted-foreground">{app.description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New hello</CardTitle>
        </CardHeader>
        <CardContent>
          <HelloForm
            action={actions.create}
            submitLabel="Add"
            inputLabel="New hello"
            placeholder="Write a message"
          />
        </CardContent>
      </Card>
      <HellosTable />
    </>
  )
}
