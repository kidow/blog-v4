import React from 'react'
import classnames from 'classnames'
import { ChevronUpIcon } from '@heroicons/react/outline'
import useThemeContext from '@theme/hooks/useThemeContext'

const BackTop = () => {
  const { isDarkTheme } = useThemeContext()
  return (
    <button
      className={classnames(
        'fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center rounded-full',
        isDarkTheme ? 'bg-white' : 'bg-black'
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
      <ChevronUpIcon
        className={classnames(
          'h-7 w-7',
          isDarkTheme ? 'text-black' : 'text-white'
        )}
      />
    </button>
  )
}

export default BackTop
