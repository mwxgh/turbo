import { BadRequestException, Injectable } from '@nestjs/common'

import JSZip from 'jszip'

import {
  type FileTree,
  type ScaffoldOptions,
  generate,
  incompatibilities,
} from '@repo/scaffold'
import { formatTree } from '@repo/scaffold/format'

/** Files a generated project runs directly (git hooks, shell scripts). */
const EXECUTABLE = /(^|\/)\.husky\/[^/]+$|\.sh$|(^|\/)mvnw$|(^|\/)gradlew$/

@Injectable()
export class StudioService {
  /** The project as a zip, everything under `<name>/`, formatted like `pnpm format` would. */
  async zip(
    options: ScaffoldOptions,
  ): Promise<{ filename: string; zip: Buffer }> {
    const reasons = incompatibilities(options)
    if (reasons.length) throw new BadRequestException(reasons)
    const tree = await formatTree(generate(options))
    return {
      filename: `${options.name}.zip`,
      zip: await toZip(options.name, tree),
    }
  }
}

export function toZip(root: string, tree: FileTree): Promise<Buffer> {
  const zip = new JSZip()
  for (const [path, content] of Object.entries(tree))
    zip.file(`${root}/${path}`, content, {
      unixPermissions: EXECUTABLE.test(path) ? 0o755 : 0o644,
    })
  return zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    platform: 'UNIX',
  })
}
