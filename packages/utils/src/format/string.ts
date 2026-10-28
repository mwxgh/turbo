/** Strip Vietnamese diacritics: "Đà Nẵng" → "Da Nang". */
export function removeDiacritics(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

/** URL-safe slug: "Xin chào, Việt Nam!" → "xin-chao-viet-nam". */
export function slugify(value: string): string {
  return removeDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Cut to `maxLength` characters, ending with `suffix` when shortened. */
export function truncate(
  value: string,
  maxLength: number,
  suffix = '…',
): string {
  if (value.length <= maxLength) return value
  return (
    value.slice(0, Math.max(0, maxLength - suffix.length)).trimEnd() + suffix
  )
}
