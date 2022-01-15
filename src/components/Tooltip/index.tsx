import React, { FC, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useObject } from '@site/src/services'
import classnames from 'classnames'

export interface Props {
  content: ReactNode
  position: 'top' | 'right' | 'bottom' | 'left'
  border?: boolean
  theme?: 'dark' | 'light'
  arrow?: boolean
  padding?: boolean
  animation?: boolean
}
interface State {
  style?: CSSProperties
}

const Tooltip: FC<Props> = ({
  content,
  children,
  border = false,
  theme = 'light',
  arrow = true,
  position,
  padding = true,
  animation = true
}) => {
  const [{ style }, setState] = useObject<State>({
    style: undefined
  })
  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const onMouseOver = () => {
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      let newStyle: CSSProperties = {}

      switch (position) {
        case 'top':
          newStyle.top = -tooltipRect.height - targetRect.height / 2
          newStyle.left = targetRect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          newStyle.top = targetRect.height + targetRect.height / 2
          newStyle.left = targetRect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          newStyle.top = targetRect.height / 2 - tooltipRect.height / 2
          newStyle.left = -tooltipRect.width - 10
          break
        case 'right':
          newStyle.top = targetRect.height / 2 - tooltipRect.height / 2
          newStyle.left = targetRect.width + 10
          break
      }

      setState({ style: newStyle })
    }
  }
  return (
    <span className="relative group" onMouseOver={onMouseOver}>
      <div
        style={style}
        className={classnames(
          'invisible group-hover:visible rounded inline-block absolute whitespace-nowrap',
          {
            'px-5 py-2': padding,
            'after:content-[""] after:absolute after:border-8': arrow,
            'border border-gray-200': border,
            'before:content-[""] before:absolute before:border-[9px]':
              arrow && border,
            'transition-opacity opacity-0 group-hover:opacity-100 ease-in duration-150':
              animation,

            'bg-gray-100': theme === 'light',
            'bg-black text-white': theme === 'dark',

            'after:border-t-gray-100':
              arrow && theme === 'light' && position === 'top',
            'after:border-b-gray-100':
              arrow && theme === 'light' && position === 'bottom',
            'after:border-l-gray-100':
              arrow && theme === 'light' && position === 'left',
            'after:border-r-gray-100':
              arrow && theme === 'light' && position === 'right',
            'after:border-t-black':
              arrow && theme === 'dark' && position === 'top',
            'after:border-b-black':
              arrow && theme === 'dark' && position === 'bottom',
            'after:border-l-black':
              arrow && theme === 'dark' && position === 'left',
            'after:border-r-black':
              arrow && theme === 'dark' && position === 'right',

            'after:bottom-full after:border-b-black after:border-t-transparent':
              arrow && position === 'bottom',
            'after:top-full after:border-t-black after:border-b-transparent':
              arrow && position === 'top',
            'after:-ml-2 after:left-1/2 after:border-x-transparent':
              arrow && (position === 'top' || position === 'bottom'),

            'after:left-full after:border-l-black after:border-r-transparent':
              arrow && position === 'left',
            'after:right-full after:border-r-black after:border-l-transparent':
              arrow && position === 'right',
            'after:-mt-2 after:top-1/2 after:border-y-transparent':
              arrow && (position === 'left' || position === 'right'),

            'before:bottom-full before:border-t-transparent':
              arrow && border && position === 'bottom',
            'before:top-full before:border-b-transparent':
              arrow && border && position === 'top',
            'before:left-full before:border-r-transparent':
              arrow && border && position === 'left',
            'before:right-full before:border-l-transparent':
              arrow && border && position === 'right',

            'before:border-x-transparent before:-ml-2 before:left-[calc(50%-1px)]':
              arrow && border && (position === 'top' || position === 'bottom'),
            'before:border-y-transparent before:-mt-2 before:top-[calc(50%-1px)]':
              arrow && border && (position === 'left' || position === 'right'),

            'before:border-b-gray-200':
              arrow && border && theme === 'light' && position === 'bottom',
            'before:border-b-black':
              arrow && border && theme === 'dark' && position === 'bottom',
            'before:border-t-gray-200':
              arrow && border && theme === 'light' && position === 'top',
            'before:border-t-black':
              arrow && border && theme === 'dark' && position === 'top',
            'before:border-l-gray-200':
              arrow && border && theme === 'light' && position === 'left',
            'before:border-l-black':
              arrow && border && theme === 'dark' && position === 'left',
            'before:border-r-gray-200':
              arrow && border && theme === 'light' && position === 'right',
            'before:border-r-black':
              arrow && border && theme === 'dark' && position === 'right'
          }
        )}
        ref={tooltipRef}
      >
        {content}
      </div>
      <div ref={targetRef} className="inline-block">
        {children}
      </div>
    </span>
  )
}

export default Tooltip
