import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { describe, expect, it, vi } from 'vitest'

import {
  DataTable,
  actionsColumn,
  dataTableColumns,
  useListTable,
} from '@repo/ui/components/data-table'
import { type ListQuery, paginated } from '@repo/utils'

interface Person {
  id: string
  name: string
  role: string
  age: number
  createdAt: string
}

const onAction = vi.fn<(action: string, id: string) => void>()
const col = dataTableColumns<Person>()
// One prop per column decides what the table offers for it
const columns = col.columns([
  col.accessor('name', {
    header: 'Name',
    enableSorting: true,
    meta: { filterVariant: 'text' },
  }),
  col.accessor('role', {
    header: 'Role',
    meta: { filterVariant: 'select', filterOptions: ['ADMIN', 'USER'] },
  }),
  col.accessor('createdAt', {
    header: 'Created',
    meta: { filterVariant: 'dateRange' },
  }),
  col.accessor('age', { header: 'Age' }),
  // Row actions: Edit everywhere, Delete only for non-admins
  actionsColumn<Person>((person) => [
    { label: 'Edit', icon: '✎', onClick: () => onAction('edit', person.id) },
    person.role !== 'ADMIN' && {
      label: 'Delete',
      icon: '🗑',
      variant: 'destructive',
      onClick: () => onAction('delete', person.id),
    },
  ]),
])

const people: Person[] = [
  { id: '1', name: 'Alice', role: 'ADMIN', age: 25, createdAt: '2026-10-01' },
  { id: '2', name: 'Bob', role: 'USER', age: 40, createdAt: '2026-10-02' },
]

function setup(search = '', fail = false) {
  // The API: 45 rows → 3 pages of 20
  const fetchPeople = vi.fn((query: ListQuery) =>
    fail
      ? Promise.reject(new Error('down'))
      : Promise.resolve(paginated(people, 45, query)),
  )
  function PeopleTable() {
    const list = useListTable({
      columns,
      listQuery: (query) => ({
        queryKey: ['people', query],
        queryFn: () => fetchPeople(query),
      }),
      getRowId: (person) => person.id,
    })
    return <DataTable list={list} searchPlaceholder="Search people" />
  }
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <NuqsTestingAdapter searchParams={search} hasMemory>
        <PeopleTable />
      </NuqsTestingAdapter>
    </QueryClientProvider>,
  )
  /** Query of the most recent API call. */
  const lastQuery = () => fetchPeople.mock.lastCall?.[0]
  return { fetchPeople, lastQuery }
}

