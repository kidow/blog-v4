import React from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import { UserCircleIcon } from '@heroicons/react/solid'

interface Props {
  src?: string
  alt?: string
  shape?: 'circle' | 'square'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  className?: string
}

const Avatar: FC<Props> = ({
  src,
  alt,
  shape = 'circle',
  size = 'md',
  border,
  className
}) => {
  return (
    <span>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={classnames({
            'rounded-full': shape === 'circle',
            rounded: shape === 'square',
            'h-8 w-8': size === 'xs',
            'h-10 w-10': size === 'sm',
            'h-12 w-12': size === 'md',
            'h-16 w-16': size === 'lg',
            'h-20 w-20': size === 'xl',
            'border-2 border-black': border
          })}
        />
      ) : (
        <UserCircleIcon
          className={classnames('text-gray-400', {
            'h-8 w-8': size === 'xs',
            'h-10 w-10': size === 'sm',
            'h-12 w-12': size === 'md',
            'h-16 w-16': size === 'lg',
            'h-20 w-20': size === 'xl'
          })}
        />
      )}
    </span>
  )
}

export default Avatar
