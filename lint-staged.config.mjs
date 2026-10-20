/** Format only what is being committed (honours .prettierignore). */
export default {
  '*.{ts,tsx,js,mjs,css,json,md,yml,yaml}': 'prettier --write',
}
