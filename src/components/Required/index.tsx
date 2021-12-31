import React, { FunctionComponent } from 'react'

export interface Props {}
interface State {}

const Required: FunctionComponent<Props> = () => {
  return <span className="required">*</span>
}

export default Required
