```typescript title="types/index.d.ts"
import type { ReactNode } from 'react'

export interface IToast {
  content: ReactNode
  theme: 'success' | 'info' | 'warn' | 'error' | 'default'
}
```

```typescript title="services/store/index.ts"
import { atom } from 'recoil'
import type { IToast } from 'types'

export const toastState = atom<IToast[]>({
  key: 'toastState',
  default: []
})
```

```typescript
import { useRecoilState } from 'recoil'
import { toastState } from 'services'
import { useEffect } from 'react'
import type { IToast } from 'types'

export const useToast = () => {
  const [toastState, setToastState] = useRecoilState(toastState)

  const stackToast = (toast: IToast) => setToastState([...toastState, toast])

  const toast = {
    success: (content: string) => stackToast({ content, theme: 'success' }),
    info: (content: string) => stackToast({ content, theme: 'info' }),
    warn: (content: string) => stackToast({ content, theme: 'warn' }),
    error: (content: string) => stackToast({ content, theme: 'error' })
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
