/**
 * Express `json replacer` for columns JSON.stringify cannot send: BigInt →
 * decimal string, Bytes (Uint8Array/Buffer) → base64 – the shapes @repo/types declares.
 */
export function jsonReplacer(
  this: Record<string, unknown>,
  key: string,
  value: unknown,
): unknown {
  const raw = this[key] // before toJSON (Buffer would already be { type, data })
  if (typeof raw === 'bigint') return raw.toString()
  if (raw instanceof Uint8Array) return Buffer.from(raw).toString('base64')
  return value
}
