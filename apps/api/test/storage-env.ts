/**
 * Storage config for tests: presigned URLs are signed locally and never sent,
 * so any well-formed values work (no S3 / MinIO needed).
 */
export const testStorageEnv = {
  STORAGE_CORE_S3_SERVERS: JSON.stringify([
    {
      NAME: 'default',
      CONFIG: {
        ENDPOINT: 'http://storage.test',
        KEY: 'test',
        SECRET: 'test-secret',
      },
    },
  ]),
  STORAGE_BUCKET: 'test',
}
