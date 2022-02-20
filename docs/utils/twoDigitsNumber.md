한 자리의 number 타입 값을 두 자리의 numeral string으로 출력하는 함수입니다.

```typescript
export const twoDigitsNumber = (digit: number): string =>
  digit < 10 ? `0${digit}` : String(digit)
```
