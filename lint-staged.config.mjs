/** Format only what is being committed (honours .prettierignore). */
export default {
  '*.{ts,tsx,js,mjs,css,json,md,yml,yaml}': 'prettier --write',
  // Any package.json (no slash = basename match) or the catalog changed →
  // workspace consistency (runs once, no file args)
  '{package.json,pnpm-workspace.yaml}': () => 'pnpm lint:workspace',
}
