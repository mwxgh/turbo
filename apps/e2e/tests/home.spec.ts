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

test('uploads files to storage from the dialog', async ({ page }) => {
  // CI has no S3: answer the API presign and the S3 POST here (the real flow
  // is covered against MinIO / RustFS by hand – see README "File upload")
  const deleted: string[] = []
  await page.route('**/api/files/uploads', (route) =>
    route.fulfill({
      status: 201,
      json: {
        url: 'https://s3.test/bucket',
        fields: { key: 'uploads/2026/10/id/my-cv.pdf', Policy: 'p' },
        key: 'uploads/2026/10/id/my-cv.pdf',
      },
    }),
  )
  await page.route('https://s3.test/bucket', (route) =>
    route.fulfill({
      status: 204,
      headers: { 'access-control-allow-origin': '*' },
    }),
  )
  await page.route('**/api/files?key=*', (route) => {
    deleted.push(new URL(route.request().url()).searchParams.get('key')!)
    return route.fulfill({ status: 204 })
  })

  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Upload files' }).click()
  const dialog = page.getByRole('dialog', { name: 'Upload files' })
  await expect(
    dialog.getByText('JPEG, JPG, PNG, PDF, MP4 formats, up to 50 MB.'),
  ).toBeVisible()

  await dialog.getByLabel('Upload files').setInputFiles([
    {
      name: 'my-cv.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.alloc(120 * 1024),
    },
    { name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('x') },
  ])
  const cv = dialog.getByRole('listitem', { name: 'my-cv.pdf' })
  await expect(cv.getByText('Completed')).toBeVisible()
  await expect(page.getByText('Uploaded my-cv.pdf')).toBeVisible() // toast
  await expect(
    dialog.getByRole('listitem', { name: 'notes.txt' }).getByRole('alert'),
  ).toHaveText(/File type not allowed/)

  // Confirm hands the uploaded files to the page (next step)
  await dialog.getByRole('button', { name: 'Confirm (1)' }).click()
  await expect(dialog).toBeHidden()
  await expect(
    page.getByRole('list', { name: 'Attached files' }),
  ).toContainText('my-cv.pdf120 KB · uploads/2026/10/id/my-cv.pdf')

  // Cancel removes what was uploaded meanwhile (no orphans in storage)
  await page.getByRole('button', { name: 'Upload files' }).click()
  await dialog.getByLabel('Upload files').setInputFiles({
    name: 'my-cv.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.alloc(1024),
  })
  await expect(cv.getByText('Completed')).toBeVisible()
  await dialog.getByRole('button', { name: 'Cancel' }).click()
  await expect.poll(() => deleted).toEqual(['uploads/2026/10/id/my-cv.pdf'])
})
