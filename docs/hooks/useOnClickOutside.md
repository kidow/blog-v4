지정한 영역의 바깥 영역을 클릭할 시 함수를 실행할 수 있도록 하는 hooks입니다.

```typescript title="services/hooks/index.tsx"
import type { RefObject } from 'react'

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  elementId?: string
): void {
  const listener = (event: MouseEvent | TouchEvent) => {
    const el = ref?.current
    if (
      !el ||
      el.contains(event.target as Node) ||
      elementId === (event.target as HTMLElement).id
    )
      return
    handler(event)
  }
  useEffect(() => {
    document.addEventListener('mouseup', listener)
    return () => {
      document.removeEventListener('mouseup', listener)
    }
  }, [ref, handler])
}
```

## Usage

### Dropdown

```tsx
import { useRef, useMemo } from 'react'
import type { FC } from 'react'
import { Portal } from 'components'
import { useObjectState, useOnClickOutside, getRandomString } from 'services'

interface Props {
  list: string[]
  onClick: (index: number) => void
  label?: string
}
interface State {
  isOpen: boolean
}

const Dropdown: FC<Props> = ({ label = 'Dropdown', list, onClick }) => {
  const [{ isOpen }, setState] = useObjectState<State>({
    isOpen: false
  })
  const ref = useRef<HTMLButtonElement>(null)
  const targetRef = useRef<HTMLUListElement>(null)
  const elementId = useMemo(() => getRandomString(), [])

  // highlight-start
  useOnClickOutside(targetRef, () => setState({ isOpen: false }), elementId)
  // highlight-end
  return (
    <>
      <button
        onClick={() => setState({ isOpen: !isOpen })}
        id={elementId}
        ref={ref}
        className="inline-flex items-center px-4 py-2 hover:bg-gray-50 rounded-md text-gray-700 text-sm after:content-[''] after:h-1.5 after:w-1.5 after:bg-transparent after:border-b after:border-r after:ml-2 after:border-gray-700 after:block after:rotate-45"
      >
        {label}
      </button>
      {isOpen && (
        <Portal
          style={{
            left: `${ref.current?.getBoundingClientRect().left || 0}px`,
            top: `${
              window.scrollY +
              (ref.current?.getBoundingClientRect().top || 0) +
              40
            }px`,
            position: 'absolute',
            zIndex: '9999',
            minWidth: `${ref.current?.getBoundingClientRect().width || 0}px`
          }}
        >
          <ul
            className="bg-gray-50 z-10 text-gray-700 rounded-md p-1 shadow-xl"
            role="menu"
            tabIndex={0}
            ref={targetRef}
          >
            {list.map((item, key) => (
              <li
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                role="menuitem"
                tabIndex={-1}
                key={key}
                onClick={() => {
                  onClick(key)
                  setState({ isOpen: false })
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </Portal>
      )}
    </>
  )
}

export default Dropdown
```

## References

[https://usehooks-ts.com/react-hook/use-on-click-outside](https://usehooks-ts.com/react-hook/use-on-click-outside)
