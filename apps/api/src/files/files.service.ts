import { randomUUID } from 'node:crypto'

import {
  BadRequestException,
  Inject,
  Injectable,
  type OnModuleDestroy,
} from '@nestjs/common'

import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

import { formatBytes } from '@repo/utils'

import type { CreateUploadDto } from './dto/create-upload.dto'
import type { PresignedUploadDto } from './dto/presigned-upload.dto'
import { type StorageConfig, s3Client } from './storage'

export const STORAGE_CONFIG = Symbol('STORAGE_CONFIG')

/** Everything uploaded through the API lives under this prefix. */
export const UPLOAD_PREFIX = 'uploads/'
const PRESIGN_SECONDS = 5 * 60

/** Keep names readable in the key but safe in URLs: "CV (final).pdf" → "CV-final-.pdf". */
const safeName = (name: string) =>
  name.replace(/[^\w.-]+/g, '-').slice(-120) || 'file'

/**
 * Browser → S3 uploads with presigned POST: the API only signs, the file never
 * passes through it. Size and Content-Type are part of the signed policy.
 */
@Injectable()
export class FilesService implements OnModuleDestroy {
  private readonly client
  /** Signs with the public endpoint: the URL is used by the browser. */
  private readonly signer

  constructor(@Inject(STORAGE_CONFIG) private readonly config: StorageConfig) {
    this.client = s3Client(config)
    this.signer = s3Client(config, config.publicEndpoint)
  }

  async createUpload({
    fileName,
    contentType,
    size,
  }: CreateUploadDto): Promise<PresignedUploadDto> {
    const { config, signer } = this
    if (size > config.maxUploadBytes)
      throw new BadRequestException(
        `File is larger than ${formatBytes(config.maxUploadBytes)}`,
      )

    const month = new Date().toISOString().slice(0, 7).replace('-', '/')
    const key = `${UPLOAD_PREFIX}${month}/${randomUUID()}/${safeName(fileName)}`
    const { url, fields } = await createPresignedPost(signer, {
      Bucket: config.bucket,
      Key: key,
      Conditions: [
        ['content-length-range', 1, config.maxUploadBytes],
        ['eq', '$Content-Type', contentType],
      ],
      Fields: { 'Content-Type': contentType },
      Expires: PRESIGN_SECONDS,
    })
    return { url, fields, key }
  }

  /** Only keys this API handed out (no auth yet: never delete arbitrary objects). */
  async remove(key: string): Promise<void> {
    const { config, client } = this
    if (!key?.startsWith(UPLOAD_PREFIX) || key.includes('..'))
      throw new BadRequestException('Not an uploaded file')
    await client.send(
      new DeleteObjectCommand({ Bucket: config.bucket, Key: key }),
    )
  }

  onModuleDestroy() {
    this.client.destroy()
    this.signer.destroy()
  }
}
