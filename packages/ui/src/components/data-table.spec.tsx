import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DataTable, dataTableColumns } from '@repo/ui/components/data-table'

interface Person {
  id: string
  name: string
  age: number
}

const col = dataTableColumns<Person>()
const columns = col.columns([
  col.accessor('name', { header: 'Name', sortFn: 'alphanumeric' }),
  col.accessor('age', { header: 'Age' }),
  col.display({ id: 'actions', header: 'Actions', cell: () => 'edit' }),
])
const people: Person[] = [
  { id: '1', name: 'Charlie', age: 30 },
  { id: '2', name: 'alice', age: 25 },
  { id: '3', name: 'Bob', age: 40 },
]

const bodyNames = () =>
  screen
    .getAllByRole('row')
    .slice(1) // header row
    .map((row) => within(row).getAllByRole('cell')[0]?.textContent)

describe('DataTable', () => {
  it('renders headers, rows and display columns', () => {
    render(<DataTable columns={columns} data={people} getRowId={(p) => p.id} />)
    expect(screen.getByRole('button', { name: /Name/ })).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(bodyNames()).toEqual(['Charlie', 'alice', 'Bob'])
    expect(screen.getAllByText('edit')).toHaveLength(3)
  })

  it('sorts when a header is clicked', async () => {
    render(<DataTable columns={columns} data={people} />)
    const nameHeader = screen.getByRole('button', { name: /Name/ })

    await userEvent.click(nameHeader)
    expect(bodyNames()).toEqual(['alice', 'Bob', 'Charlie'])
    expect(screen.getByLabelText('sorted ascending')).toBeInTheDocument()

    await userEvent.click(nameHeader)
    expect(bodyNames()).toEqual(['Charlie', 'Bob', 'alice'])
  })

  it('filters with the search box and shows the empty state', async () => {
    render(
      <DataTable
        columns={columns}
        data={people}
        filterPlaceholder="Search people…"
        emptyMessage="Nobody here"
      />,
    )
    const search = screen.getByPlaceholderText('Search people…')

    await userEvent.type(search, 'bo')
    expect(bodyNames()).toEqual(['Bob'])

    await userEvent.clear(search)
    await userEvent.type(search, 'zzz')
    expect(screen.getByText('Nobody here')).toBeInTheDocument()
  })

  it('paginates', async () => {
    render(<DataTable columns={columns} data={people} pageSize={2} />)
    expect(bodyNames()).toEqual(['Charlie', 'alice'])
    expect(screen.getByText('Page 1 / 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(bodyNames()).toEqual(['Bob'])
    expect(screen.getByText('Page 2 / 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })
})
