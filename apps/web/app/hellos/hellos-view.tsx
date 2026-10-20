'use client'

import { useQuery } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

import { hellosListQueryOptions } from '../../lib/queries/hellos'
import { HelloForm } from './hello-form'
import { HellosTable } from './hellos-table'
import { useHelloActions } from './use-hello-mutations'

/** Client part of /hellos: list from the Query cache (prefetched on the server). */
export function HellosView() {
  const { data, isError, refetch } = useQuery(hellosListQueryOptions())
  const actions = useHelloActions()

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Hellos ({data?.total ?? '…'})
      </h1>
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
      {isError ? (
        <p role="alert" className="text-sm text-destructive">
          Could not load hellos.{' '}
          <button type="button" className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : (
        <HellosTable hellos={data?.items ?? []} />
      )}
    </>
  )
}
