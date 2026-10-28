import { describe, expect, it } from 'vitest'

import { MAX_UPLOAD_BYTES } from '@repo/utils'

import { storageConfig } from './storage'

const servers = (...list: unknown[]) => JSON.stringify(list)
const server = (name: string, config: Record<string, string>) => ({
  NAME: name,
  CONFIG: config,
})
const full = {
  ENDPOINT: 'http://storage:9000',
  PUBLIC_ENDPOINT: 'https://files.example.com',
  KEY: 'key',
  SECRET: 'secret',
  REGION: 'ap-southeast-1',
}

describe('storageConfig (btp STORAGE_CORE_S3_SERVERS format)', () => {
  it('reads the "default" server and the bucket', () => {
    expect(
      storageConfig({
        STORAGE_CORE_S3_SERVERS: servers(
          server('archive', { ...full, ENDPOINT: 'http://other' }),
          server('default', full),
        ),
        STORAGE_BUCKET: 'btp',
      }),
    ).toEqual({
      endpoint: 'http://storage:9000',
      publicEndpoint: 'https://files.example.com',
      region: 'ap-southeast-1',
      accessKeyId: 'key',
      secretAccessKey: 'secret',
      bucket: 'btp',
      maxUploadBytes: MAX_UPLOAD_BYTES,
    })
  })

  it('falls back to the first server, ENDPOINT and us-east-1', () => {
    const config = storageConfig({
      STORAGE_CORE_S3_SERVERS: servers(
        server('main', { ENDPOINT: 'http://s3', KEY: 'k', SECRET: 's' }),
      ),
      STORAGE_BUCKET: 'app',
    })
    expect(config).toMatchObject({
      endpoint: 'http://s3',
      publicEndpoint: 'http://s3',
      region: 'us-east-1',
    })
  })

  it('fails fast on malformed values', () => {
    const bucket = { STORAGE_BUCKET: 'btp' }
    expect(() =>
      storageConfig({ ...bucket, STORAGE_CORE_S3_SERVERS: '[{oops' }),
    ).toThrow('Invalid STORAGE_CORE_S3_SERVERS: not valid JSON')
    expect(() =>
      storageConfig({ ...bucket, STORAGE_CORE_S3_SERVERS: '{}' }),
    ).toThrow('expected a non-empty JSON array')
    expect(() =>
      storageConfig({
        ...bucket,
        STORAGE_CORE_S3_SERVERS: servers(
          server('default', { ENDPOINT: 'http://s3' }),
        ),
      }),
    ).toThrow('CONFIG.KEY, CONFIG.SECRET required')
  })
})
