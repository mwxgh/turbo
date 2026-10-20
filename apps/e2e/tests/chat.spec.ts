import { expect, test } from '@playwright/test'

test('delivers chat messages between two browsers in real time', async ({
  browser,
}) => {
  const alice = await (await browser.newContext()).newPage()
  const bob = await (await browser.newContext()).newPage()

  for (const page of [alice, bob]) {
    await page.goto('/')
    await expect(page.getByText('connected', { exact: true })).toBeVisible()
  }

  const text = `hi bob ${Date.now()}`
  await alice.getByPlaceholder('Message #lobby').fill(text)
  await alice.getByRole('button', { name: 'Send' }).click()

  await expect(bob.getByText(text)).toBeVisible()
  await expect(alice.getByText(text)).toBeVisible()
  await expect(alice.getByPlaceholder('Message #lobby')).toHaveValue('')
})
