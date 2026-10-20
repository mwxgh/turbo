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
