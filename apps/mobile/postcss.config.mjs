import tailwindcss from '@tailwindcss/postcss'

/**
 * React Native has no `.dark` class: the shared theme's `.dark { … }` tokens
 * become `@media (prefers-color-scheme: dark) { :root { … } }` (system setting).
 * @type {import('postcss').Plugin}
 */
const darkFromColorScheme = {
  postcssPlugin: 'dark-from-color-scheme',
  Rule(rule, { AtRule }) {
    if (rule.selector !== '.dark') return
    const media = new AtRule({
      name: 'media',
      params: '(prefers-color-scheme: dark)',
    })
    rule.replaceWith(media)
    rule.selector = ':root'
    media.append(rule)
  },
}

export default { plugins: [tailwindcss(), darkFromColorScheme] }
