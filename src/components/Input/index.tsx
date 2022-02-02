import React, { useMemo } from 'react'
import type {
  FC,
  ReactNode,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent
} from 'react'
import classnames from 'classnames'
import { getRandomString } from '@site/src/services'

export interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size' | 'prefix'
  > {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  onEnter?: () => void
  prefix?: ReactNode
  suffix?: ReactNode
  align?: 'left' | 'right'
  error?: ReactNode
  fullWidth?: boolean
  info?: ReactNode
}

const Input: FC<Props> = ({
  size = 'md',
  className,
  onEnter,
  prefix,
  suffix,
  align = 'left',
  error,
  fullWidth = false,
  info,
  ...props
}) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!onEnter) onEnter()
  }
  const randomId: string = useMemo(() => getRandomString(), [])
  const isBaseWord: boolean = useMemo(
    () => !!prefix || !!suffix,
    [prefix, suffix]
  )
  return (
    <>
      <div
        className={classnames(
          isBaseWord
            ? 'inline-flex justify-between items-center border rounded'
            : 'inline-block',
          !!error && isBaseWord ? 'border-red-500' : 'border-gray-300',
          {
            'w-full': fullWidth,
            relative: !!props.placeholder,
            'px-1': isBaseWord && size === 'xs',
            'px-2': isBaseWord && size === 'sm',
            'px-3': isBaseWord && size === 'md',
            'px-4': isBaseWord && size === 'lg'
          }
        )}
      >
        {prefix}
        <input
          {...props}
          id={props.id || randomId}
          className={classnames(
            isBaseWord
              ? 'border-0 focus:outline-none mx-1 flex-1 w-full'
              : 'block',
            {
              'bg-gray-100 cursor-not-allowed': props.disabled,
              'bg-white': !props.disabled && !props.readOnly,
              'cursor-default': props.readOnly,
              'text-xs rounded-sm': size === 'xs',
              'p-1': !isBaseWord && size === 'xs',
              'text-sm py-1 rounded': size === 'sm',
              'px-2': !isBaseWord && size === 'sm',
              'text-base py-2 rounded-md': size === 'md',
              'px-3': !isBaseWord && size === 'md',
              'text-lg py-3 rounded-md': size === 'lg',
              'px-4': !isBaseWord && size === 'lg',
              'text-right': align === 'right',
              'w-full': fullWidth,
              'peer placeholder-transparent': !!props.placeholder && !prefix
            },
            !!error ? 'border-red-500' : 'focus:border-primary border-gray-300',
            className
          )}
          onKeyDown={onKeyDown}
          spellCheck={false}
        />
        {!!props.placeholder && (
          <label
            htmlFor={props.id || randomId}
            className={classnames(
              'absolute truncate select-none max-w-[calc(100%-24px)] cursor-text peer-focus:cursor-default -top-6 text-gray-600 transition-all  peer-placeholder-shown:text-gray-400 peer-focus:max-w-full peer-focus:left-0 peer-focus:text-gray-600',
              !!props.value ? 'left-0' : 'left-3',
              {
                'peer-placeholder-shown:text-xs text-xs peer-placeholder-shown:left-1 peer-placeholder-shown:top-1.5 peer-focus:-top-5 peer-focus:text-xs':
                  size === 'xs',
                'peer-placeholder-shown:text-sm text-sm peer-placeholder-shown:left-1.5 peer-placeholder-shown:top-1.5 peer-focus:-top-6 peer-focus:text-sm':
                  size === 'sm',
                'peer-placeholder-shown:text-base text-sm peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm':
                  size === 'md',
                'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-lg -top-7 peer-focus:-top-7 peer-focus:text-base':
                  size === 'lg'
              }
            )}
          >
            {props.placeholder}
          </label>
        )}
        {suffix}
      </div>
      {(!!error || !!info) && (
        <div
          className={classnames('mt-1 text-xs', {
            'text-red-500': !!error,
            'text-gray-400': !!info
          })}
        >
          {error || info}
        </div>
      )}
    </>
  )
}

export default Input
