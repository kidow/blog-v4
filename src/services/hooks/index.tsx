import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject, ChangeEvent } from 'react'

export function useObject<T>(
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
