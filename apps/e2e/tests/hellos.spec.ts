import { type Page, expect, test } from '@playwright/test'

// Tests share the database with other runs: use unique, recognisable messages.
const unique = (label: string) =>
  `e2e ${label} ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

const row = (page: Page, message: string) =>
  page.getByRole('row').filter({ hasText: message })

test.describe('Hellos', () => {
  test('creates, edits and deletes a hello', async ({ page }) => {
    const message = unique('create')
    const edited = unique('edited')
    await page.goto('/hellos')

    await page.getByLabel('New hello').fill(message)
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(row(page, message)).toBeVisible()
    // Creation time rendered in Vietnam time, e.g. 21/10/2026 09:15
    await expect(row(page, message).locator('time')).toHaveText(
      /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
    )

    // Search narrows the table (TanStack Table global filter)
    await page.getByPlaceholder('Search hellos…').fill(message)
    await expect(page.getByRole('row')).toHaveCount(2) // header + match

    await row(page, message).getByRole('button', { name: 'Edit' }).click()
    await page.getByLabel('Edit message').fill(edited)
    await page.getByRole('button', { name: 'Save' }).click()
    await page.getByPlaceholder('Search hellos…').fill(edited)
    await expect(row(page, edited)).toBeVisible()

    await row(page, edited).getByRole('button', { name: 'Delete' }).click()
    await expect(row(page, edited)).toHaveCount(0)
  })

  test('validates the message before calling the API', async ({ page }) => {
    await page.goto('/hellos')
    await page.getByLabel('New hello').fill('   ')

    await expect(page.getByText('Message is required')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled()
  })
})
