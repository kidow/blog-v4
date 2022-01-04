10~11자리의 랜덤 난수를 생성하는 함수입니다.

```typescript
export const getRandomString = () => Math.random().toString(36).slice(2)
```
