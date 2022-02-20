useEffect와는 다르게 state가 선언됐을 때는 함수를 실행하지 않고, 이후 state가 변경되었을 때만 함수를 실행하도록 하는 훅스입니다.

```typescript title="services/hooks/index.tsx"
import { useRef } from 'react'

export const useComponentDidUpdate = (cb: Function, state: any) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) cb()
    else mounted.current = true
  }, state)
}
```
