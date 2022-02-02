import classnames from 'classnames'
import { Spinner } from '@site/src/components'
import React from 'react'
import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  theme?: 'light' | 'dark' | 'secondary' | 'danger' | 'primary' | 'ghost'
}

const Button: FC<Props> = ({
  isLoading = false,
  size = 'md',
  theme = 'dark',
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classnames(
        'border leading-6 font-medium transition ease-in-out duration-150',
        {
          'cursor-not-allowed': isLoading || disabled,
          'inline-flex items-center justify-center': isLoading,
          'text-xs py-px px-2 rounded': size === 'xs',
          'text-sm py-1 px-3': size === 'sm',
          'text-base py-2 px-4': size === 'md',
          'text-lg py-3 px-5': size === 'lg',
          'bg-black text-white': theme === 'dark',
          'bg-gray-300 text-gray-600': theme === 'secondary',
          'bg-red-600 text-white': theme === 'danger',
          'bg-blue-500 text-white': theme === 'primary',
          'bg-transparent border-gray-900': theme === 'ghost',
          'rounded-md': size !== 'xs'
        },
        className
      )}
      disabled={isLoading || disabled}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}

export default Button
