---
sidebar_position: 1
---

This hook allows you to manage all the state within one component.

```tsx
function useObject<T>(
  initialObject: T
): [
  T,
  (obj: Partial<T>, callback?: (state: T) => void) => void,
  (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void,
  (keys?: Array<keyof T>) => void
] {
  const [state, setState] = useState<T>(initialObject)
  const callbackRef = useRef<(state: T) => void>()
  const isFirstCallbackCall = useRef<boolean>(true)

  const onChange = useCallback(
    (obj: Partial<T>, callback?: (state: T) => void) => {
      callbackRef.current = callback
      setState((prevState) => ({ ...prevState, ...obj }))
    },
    [state]
  )

  const onEventChange = useCallback(
    ({
      target: { name, value }
    }: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): void => setState((prevState) => ({ ...prevState, [name]: value })),
    [state]
  )

  const arrayToObject = (keys: Array<keyof T>): T => {
    if (!keys.length) return initialObject
    const initial: any = {}
    keys.reduce((acc, cur) => (initial[cur] = initialObject[cur]), initial)
    return initial
  }
  const resetState = (keys?: Array<keyof T>) =>
    keys
      ? setState((prevState) => ({ ...prevState, ...arrayToObject(keys) }))
      : setState(initialObject)

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false
      return
    }
    callbackRef.current?.(state)
  }, [state])

  return [state, onChange, onEventChange, resetState]
}
```

## Usage

```tsx
interface State {
  isLoading: boolean
  email: string
  password: string
}

const Page = () => {
  const [{ isLoading, email, password }, setState, onChange] = useObject<State>(
    {
      isLoading: false,
      email: '',
      password: ''
    }
  )

  const onClick = () => {
    setState({ isLoading: true })
    setTimeout(() => {
      setState({ isLoading: false, email: '', password: '' }, (state) => {
        // Outputs the state after the change.
        console.log(state)
      })
    }, [3000])
  }

  return (
    <div>
      <input value={email} name="email" onChange={onChange} />
      <input
        value={password}
        name="password"
        type="password"
        onChange={onChange}
      />
      <button onClick={() => resetState(['email', 'password'])}>Reset</button>
      <button onClick={onClick}>Submit</button>
    </div>
  )
}
```
