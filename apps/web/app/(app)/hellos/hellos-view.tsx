'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

import { HelloForm } from './hello-form'
import { HellosTable } from './hellos-table'
import { useHelloActions } from './use-hello-mutations'

/** Client part of /hellos: create form + the list (prefetched on the server). */
export function HellosView() {
  const actions = useHelloActions()

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Hellos</h1>
      <Card>
        <CardHeader>
          <CardTitle>New hello</CardTitle>
        </CardHeader>
        <CardContent>
          <HelloForm
            action={actions.create}
            submitLabel="Add"
            inputLabel="New hello"
            placeholder="New hello…"
          />
        </CardContent>
      </Card>
      <HellosTable />
    </>
  )
}
