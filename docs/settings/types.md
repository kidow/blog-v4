### process.env 에 추가된 변수에 타입을 지정할 때

```typescript title="types/global.d.ts"
declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
  }
}
```
