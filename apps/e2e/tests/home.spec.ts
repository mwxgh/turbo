import { expect, test } from '@playwright/test'

test('home lists the apps and shows the API as online', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Where to grow today', level: 1 }),
  ).toBeVisible()
  // `first()`: admins also see Lingo Teach
  for (const name of ['Studio', 'Lingo'])
    await expect(
      page.getByRole('link', { name: new RegExp(name) }).first(),
    ).toBeVisible()
  // Reference apps stay reachable by URL only
  for (const name of ['Hellos', 'Chat', 'Files'])
    await expect(
      page.getByRole('link', { name: new RegExp(name) }),
    ).toHaveCount(0)
  await expect(page.getByText('online')).toBeVisible()
})

test('opens an app from its card and comes back from the header', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Studio/ }).click()
  await expect(page).toHaveURL(/\/studio$/)
  await expect(
    page.getByRole('heading', { name: 'Studio', level: 1 }),
  ).toBeVisible()
  // The header names the current app
  await expect(
    page.getByRole('navigation', { name: 'Location' }).getByText('Studio'),
  ).toHaveAttribute('aria-current', 'page')

  await page.getByRole('link', { name: 'Turbo' }).click()
  await expect(page).toHaveURL(/\/$/)
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

  // Stored in localStorage ("theme"): still dark after a reload
  await page.reload()
  await expect(html).toHaveClass(/\bdark\b/)
})
