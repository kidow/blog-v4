import React, { FC } from 'react'
import classnames from 'classnames'
import { ChevronUpIcon } from '@heroicons/react/outline'

export interface Props {}
interface State {}

const BackTop: FC<Props> = () => {
  return (
    <button
      className={classnames(
        'fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center bg-black rounded-full'
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
      <ChevronUpIcon className="h-7 w-7 text-white" />
    </button>
  )
}

export default BackTop
