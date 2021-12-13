`number` 타입의 변수에 세자리마다 콤마(,)를 찍을 수 있는 함수입니다.

```typescript
const priceFormat = (value?: string | number) => {
  if (!value) return 0
  else if (typeof value === 'string') return Number(value).toLocaleString()
  else if (typeof value === 'number') return value.toLocaleString()
  else return 0
}
```