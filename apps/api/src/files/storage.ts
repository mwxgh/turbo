import { S3Client } from '@aws-sdk/client-s3'

export interface StorageConfig {
  endpoint: string
  /** Browser-facing endpoint for presigned URLs. */
  publicEndpoint: string
  region: string
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  /** Largest file a presigned upload accepts (bytes). */
  maxUploadBytes: number
}

/** Largest file a presigned upload accepts. */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024

interface S3Server {
  NAME?: string
  CONFIG?: {
    ENDPOINT?: string
    PUBLIC_ENDPOINT?: string
    KEY?: string
    SECRET?: string
    REGION?: string
  }
}

/**
 * Storage settings from `STORAGE_CORE_S3_SERVERS` (btp format, the server named
 * "default" or the first one) + `STORAGE_BUCKET`. A malformed value throws, so
 * the API fails fast at startup.
 */
export function storageConfig(env: {
  STORAGE_CORE_S3_SERVERS: string
  STORAGE_BUCKET: string
}): StorageConfig {
  const { STORAGE_CORE_S3_SERVERS: raw, STORAGE_BUCKET: bucket } = env

  const fail = (reason: string): never => {
    throw new Error(`Invalid STORAGE_CORE_S3_SERVERS: ${reason}`)
  }
  let servers: unknown
  try {
    servers = JSON.parse(raw)
  } catch {
    fail('not valid JSON')
  }
  if (!Array.isArray(servers) || !servers.length)
    fail('expected a non-empty JSON array')
  const list = servers as S3Server[]
  const server = list.find((s) => s.NAME === 'default') ?? list[0]
  const config = server?.CONFIG ?? {}
  const missing = (['ENDPOINT', 'KEY', 'SECRET'] as const).filter(
    (field) => !config[field],
  )
  if (missing.length) fail(`CONFIG.${missing.join(', CONFIG.')} required`)

  return {
    endpoint: config.ENDPOINT!,
    publicEndpoint: config.PUBLIC_ENDPOINT || config.ENDPOINT!,
    region: config.REGION || 'us-east-1',
    accessKeyId: config.KEY!,
    secretAccessKey: config.SECRET!,
    bucket,
    maxUploadBytes: MAX_UPLOAD_BYTES,
  }
}

/** Path-style addressing (bucket in the path) works with MinIO, RustFS and AWS. */
export const s3Client = (config: StorageConfig, endpoint = config.endpoint) =>
  new S3Client({
    endpoint,
    region: config.region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  })
