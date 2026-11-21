/** Generated project: path (forward slashes, relative to the project root) → file content. */
export type FileTree = Record<string, string>

/** Pretty JSON with a trailing newline, like the files Prettier writes. */
export const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`

/** Trims the common indentation of a template literal and ends it with one newline. */
export function text(strings: TemplateStringsArray, ...values: unknown[]) {
  const raw = strings.reduce(
    (out, part, i) => out + part + (i < values.length ? String(values[i]) : ''),
    '',
  )
  const lines = raw.replace(/^\n/, '').replace(/\s+$/, '').split('\n')
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length),
  )
  return `${lines.map((l) => l.slice(indent)).join('\n')}\n`
}

/** Paths sorted folders-first, like a file explorer (for previews and archives). */
export function sortedPaths(tree: FileTree): string[] {
  return Object.keys(tree).sort((a, b) => {
    const pa = a.split('/')
    const pb = b.split('/')
    for (let i = 0; i < Math.min(pa.length, pb.length); i++) {
      if (pa[i] === pb[i]) continue
      const aIsDir = i < pa.length - 1
      const bIsDir = i < pb.length - 1
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1
      return pa[i]!.localeCompare(pb[i]!)
    }
    return pa.length - pb.length
  })
}
