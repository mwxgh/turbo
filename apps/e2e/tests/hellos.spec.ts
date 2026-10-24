import { type Page, expect, test } from '@playwright/test'

// Tests share the database with other runs: use unique, recognisable messages.
const unique = (label: string) =>
  `e2e ${label} ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

const row = (page: Page, message: string) =>
  page.getByRole('row').filter({ hasText: message })

/** Open the row's ⋯ menu and pick an action. */
async function chooseRowAction(page: Page, message: string, name: string) {
  await row(page, message).getByRole('button', { name: 'Row actions' }).click()
  await page.getByRole('menuitem', { name }).click()
}

test.describe('Hellos', () => {
  test('creates, edits and deletes a hello', async ({ page }) => {
    const message = unique('create')
    const edited = unique('edited')
    await page.goto('/hellos')

    await page.getByLabel('New hello').fill(message)
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(row(page, message)).toBeVisible()
    // Toast (sonner), top right by default
    await expect(page.getByText('Hello created')).toBeVisible()
    await expect(page.locator('[data-sonner-toaster]')).toHaveAttribute(
      'data-y-position',
      'top',
    )
    await expect(page.locator('[data-sonner-toaster]')).toHaveAttribute(
      'data-x-position',
      'right',
    )
    // Creation time rendered in Vietnam time, e.g. 21/10/2026 09:15
    await expect(row(page, message).locator('time')).toHaveText(
      /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
    )

    // Search runs on the API (keyword) and lives in the URL…
    await page.getByPlaceholder('Search hellos…').fill(message)
    await expect(page.getByRole('row')).toHaveCount(2) // header + match
    await expect(page).toHaveURL(/keyword=/)
    // …so a reload is prefetched on the server with the same result
    await page.reload()
    await expect(page.getByPlaceholder('Search hellos…')).toHaveValue(message)
    await expect(page.getByRole('row')).toHaveCount(2)

    await chooseRowAction(page, message, 'Edit')
    await page.getByLabel('Edit message').fill(edited)
    await page.getByRole('button', { name: 'Save' }).click()
    await page.getByPlaceholder('Search hellos…').fill(edited)
    await expect(row(page, edited)).toBeVisible()

    await chooseRowAction(page, edited, 'Delete')
    await expect(page.getByText('Hello deleted')).toBeVisible()
    await expect(row(page, edited)).toHaveCount(0)
  })

  test('validates the message before calling the API', async ({ page }) => {
    await page.goto('/hellos')
    await page.getByLabel('New hello').fill('   ')

    await expect(page.getByText('Message is required')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled()
  })
})
