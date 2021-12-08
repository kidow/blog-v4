This hook allows you to copy text.

```typescript
const useCopyText = () => {
  if (!navigator) return

  const copyText = (text: value): Promise<void> => {
    return new Promise((resolve, reject) => {
      navigator.clipboard.writeText(text).then(resolve).catch(reject)
    })
  }

  return copyText
}
```

## Usage

```tsx
import { useCopyText } from '../path'

const Page = () => {
  const copyText = useCopyText()

  const onCopy = async () => {
    try {
      await copyText('copy text!')
      window.alert('copying success.')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div onClick={onCopy}>Copy!</div>
    </div>
  )
}
```
