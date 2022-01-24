```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html,
  body {
    @apply min-h-screen;
  }
  input,
  select,
  textarea {
    @apply border border-gray-500;
  }
  button {
    @apply outline-none focus:outline-none hover:brightness-105 active:brightness-95;
  }
}

@layer components {
  .break-keep {
    word-break: keep-all;
  }
  .required {
    @apply after:content-['*'] after:text-red-500;
  }
}
```

```javascript title="tailwind.config.js"
const plugin = require('tailwindcss/plugin')

/** @typedef { import('tailwindcss/defaultConfig') } DefaultConfig */
/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  ...{},
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.break-keep': {
          wordBreak: 'keep-all'
        }
      })
    })
  ]
}
```
