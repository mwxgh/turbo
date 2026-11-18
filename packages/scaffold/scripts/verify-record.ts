/**
 * The record of `verify` runs (verify-results.json, committed): one entry per combination with
 * the hash of the project it verified. A combination whose generated project still has that hash
 * passed already and is skipped; any change to its files (code, versions) makes it run again.
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import type { FileTree } from '../src/tree.js'

export const RECORD_FILE = fileURLToPath(
  new URL('../verify-results.json', import.meta.url),
)

export interface RecordEntry {
  /** treeHash() of the generated project. */
  hash: string
  ok: boolean
  /** The step that failed. */
  step?: string
  /** Day of the run, YYYY-MM-DD. */
  date: string
  seconds: number
}

export type VerifyRecord = Record<string, RecordEntry>

/** Hash of a generated project (before formatting): paths and contents. */
export function treeHash(tree: FileTree) {
  const hash = createHash('sha256')
  for (const path of Object.keys(tree).sort())
    hash.update(`${path}\0${tree[path]}\0`)
  return hash.digest('hex').slice(0, 16)
}

export function readRecord(): VerifyRecord {
  return existsSync(RECORD_FILE)
    ? (JSON.parse(readFileSync(RECORD_FILE, 'utf8')) as VerifyRecord)
    : {}
}

/** Written after every combination, so an interrupted run keeps what it proved. */
export function writeRecord(record: VerifyRecord) {
  const sorted = Object.fromEntries(
    Object.keys(record)
      .sort()
      .map((name) => [name, record[name]]),
  )
  writeFileSync(RECORD_FILE, `${JSON.stringify(sorted, null, 2)}\n`)
}
