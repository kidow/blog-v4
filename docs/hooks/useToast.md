```typescript
export const useToast = () => {
  const toast = {
    success: (text: string) => {},
    info: (text: string) => {},
    warn: (text: string) => {},
    error: (text: string) => {}
  }

  return toast
}
```

## Usage

### Next.js

```tsx title="pages/_app.tsx"
import App from 'next/app'
import { Toast as ToastProvider } from 'components'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    )
  }
}
```
