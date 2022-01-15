import { FC, useMemo } from 'react'
import { createPortal } from 'react-dom'

export interface Props {
  elementId: string
}

const Portal: FC<Props> = ({ children, elementId }) => {
  const rootElement = useMemo(
    () => document.getElementById(elementId),
    [elementId]
  )
  return createPortal(children, rootElement as Element)
}

export default Portal
