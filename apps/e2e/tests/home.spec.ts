import { expect, test } from '@playwright/test'

test('home shows the API as online and links to hellos', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Turborepo base' }),
  ).toBeVisible()
  await expect(page.getByText('online')).toBeVisible()

  await page.getByRole('link', { name: /Hellos CRUD/ }).click()
  await expect(page).toHaveURL(/\/hellos$/)
  await expect(page.getByRole('heading', { name: /Hellos/ })).toBeVisible()
})
