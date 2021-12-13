```bash
npm install query-string
```

쿼리 파라미터를 다룰 수 있는 hooks입니다.

```typescript title="Next.js"
import queryString from 'query-string'

function useQuery<T>(): {
  query: queryString.ParsedQuery<string>
  updateQuery: (payload: Partial<T>, url?: string) => void
} {
  const { replace, pathname, asPath } = useRouter()
  const { query } = queryString.parseUrl(asPath)

  const updateQuery = (payload: Partial<T>, url?: string) => {
    const as = queryString.stringify({ ...query, ...payload })
    replace(url || `${pathname}?${as}`, `${window.location.pathname}?${as}`, {
      scroll: false
    })
  }
  return { query, updateQuery }
}
```

```typescript title="React"
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

function useQuery<T>(): {
  query: Partial<T>
  updateQuery: (payload: Partial<T>) => void
} {
  const location = useLocation()
  const { replace } = useHistory()
  const query = queryString.parse(location.search) as unknown as Partial<T>
  const updateQuery = (payload: Partial<T>) => {
    const url = queryString.stringify({ ...query, ...payload })
    replace(`${location.pathname}?${url}`)
  }
  return { query, updateQuery }
}
```

## Usage

```tsx
import { useQuery } from 'hooks'

const Page = () => {
  const { query, updateQuery } = useQuery<{ id: string }>()

  console.log(query.id)
  return (
    <div>
      <button onClick={() => updateQuery({ id: 1 })}>change query</button>
    </div>
  )
}
```
