import { expect, test } from '@playwright/test'

import { TEST_USER } from './support.js'

/** The web/api under test run with APP_ENV=dev: cookie names are prefixed (authCookieNames). */
const ACCESS_COOKIE = 'dev_access_token'

test.describe('signed out', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('sends anonymous visitors to the login page and back afterwards', async ({
    page,
  }) => {
    await page.goto('/?page=1')
    await expect(page).toHaveURL(/\/login\?next=%2F%3Fpage%3D1$/)

    await page.getByLabel('Email or username').fill(TEST_USER.email)
    await page.getByLabel('Password').fill('wrong password')
    await page.getByRole('button', { name: 'Sign in' }).click()
    // Scoped to <main>: Next's route announcer is a role=alert too
    await expect(page.getByRole('main').getByRole('alert')).toHaveText(
      'Wrong email / username or password',
    )

    await page.getByLabel('Password').fill(TEST_USER.password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/\?page=1$/)
  })
})

test('refreshes an expired access token before rendering', async ({
  page,
  context,
}) => {
  // Only the refresh cookie left, as after 15 minutes
  await context.clearCookies({ name: ACCESS_COOKIE })
  await page.goto('/')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  expect((await context.cookies()).some((c) => c.name === ACCESS_COOKIE)).toBe(
    true,
  )
})

test('signs out', async ({ page, context }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign out' }).click()
  await expect(page).toHaveURL(/\/login$/)
  expect(
    (await context.cookies()).filter((c) => c.name.endsWith('_token')),
  ).toEqual([])
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
})
