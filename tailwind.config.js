const plugin = require('tailwindcss/plugin')

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
    './src/**/*.mdx',
    './docs/**/*.mdx'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.break-keep': {
          wordBreak: 'keep-all'
        },
        '.arrange': {
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: theme('spacing.2'),
          alignItems: 'flex-start'
        }
      })
    })
  ]
}
