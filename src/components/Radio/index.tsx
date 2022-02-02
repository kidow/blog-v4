import React from 'react'
import type { FC, ReactNode } from 'react'
import classnames from 'classnames'

export interface Props {
  options: Array<{
    name: ReactNode
    value: any
    disabled?: boolean
  }>
  onChange: (value: any) => void
  value?: any
  mode?: 'horizontal' | 'vertical'
  initial?: boolean
  card?: boolean
}
interface State {}

const Radio: FC<Props> = ({
  options,
  onChange,
  value,
  mode = 'horizontal',
  initial,
  card = false
}) => {
  return (
    <div
      className={classnames(
        'flex gap-2',
        {
          'flex-col': mode === 'vertical'
        },
        card ? 'flex-nowrap' : 'flex-wrap'
      )}
    >
      {initial && (
        <label className="cursor-pointer flex items-center">
          <input
            type="radio"
            onChange={() => onChange('')}
            checked={value === ''}
          />
          <span className="ml-1 text-sm">전체</span>
        </label>
      )}
      {options.map((item, index) => (
        <label
          key={index}
          className={classnames(
            card ? 'p-4 rounded border select-none block' : 'flex items-center',
            {
              'border-primary': card && value === item.value,
              'hover:bg-gray-50': card && !item.disabled
            },
            item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <input
            type="radio"
            checked={value === item.value}
            onChange={() => onChange(item.value)}
            disabled={item.disabled}
          />
          <div
            className={classnames(
              'text-sm',
              card ? 'mt-4' : 'ml-1 inline-block'
            )}
          >
            {item.name}
          </div>
        </label>
      ))}
    </div>
  )
}

export default Radio
