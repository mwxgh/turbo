import type { INestApplication } from '@nestjs/common'

import JSZip from 'jszip'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { DEFAULT_OPTIONS } from '../src/studio/scaffold'
import { bearer, createApp } from './create-app'

/** supertest keeps a binary body as a Buffer only with a parser. */
const binary = (
  res: request.Response,
  done: (err: Error | null, body: Buffer) => void,
) => {
  const stream = res as unknown as NodeJS.ReadableStream
  const chunks: Buffer[] = []
  stream.on('data', (chunk: Buffer) => chunks.push(chunk))
  stream.on('end', () => done(null, Buffer.concat(chunks)))
}

describe('Studio (e2e)', () => {
  let app: INestApplication
  let auth: string
  const generate = (body: object) =>
    request(app.getHttpServer())
      .post('/api/studio/generate')
      .set('authorization', auth)
      .send(body)

  beforeAll(async () => {
    ;({ app } = await createApp())
    auth = await bearer(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('zips the generated project under its name', async () => {
    const res = await generate({ ...DEFAULT_OPTIONS, name: 'shop' })
      .buffer(true)
      .parse(binary)
      .expect(200)
      .expect('content-type', 'application/zip')
      .expect('content-disposition', 'attachment; filename="shop.zip"')

    const zip = await JSZip.loadAsync(res.body as Buffer)
    const paths = Object.keys(zip.files)
    expect(paths.every((p) => p.startsWith('shop/'))).toBe(true)
    expect(paths).toContain('shop/package.json')
    expect(paths).toContain('shop/apps/api/package.json')
    const pkg = JSON.parse(
      await zip.file('shop/package.json')!.async('string'),
    ) as { name: string }
    expect(pkg.name).toBe('shop')
  })

  it('refuses options that cannot be generated', async () => {
    const res = await generate({
      ...DEFAULT_OPTIONS,
      database: 'mongodb',
      orm: 'prisma',
    }).expect(400)
    expect(JSON.stringify(res.body)).toMatch(/ORM: Prisma does not fit/)
  })

  it('rejects unknown values and bad names', async () => {
    await generate({ ...DEFAULT_OPTIONS, backend: 'rails' }).expect(400)
    await generate({ ...DEFAULT_OPTIONS, name: 'My App' }).expect(400)
  })

  it('serves the form options and a preview of the files', async () => {
    const options = await request(app.getHttpServer())
      .get('/api/studio/options')
      .set('authorization', auth)
      .expect(200)
    expect(options.body).toMatchObject({
      defaults: DEFAULT_OPTIONS,
      ormsByStack: { typescript: { mongodb: ['mongoose', 'none'] } },
    })

    const preview = await request(app.getHttpServer())
      .post('/api/studio/preview')
      .set('authorization', auth)
      .send({ ...DEFAULT_OPTIONS, name: 'shop' })
      .expect(200)
    const files = (preview.body as { files: Record<string, string> }).files
    expect(files).toHaveProperty(['apps/api/package.json'])
    await request(app.getHttpServer())
      .post('/api/studio/preview')
      .set('authorization', auth)
      .send({ ...DEFAULT_OPTIONS, database: 'mongodb', orm: 'prisma' })
      .expect(400)
  })

  it('needs a signed-in user', async () => {
    await request(app.getHttpServer())
      .post('/api/studio/generate')
      .send(DEFAULT_OPTIONS)
      .expect(401)
  })
})
