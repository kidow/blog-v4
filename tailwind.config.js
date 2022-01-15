/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.tsx',
    './docs/**/*.mdx'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
