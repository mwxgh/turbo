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
    await page.getByLabel('Password', { exact: true }).fill('wrong password')
    await page.getByRole('button', { name: 'Sign in' }).click()
    // Scoped to <main>: Next's route announcer is a role=alert too
    await expect(page.getByRole('main').getByRole('alert')).toHaveText(
      'Wrong email / username or password',
    )

    await page.getByLabel('Password', { exact: true }).fill(TEST_USER.password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/\?page=1$/)
  })
})

test.describe('sign-up and provider errors', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('switches to the sign-up tab and creates an account', async ({
    page,
  }) => {
    await page.goto('/login?next=%2F%3Fpage%3D1')
    await page.getByRole('link', { name: 'Create account' }).click()
    // `next` survives the tab switch
    await expect(page).toHaveURL(/\/register\?next=%2F%3Fpage%3D1$/)
    await expect(
      page.getByRole('link', { name: 'Create account' }),
    ).toHaveAttribute('aria-current', 'page')

    await page.getByLabel('Email').fill(`e2e-${Date.now()}@example.com`)
    await page.getByLabel('Password', { exact: true }).fill('short')
    await page.getByRole('button', { name: 'Create account' }).click()
    await expect(page.getByText('Use at least 8 characters')).toBeVisible()

    await page.getByLabel('Password', { exact: true }).fill('e2e password 123')
    await page.getByRole('button', { name: 'Create account' }).click()
    await expect(page).toHaveURL(/\/\?page=1$/)
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  })

  test('explains why a provider sign-in did not complete', async ({ page }) => {
    await page.goto('/login?error=email_not_verified')
    await expect(page.getByRole('main').getByRole('alert')).toContainText(
      'An account with this email already exists',
    )
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

test.describe('own session', () => {
  // Signing out ends the session at once (access token too): never the one other tests share
  test.use({ storageState: { cookies: [], origins: [] } })

  test('signs out', async ({ page, context }) => {
    await page.goto('/')
    await page.getByLabel('Email or username').fill(TEST_USER.email)
    await page.getByLabel('Password', { exact: true }).fill(TEST_USER.password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/$/)

    // Right after the full page load the button may not be hydrated yet: click until it works
    await expect(async () => {
      await page.getByRole('button', { name: 'Sign out' }).click()
      await expect(page).toHaveURL(/\/login$/, { timeout: 1_000 })
    }).toPass()
    expect(
      (await context.cookies()).filter((c) => c.name.endsWith('_token')),
    ).toEqual([])
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
  })
})
