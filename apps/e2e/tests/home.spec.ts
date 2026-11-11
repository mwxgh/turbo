import { expect, test } from '@playwright/test'

test('home shows the API as online', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Turborepo base' }),
  ).toBeVisible()
  await expect(page.getByText('online')).toBeVisible()
})

test('switches the theme in one click from the header and keeps it', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/', { waitUntil: 'networkidle' })
  const html = page.locator('html')
  await expect(html).not.toHaveClass(/\bdark\b/)

  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(html).toHaveClass(/\bdark\b/)

  // Stored by next-themes: still dark after a reload
  await page.reload()
  await expect(html).toHaveClass(/\bdark\b/)
})
