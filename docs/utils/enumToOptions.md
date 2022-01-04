`enum` 타입으로 선언한 변수를 `Select`나 `Radio` 컴포넌트에서 목록으로 뿌릴 수 있도록 배열로 변경하는 함수입니다.

```typescript
export const enumToOptions = (enumObj: any) =>
  Object.entries<string>(enumObj).map(([key, value]) => ({ value, name }))
```
