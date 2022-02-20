const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.{html,js,tsx,mdx}', './docs/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        emerald: colors.green,
        amber: colors.yellow,
        violet: colors.purple,
        sky: {
          100: '#e0f2fe',
          600: '#0284c7'
        },
        rose: {
          600: '#e11d48'
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.break-keep': {
          wordBreak: 'keep-all'
        },
        '.arrange': {
          width: '100%',
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: theme('spacing.2'),
          alignItems: 'flex-start'
        }
      })
    })
  ]
}
