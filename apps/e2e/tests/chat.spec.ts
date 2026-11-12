import { expect, test } from '@playwright/test'

import { AUTH_FILE } from './support.js'

test('delivers chat messages between two browsers in real time', async ({
  browser,
}) => {
  // Two signed-in browsers (the socket handshake needs the access cookie)
  const alice = await (
    await browser.newContext({ storageState: AUTH_FILE })
  ).newPage()
  const bob = await (
    await browser.newContext({ storageState: AUTH_FILE })
  ).newPage()

  for (const page of [alice, bob]) {
    await page.goto('/chat')
    await expect(page.getByText('connected', { exact: true })).toBeVisible()
  }

  const text = `hi bob ${Date.now()}`
  await alice.getByPlaceholder('Message #lobby').fill(text)
  await alice.getByRole('button', { name: 'Send' }).click()

  await expect(bob.getByText(text)).toBeVisible()
  await expect(alice.getByText(text)).toBeVisible()
  await expect(alice.getByPlaceholder('Message #lobby')).toHaveValue('')
})
