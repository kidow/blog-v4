```typescript
import { useState } from 'react'

const useMediaQuery = (query: string): boolean => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaMatch.addListener((e) => setMatches(e.matches))
    return () => mediaMatch.removeListener(handler)
  })
  return matches
}
```
