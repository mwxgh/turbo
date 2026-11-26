import { expect, test } from '@playwright/test'

// Content comes from fixtures/studio-content.json (prepare-db.ts); progress is per user and shared between runs
test.describe('Studio', () => {
  test('follows a roadmap to a lesson and passes its quiz', async ({
    page,
  }) => {
    await page.goto('/studio')
    const nav = page.getByRole('navigation', { name: 'Studio' })
    await nav.getByRole('link', { name: 'Lộ trình' }).click()
    await page.getByRole('link', { name: /^Frontend/ }).click()
    await expect(
      page.getByRole('heading', { name: 'Lộ trình Frontend', level: 1 }),
    ).toBeVisible()

    await page.getByRole('link', { name: /^JavaScript/ }).click()
    await page
      .getByRole('link', { name: /Biến và kiểu dữ liệu/ })
      .first()
      .click()
    await expect(
      page.getByRole('heading', { name: 'Biến và kiểu dữ liệu', level: 1 }),
    ).toBeVisible()
    // Highlighted code block from the Markdown
    await expect(page.locator('pre code.language-js').first()).toBeVisible()

    const quiz = page.getByRole('region', { name: 'Kiểm tra nhanh' })
    await quiz.getByRole('radio', { name: 'const' }).check()
    await quiz.getByRole('radio', { name: 'false' }).check()
    await quiz.getByRole('radio', { name: "'object'" }).check()
    await quiz.getByRole('button', { name: 'Nộp bài' }).click()
    await expect(quiz.getByText('Đúng 3/3')).toBeVisible()
    await expect(page.getByText('Đã học xong').first()).toBeVisible()
  })

  test('lists a group and keeps the generator one click away', async ({
    page,
  }) => {
    await page.goto('/studio/patterns')
    await expect(
      page.getByRole('heading', { name: 'Design pattern', level: 1 }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Pattern hành vi/ }),
    ).toBeVisible()

    await page
      .getByRole('navigation', { name: 'Studio' })
      .getByRole('link', { name: 'Tạo project' })
      .click()
    await expect(page).toHaveURL(/\/studio\/generator$/)
    await expect(
      page.getByRole('heading', { name: 'Tạo project', level: 1 }),
    ).toBeVisible()
  })

  test('sends old generator links to the new page', async ({ page }) => {
    await page.goto('/studio?name=shop')
    await expect(page).toHaveURL(/\/studio\/generator\?name=shop$/)
  })
})
