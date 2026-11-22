/**
 * Minimal RFC 4180 CSV: comma separated, `"` quotes (`""` inside), CRLF or LF. The first row is the
 * header; rows become objects keyed by it. Blank lines are skipped.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  const src = text.startsWith('\uFEFF') ? text.slice(1) : text

  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += c
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }

  const [header, ...body] = rows.filter((r) =>
    r.some((cell) => cell.trim() !== ''),
  )
  if (!header) return []
  const keys = header.map((h) => h.trim())
  return body.map((cells) =>
    Object.fromEntries(keys.map((key, i) => [key, cells[i] ?? ''])),
  )
}
