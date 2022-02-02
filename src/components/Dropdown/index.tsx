import React, { useRef, useMemo, useEffect } from 'react'
import type { FC } from 'react'
import { Portal } from '@site/src/components'
import { useObject, useOnClickOutside } from '@site/src/services'

interface Props {
  list: string[]
  onClick: (value: string) => void
  label?: string
}
interface State {
  isOpen: boolean
}

const Dropdown: FC<Props> = ({ label = 'Dropdown', list, onClick }) => {
  const [{ isOpen }, setState] = useObject<State>({
    isOpen: false
  })
  const ref = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useOnClickOutside(
    menuRef,
    () => {
      if (isOpen) setState({ isOpen: false })
    },
    'dropdown'
  )
  const left: number = useMemo(() => {
    return ref.current ? ref.current.getBoundingClientRect().left : 0
  }, [isOpen])
  const top: number = useMemo(() => {
    if (!isOpen || !ref.current) return 0
    return ref.current.offsetTop
  }, [isOpen])
  const height: number = useMemo(() => {
    return ref.current ? ref.current.getBoundingClientRect().height : 0
  }, [isOpen])
  const width: number = useMemo(() => {
    return ref.current ? ref.current.getBoundingClientRect().width : 0
  }, [isOpen])
  useEffect(() => {
    if (ref.current) console.log(ref.current.getBoundingClientRect())
  }, [ref.current])
  return (
    <>
      <button
        onClick={() => setState({ isOpen: !isOpen })}
        id="dropdown"
        ref={ref}
        className="bg-white inline-flex items-center px-4 py-2 hover:bg-gray-50 rounded-md text-gray-700 text-sm after:content-[''] after:h-1.5 after:w-1.5 after:bg-transparent after:border-b after:border-r after:ml-2 after:border-gray-700 after:block after:rotate-45"
      >
        {label}
      </button>
      {isOpen && (
        <Portal position={{ left, top: top + height + 8 }}>
          <ul
            className="bg-gray-50 z-10 list-none text-gray-700 rounded-md p-1 shadow-xl"
            style={{
              minWidth: width
            }}
            role="menu"
            tabIndex={0}
            ref={menuRef}
          >
            {list.map((item, key) => (
              <li
                className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                role="menuitem"
                tabIndex={-1}
                key={key}
                onClick={() => {
                  onClick(item)
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
