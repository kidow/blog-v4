import React from 'react'
import type { FunctionComponent } from 'react'
import classnames from 'classnames'

export interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  position: 'left' | 'right' | 'top' | 'bottom'
  content: React.ReactNode
  border?: boolean
  theme?: 'dark' | 'light'
  padding?: boolean
  className?: string
}

const Tooltip: FunctionComponent<Props> = ({
  position,
  content,
  children,
  border = true,
  theme = 'light',
  padding = true,
  className,
  ...props
}) => {
  return (
    <div className="relative group inline-block">
      <div
        className={classnames(
          'absolute bg-white rounded hidden group-hover:block z-10',
          { 'top-[calc(100%+10px)]': position === 'bottom' },
          { 'left-[calc(100%+10px)] -bottom-1/2': position === 'right' },
          { 'right-[calc(100%+10px)]': position === 'left' },
          { 'bottom-[calc(100%+10px)]': position === 'top' },
          { 'border border-gray-400': border },
          { 'bg-white': theme === 'light' },
          { 'bg-black text-white': theme === 'dark' },
          { 'p-1': padding },
          className
        )}
      >
        {content}
      </div>
      <div {...props}>{children}</div>
    </div>
  )
}

export default Tooltip
