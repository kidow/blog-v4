`lodash`의 `throttle`을 직접 구현함 함수입니다.

```typescript title="services/utils/index.ts"
export function throttle(func: Function, wait: number) {
  let waiting = false
  return function () {
    if (!waiting) {
      func.apply(this, arguments)
      waiting = true
      setTimeout(() => {
        waiting = false
      }, wait)
    }
  }
}
```
