import { BadRequestException, Injectable } from '@nestjs/common'

import JSZip from 'jszip'

import {
  BACKENDS,
  DATABASES,
  DEFAULT_OPTIONS,
  FRONTENDS,
  type FileTree,
  LANGUAGE_OF,
  NAME_PATTERN,
  ORMS,
  ORMS_BY_STACK,
  REPOS,
  type ScaffoldOptions,
  generate,
  incompatibilities,
  monorepoUnavailable,
} from './scaffold'
import { formatTree } from './scaffold/format'

/** Files a generated project runs directly (git hooks, shell scripts). */
const EXECUTABLE = /(^|\/)\.husky\/[^/]+$|\.sh$|(^|\/)mvnw$|(^|\/)gradlew$/

@Injectable()
export class StudioService {
  /**
   * Everything the web form needs to offer only what can be generated: the choices, each
   * backend's language and monorepo rule, the ORMs of each language × database (first = default).
   * `incompatibilities()` stays the one check, here at preview / download.
   */
  options() {
    return {
      namePattern: NAME_PATTERN.source,
      defaults: DEFAULT_OPTIONS,
      repos: REPOS,
      databases: DATABASES,
      backends: BACKENDS.map((backend) => ({
        ...backend,
        language: LANGUAGE_OF[backend.value],
        monorepoUnavailable: monorepoUnavailable(backend.value) ?? null,
      })),
      orms: ORMS,
      frontends: FRONTENDS,
      ormsByStack: ORMS_BY_STACK,
    }
  }

  /** Every file of the project, formatted like `pnpm format` would; 400 with the reasons if it cannot be generated. */
  async files(options: ScaffoldOptions): Promise<FileTree> {
    const reasons = incompatibilities(options)
    if (reasons.length) throw new BadRequestException(reasons)
    return formatTree(generate(options))
  }

  /** The project as a zip, everything under `<name>/`. */
  async zip(
    options: ScaffoldOptions,
  ): Promise<{ filename: string; zip: Buffer }> {
    return {
      filename: `${options.name}.zip`,
      zip: await toZip(options.name, await this.files(options)),
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
