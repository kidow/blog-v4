import React, { FC } from 'react'

export interface Props {}
interface State {}

const Required: FC<Props> = () => {
  return <span className="required">*</span>
}

export default Required
