import { BadRequestException } from '@nestjs/common'

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { FilesService } from './files.service.js'
import type { StorageConfig } from './storage.js'

const config: StorageConfig = {
  endpoint: 'http://storage:9000',
  publicEndpoint: 'https://files.example.com',
  region: 'us-east-1',
  accessKeyId: 'key',
  secretAccessKey: 'secret',
  bucket: 'app',
  maxUploadBytes: 1024,
}

/** The signed policy is base64 JSON: read its conditions back. */
const policyOf = (fields: Record<string, string>) =>
  JSON.parse(Buffer.from(fields.Policy!, 'base64').toString()) as {
    conditions: unknown[]
  }

describe('FilesService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('signs a browser upload under uploads/ with size and type in the policy', async () => {
    const { url, fields, key } = await new FilesService(config).createUpload({
      fileName: 'my cv (final).pdf',
      contentType: 'application/pdf',
      size: 100,
    })

    expect(url).toBe('https://files.example.com/app') // public endpoint, path style
    expect(key).toMatch(/^uploads\/\d{4}\/\d{2}\/[\w-]{36}\/my-cv-final-\.pdf$/)
    expect(fields).toMatchObject({ key, 'Content-Type': 'application/pdf' })
    expect(policyOf(fields).conditions).toEqual(
      expect.arrayContaining([
        ['content-length-range', 1, 1024],
        ['eq', '$Content-Type', 'application/pdf'],
      ]),
    )
  })

  it('refuses files above the limit before signing', async () => {
    await expect(
      new FilesService(config).createUpload({
        fileName: 'big.mp4',
        contentType: 'video/mp4',
        size: 2048,
      }),
    ).rejects.toThrow(new BadRequestException('File is larger than 1 KB'))
  })

  it('deletes only keys it handed out', async () => {
    const send = vi
      .spyOn(S3Client.prototype, 'send')
      .mockResolvedValue({} as never)
    const files = new FilesService(config)

    await files.remove('uploads/2026/10/id/cv.pdf')
    const [command] = send.mock.calls[0]!
    expect(command).toBeInstanceOf(DeleteObjectCommand)
    expect((command as DeleteObjectCommand).input).toEqual({
      Bucket: 'app',
      Key: 'uploads/2026/10/id/cv.pdf',
    })

    await expect(files.remove('secrets/db.dump')).rejects.toBeInstanceOf(
      BadRequestException,
    )
    await expect(files.remove('uploads/../secrets')).rejects.toBeInstanceOf(
      BadRequestException,
    )
    expect(send).toHaveBeenCalledTimes(1)
  })
})
