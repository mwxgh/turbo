import { BadRequestException } from '@nestjs/common'

import JSZip from 'jszip'
import { describe, expect, it } from 'vitest'

import { DEFAULT_OPTIONS, ormIdsFor } from './scaffold'
import { StudioService, toZip } from './studio.service'

describe('StudioService', () => {
  const service = new StudioService()

  it('zips the formatted project under its name', async () => {
    const { filename, zip } = await service.zip({
      ...DEFAULT_OPTIONS,
      name: 'shop',
    })
    expect(filename).toBe('shop.zip')
    const files = (await JSZip.loadAsync(zip)).files
    const paths = Object.keys(files)
    expect(paths.length).toBeGreaterThan(10)
    expect(paths.every((p) => p.startsWith('shop/'))).toBe(true)
    const pkg = JSON.parse(
      await files['shop/package.json']!.async('string'),
    ) as { name: string }
    expect(pkg.name).toBe('shop')
  }, 30_000)

  it('gives the form every choice and the ORM rules', () => {
    const options = service.options()
    expect(new RegExp(options.namePattern).test('my-app')).toBe(true)
    expect(options.defaults).toEqual(DEFAULT_OPTIONS)
    const go = options.backends.find((b) => b.value === 'go')!
    expect(go).toMatchObject({ language: 'go', planned: true })
    expect(go.monorepoUnavailable).toMatch(/TypeScript backend/)
    expect(
      options.backends.find((b) => b.value === 'nest')!.monorepoUnavailable,
    ).toBeNull()
    // Same table the server checks with
    expect(options.ormsByStack.typescript.oracle).toEqual(
      ormIdsFor('nest', 'oracle'),
    )
  })

  it('previews the formatted files', async () => {
    const files = await service.files({ ...DEFAULT_OPTIONS, name: 'shop' })
    expect(JSON.parse(files['package.json']!)).toMatchObject({ name: 'shop' })
  }, 30_000)

  it('refuses a combination that cannot be generated, with the reasons', async () => {
    const error = await service
      .zip({ ...DEFAULT_OPTIONS, database: 'mongodb', orm: 'prisma' })
      .catch((e: unknown) => e)
    expect(error).toBeInstanceOf(BadRequestException)
    expect(
      JSON.stringify((error as BadRequestException).getResponse()),
    ).toMatch(/ORM: Prisma does not fit/)
  })
})

describe('toZip', () => {
  it('marks git hooks and shell scripts executable', async () => {
    const zip = await JSZip.loadAsync(
      await toZip('p', {
        '.husky/pre-commit': 'pnpm lint-staged\n',
        'scripts/run.sh': 'echo hi\n',
        'README.md': '# p\n',
      }),
    )
    const mode = (path: string) =>
      (zip.files[`p/${path}`]!.unixPermissions as number) & 0o777
    expect(mode('.husky/pre-commit')).toBe(0o755)
    expect(mode('scripts/run.sh')).toBe(0o755)
    expect(mode('README.md')).toBe(0o644)
  })
})
