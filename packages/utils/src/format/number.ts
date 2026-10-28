export const DEFAULT_LOCALE = 'vi-VN'

/** Group thousands: 1234567.5 → "1.234.567,5". */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

/** Money: 150000 → "150.000 ₫". */
export function formatCurrency(
  value: number,
  currency = 'VND',
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value,
  )
}

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

/** File sizes (1024-based): 512 → "512 B", 55296 → "54 KB", 1258291 → "1.2 MB". */
export function formatBytes(bytes: number): string {
  let value = Math.max(bytes, 0)
  let unit = 0
  while (value >= 1024 && unit < BYTE_UNITS.length - 1) {
    value /= 1024
    unit++
  }
  // One decimal below 10 (1.2 MB), whole numbers above (54 KB)
  const rounded =
    unit && value < 10 ? Math.round(value * 10) / 10 : Math.round(value)
  return `${rounded} ${BYTE_UNITS[unit]}`
}