describe('DataTable + useListTable', () => {
  it('offers sorting and filters only where a column opts in', async () => {
    setup()
    expect(await screen.findByText('Alice')).toBeInTheDocument()

    const header = screen.getAllByRole('row')[0]!
    expect(within(header).getByRole('button', { name: /Name/ })).toBeVisible()
    expect(within(header).queryByRole('button', { name: /Age/ })).toBeNull()

    expect(screen.getByLabelText('Search')).toBeVisible()
    expect(screen.getByLabelText('Name')).toBeVisible()
    expect(screen.getByLabelText('Role')).toBeVisible()
    expect(screen.getByLabelText('Created from')).toBeVisible()
    expect(screen.queryByLabelText('Age')).toBeNull()
    expect(screen.getByText('Showing 1–20 of 45')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('reads the initial query from the URL', async () => {
    const { lastQuery } = setup(
      '?page=2&sortBy=name&sortDir=desc&keyword=al&filter={"role":"ADMIN"}',
    )
    await screen.findByText('Alice')
    expect(lastQuery()).toEqual({
      page: 2,
      pageSize: 20,
      sortBy: 'name',
      sortDir: 'desc',
      keyword: 'al',
      filter: { role: 'ADMIN' },
    })
    expect(screen.getByLabelText('Search')).toHaveValue('al')
  })

  it('sorts on the server: asc → desc → API default', async () => {
    const { lastQuery } = setup('?page=3')
    await screen.findByText('Alice')
    const sortName = () => screen.getByRole('button', { name: /Name/ })

    await userEvent.click(sortName())
    await waitFor(() =>
      expect(lastQuery()).toMatchObject({
        sortBy: 'name',
        sortDir: 'asc',
        page: 1,
      }),
    )
    await userEvent.click(sortName())
    await waitFor(() => expect(lastQuery()).toMatchObject({ sortDir: 'desc' }))
    await userEvent.click(sortName())
    await waitFor(() => expect(lastQuery()?.sortBy).toBeUndefined())
  })

  it('debounces text filters and the keyword into one request', async () => {
    const { fetchPeople, lastQuery } = setup()
    await screen.findByText('Alice')
    const calls = fetchPeople.mock.calls.length

    await userEvent.type(screen.getByLabelText('Name'), 'ali')
    await waitFor(() =>
      expect(lastQuery()?.filter).toEqual({ name: { contains: 'ali' } }),
    )
    expect(fetchPeople.mock.calls.length).toBe(calls + 1)

    await userEvent.type(screen.getByLabelText('Search'), 'bob')
    await waitFor(() => expect(lastQuery()?.keyword).toBe('bob'))
  })

  it('filters by a select option and clears it with "All"', async () => {
    const { lastQuery } = setup()
    await screen.findByText('Alice')

    await userEvent.click(screen.getByLabelText('Role'))
    await userEvent.click(await screen.findByRole('option', { name: 'ADMIN' }))
    await waitFor(() => expect(lastQuery()?.filter).toEqual({ role: 'ADMIN' }))

    await userEvent.click(screen.getByLabelText('Role'))
    await userEvent.click(await screen.findByRole('option', { name: 'All' }))
    await waitFor(() => expect(lastQuery()?.filter).toBeUndefined())
  })

  it('picks dates as dd/mm/yyyy, clears them and resets everything', async () => {
    vi.useFakeTimers({ toFake: ['Date'] }) // calendar opens on Oct 2026
    vi.setSystemTime(new Date(2026, 9, 20))
    const { lastQuery } = setup(
      '?keyword=x&filter={"createdAt":{"from":"2026-10-01"}}',
    )
    await screen.findByText('Alice')
    expect(screen.getByLabelText('Created from')).toHaveTextContent(
      '01/10/2026',
    )
    expect(screen.getByLabelText('Created to')).toHaveTextContent('dd/mm/yyyy')

    await userEvent.click(screen.getByLabelText('Created to'))
    await userEvent.click(
      within(await screen.findByRole('grid')).getByText('15'),
    )
    await waitFor(() =>
      expect(lastQuery()?.filter).toEqual({
        createdAt: { from: '2026-10-01', to: '2026-10-15' },
      }),
    )
    expect(screen.getByLabelText('Created to')).toHaveTextContent('15/10/2026')

    // × on the "from" picker drops only that bound
    await userEvent.click(
      screen.getAllByRole('button', { name: 'Clear date' })[0]!,
    )
    await waitFor(() =>
      expect(lastQuery()?.filter).toEqual({ createdAt: { to: '2026-10-15' } }),
    )

    await userEvent.click(screen.getByRole('button', { name: /Reset/ }))
    await waitFor(() => {
      expect(lastQuery()?.filter).toBeUndefined()
      expect(lastQuery()?.keyword).toBeUndefined()
    })
    expect(screen.getByLabelText('Created to')).toHaveTextContent('dd/mm/yyyy')
    expect(screen.getByRole('button', { name: /Reset/ })).toBeDisabled()
    vi.useRealTimers()
  })

  it('toolbar: active count, hide the panel, hide columns, refresh', async () => {
    const { fetchPeople } = setup('?keyword=al&filter={"role":"ADMIN"}')
    await screen.findByText('Alice')

    // Icon buttons: the label is the accessible name and the tooltip
    const toggle = screen.getByRole('button', { name: 'Hide filters' })
    expect(toggle).toHaveTextContent('2') // keyword + role
    await userEvent.hover(screen.getByRole('button', { name: 'Reset filters' }))
    expect(await screen.findByText('Reset filters')).toBeVisible()

    await userEvent.click(toggle)
    expect(screen.queryByLabelText('Search')).toBeNull()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAccessibleName('Show filters')

    await userEvent.click(screen.getByRole('button', { name: /Columns/ }))
    await userEvent.click(
      await screen.findByRole('menuitemcheckbox', { name: 'Age' }),
    )
    expect(screen.queryByRole('columnheader', { name: 'Age' })).toBeNull()
    expect(screen.queryByText('25')).toBeNull()

    const calls = fetchPeople.mock.calls.length
    await userEvent.click(screen.getByRole('button', { name: 'Refresh' }))
    await waitFor(() => expect(fetchPeople.mock.calls.length).toBe(calls + 1))
  })

  it('paginates on the server: numbers, next/last, rows per page', async () => {
    const { lastQuery } = setup()
    await screen.findByText('Alice')
    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    await waitFor(() => expect(lastQuery()?.page).toBe(2))
    expect(await screen.findByText('Showing 21–40 of 45')).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: 'Last page' }))
    await waitFor(() => expect(lastQuery()?.page).toBe(3))
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Page 1' }))
    await waitFor(() => expect(lastQuery()?.page).toBe(1))

    // Bigger pages start again from page 1
    await userEvent.click(screen.getByRole('button', { name: 'Page 2' }))
    await userEvent.click(screen.getByLabelText('Rows per page'))
    await userEvent.click(await screen.findByRole('option', { name: '50' }))
    await waitFor(() =>
      expect(lastQuery()).toMatchObject({ page: 1, pageSize: 50 }),
    )
    expect(screen.getByText('Showing 1–45 of 45')).toBeVisible()
  })

  it('opens row actions from a ⋯ menu in one Actions column', async () => {
    setup()
    const alice = await screen.findByRole('row', { name: /Alice/ })
    const bob = screen.getByRole('row', { name: /Bob/ })
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeVisible()

    // `false` leaves an action out of that row's menu
    await userEvent.click(
      within(alice).getByRole('button', { name: 'Row actions' }),
    )
    expect(await screen.findByRole('menuitem', { name: /Edit/ })).toBeVisible()
    expect(screen.queryByRole('menuitem', { name: /Delete/ })).toBeNull()
    await userEvent.click(screen.getByRole('menuitem', { name: /Edit/ }))
    expect(onAction).toHaveBeenLastCalledWith('edit', '1')

    await userEvent.click(
      within(bob).getByRole('button', { name: 'Row actions' }),
    )
    const remove = await screen.findByRole('menuitem', { name: /Delete/ })
    expect(remove).toHaveAttribute('data-variant', 'destructive')
    expect(remove).toHaveTextContent('🗑') // icon + label
    await userEvent.click(remove)
    expect(onAction).toHaveBeenLastCalledWith('delete', '2')

    // Not hideable: the Columns menu lists data columns only
    await userEvent.click(screen.getByRole('button', { name: 'Columns' }))
    expect(
      await screen.findByRole('menuitemcheckbox', { name: 'Age' }),
    ).toBeVisible()
    expect(
      screen.queryByRole('menuitemcheckbox', { name: 'Actions' }),
    ).toBeNull()
  })

  it('shows a retry when the API fails', async () => {
    const { fetchPeople } = setup('', true)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not load data.',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(fetchPeople).toHaveBeenCalledTimes(2))
  })
})
