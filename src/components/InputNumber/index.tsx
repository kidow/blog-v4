import React from 'react'
import { Input } from '@site/src/components'
import type { ComponentProps, FC } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export interface Props
  extends Omit<NumberFormatProps, 'size'>,
    Pick<
      ComponentProps<typeof Input>,
      'onEnter' | 'align' | 'error' | 'fullWidth' | 'info' | 'size'
    > {}

const InputNumber: FC<Props> = ({ ...props }) => {
  return <NumberFormat {...props} customInput={Input} />
}

export default InputNumber
