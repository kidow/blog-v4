import React from 'react'
import type { FC, ReactNode } from 'react'

export interface Props {
  label: string
  required?: boolean
  action?: ReactNode
  readOnly?: boolean
}

const FormItem: FC<Props> = ({
  children,
  label,
  required,
  action,
  readOnly
}) => {
  return (
    <div>
      <label htmlFor={label} className="block">
        <div className="mb-1.5 cursor-pointer">
          <span className="text-sm">
            <span className="font-semibold">{label}</span>
            {action}
          </span>
          {required && <span className="text-red-600 font-semibold">*</span>}
        </div>
        <span>{children}</span>
      </label>
    </div>
  )
}

export default FormItem
