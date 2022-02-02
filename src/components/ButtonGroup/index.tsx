import React from 'react'
import type { FC } from 'react'

export interface Props {
  list: string[]
  onClick: (key: number) => void
}

const ButtonGroup: FC<Props> = ({ list, onClick }) => {
  return (
    <div className="flex rounded border divide-x">
      {list.map((name, key) => (
        <button
          className="py-2 px-3 text-gray-400 text-sm hover:text-primary hover:bg-sky-50"
          key={key}
          onClick={() => onClick(key)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
