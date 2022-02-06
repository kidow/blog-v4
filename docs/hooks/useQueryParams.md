```bash npm2yarn
npm install query-string
```

쿼리 파라미터를 다룰 수 있는 hooks입니다.

```typescript title="Next.js"
import queryString from 'query-string'

export function useQueryParams<T>(): [
  queryString.ParsedQuery<string>,
  (payload: Partial<T>, url?: string) => void,
  (queryList: string[]) => void
] {
  const { replace, pathname, asPath } = useRouter()
  const { query } = queryString.parseUrl(asPath)
  const setQuery = (payload: Partial<T>, url?: string) => {
    const as = queryString.stringify({ ...query, ...payload })
    replace(url || `${pathname}?${as}`, `${window.location.pathname}?${as}`, {
      scroll: false
    })
  }
  const resetQuery = (queryList: string[]) => {
    let newQuery = query
    queryList.forEach((item) => {
      if (newQuery[item]) delete newQuery[item]
    })
    const as = queryString.stringify(newQuery)
    replace(
      !!as ? `${pathname}?${as}` : pathname,
      !!as ? `${window.location.pathname}?${as}` : window.location.pathname,
      { scroll: false }
    )
  }
  return [query, setQuery, resetQuery]
}
```

```typescript title="React"
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

function useQuery<T>(): [Partial<T>, (payload: Partial<T>) => void] {
  const location = useLocation()
  const { replace } = useHistory()
  const query = queryString.parse(location.search) as unknown as Partial<T>
  const setQuery = (payload: Partial<T>) => {
    const url = queryString.stringify({ ...query, ...payload })
    replace(`${location.pathname}?${url}`)
  }
  return [query, setQuery]
}
```

## Usage

```tsx
import { useQuery } from 'hooks'

const Page = () => {
  const { query, setQuery } = useQuery<{ id: string }>()

  console.log(query.id)
  return (
    <div>
      <button onClick={() => setQuery({ id: 1 })}>change query</button>
    </div>
  )
}
```
