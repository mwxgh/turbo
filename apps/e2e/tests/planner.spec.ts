import { expect, test } from '@playwright/test'

// Tests share the database with other runs: unique, recognisable titles.
const unique = (label: string) =>
  `e2e ${label} ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

test.describe('Planner', () => {
  test('is linked from the home page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Planner/ }).click()
    await expect(page).toHaveURL(/\/planner$/)
    await expect(page.getByRole('tab', { name: 'Tháng' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  test('adds a backlog task, schedules it by drag and moves it on the board', async ({
    page,
  }) => {
    const title = unique('task')
    await page.goto('/planner?view=month&date=2026-11-10')

    await page.getByRole('button', { name: 'Thêm việc chưa lên lịch' }).click()
    await page.getByLabel('Tên việc').fill(title)
    await page.getByRole('button', { name: 'Thêm việc', exact: true }).click()
    await expect(page.getByText('Đã thêm việc')).toBeVisible()
    const backlog = page.getByRole('complementary', { name: 'Chưa lên lịch' })
    await expect(backlog.getByText(title)).toBeVisible()

    // Drag from the backlog onto 12 November
    const cell = page
      .getByRole('button', { name: 'Xem ngày 2026-11-12' })
      .locator('xpath=../..')
    await backlog.getByText(title).dragTo(cell)
    await expect(cell.getByText(title)).toBeVisible()
    await expect(backlog.getByText(title)).toBeHidden()

    // Board: drag it from "Cần làm" to "Đang làm"
    await page.getByRole('tab', { name: 'Kanban' }).click()
    const doing = page.getByRole('region', { name: 'Đang làm' })
    await page
      .getByRole('region', { name: 'Cần làm' })
      .getByText(title)
      .dragTo(doing)
    await expect(doing.getByText(title)).toBeVisible()
    await expect(page.getByText('Chuyển sang Đang làm')).toBeVisible()

    // Survives a reload (saved by the API), then delete it
    await page.reload()
    await page
      .getByRole('region', { name: 'Đang làm' })
      .getByText(title)
      .click()
    await page.getByRole('button', { name: 'Xoá' }).click()
    await page
      .getByRole('alertdialog')
      .getByRole('button', { name: 'Xoá' })
      .click()
    await expect(page.getByText(title)).toBeHidden()
  })
})
