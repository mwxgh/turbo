import { expect, test as setup } from '@playwright/test'

import { API_URL, AUTH_FILE, TEST_USER } from './support.js'

/** Signs in once through the UI; every other test starts with these cookies. */
setup('sign in', async ({ page, request }) => {
  if (!process.env.E2E_USER) {
    // Local / CI: the api runs with AUTH_REGISTRATION=open; 409 = created by an earlier run
    const res = await request.post(`${API_URL}/auth/register`, {
      data: TEST_USER,
    })
    expect([201, 409]).toContain(res.status())
  }

  await page.goto('/')
  await expect(page).toHaveURL(/\/login\?next=%2F$/)
  await page.getByLabel('Email or username').fill(TEST_USER.email)
  await page.getByLabel('Password', { exact: true }).fill(TEST_USER.password)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  await page.context().storageState({ path: AUTH_FILE })
})
