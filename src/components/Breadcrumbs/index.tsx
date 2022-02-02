import React from 'react'
import type { FC } from 'react'
import classnames from 'classnames'

interface Props {
  list: Array<{
    path: string
    name: string
  }>
}

const Breadcrumbs: FC<Props> = ({ list }) => {
  return (
    <div className="text-sm max-w-full py-2 overflow-x-auto">
      <ul className="flex items-center list-none p-0 m-0">
        {list.map((item, key) => (
          <li
            className={classnames('flex items-center', {
              'before:content-[""] before:block before:h-1.5 before:ml-2 before:mr-3 before:opacity-40 before:w-1.5 before:bg-transparent before:border-t before:border-r before:border-black before:rotate-45':
                key !== 0
            })}
            key={key}
          >
            <a
              className={classnames(
                key === list.length - 1 ? 'cursor-text' : 'hover:underline'
              )}
              href={item.path}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
