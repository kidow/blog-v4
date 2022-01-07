텍스트를 복사하는 함수입니다.

```typescript title="services/utils/index.ts"
export const copyText = () => {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined')
    return

  return (text: string) =>
    new Promise((resolve, reject) =>
      window.navigator.clipboard
        .writeText(text)
        .then(() => resolve(text))
        .catch(reject)
    )
}
```
