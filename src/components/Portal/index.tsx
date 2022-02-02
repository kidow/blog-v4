import { useEffect } from 'react'
import type { FC, AriaRole } from 'react'
import { createPortal } from 'react-dom'

export interface Props {
  role?: AriaRole
  position?: {
    left: number
    top: number
  }
}

const Portal: FC<Props> = ({ children, role, position }) => {
  const element = document.createElement('div')
  if (position) {
    element.style.position = 'absolute'
    element.style.left = `${position.left}px`
    element.style.top = `${position.top}px`
    element.style.zIndex = '10'
    document.body.style.position = 'relative'
  }
  if (role) element.setAttribute('role', role)
  document.body.appendChild(element)

  useEffect(() => {
    return () => {
      document.body.removeChild(element)
      if (position) document.body.removeAttribute('style')
    }
  }, [])
  return createPortal(children, element)
}

export default Portal
