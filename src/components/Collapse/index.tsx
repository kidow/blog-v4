import React, { FunctionComponent } from 'react'
import { useObject } from '@site/src/services'
import classnames from 'classnames'
import { ChevronDownIcon } from '@heroicons/react/outline'

export interface Props {
  title: string
  action?: React.ReactNode
  onOpen?: () => void
  defaultOpen?: boolean
}
interface State {
  isOpen: boolean
}

const Collapse: FunctionComponent<Props> = ({
  children,
  title,
  action,
  onOpen,
  defaultOpen = false
}) => {
  const [{ isOpen }, setState] = useObject<State>({
    isOpen: defaultOpen || false
  })
  return (
    <div style={{ border: '1px solid #b4b4b4' }} className="rounded">
      <div
        onClick={() => {
          if (!isOpen && !!onOpen) onOpen()
          setState({ isOpen: !isOpen })
        }}
        className="p-4 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-bold mr-2">{title}</div>
            <ChevronDownIcon
              className={classnames(
                'w-5 h-5 transform transition ease-in-out',
                {
                  'rotate-180': isOpen
                }
              )}
            />
          </div>
          {isOpen && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
        </div>
      </div>
      <div
        className={classnames('px-4 pb-4', {
          block: isOpen,
          hidden: !isOpen
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default Collapse
