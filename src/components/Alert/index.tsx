import React, { useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import classnames from 'classnames'
import {
  CheckCircleIcon as OutlineCheckCircleIcon,
  InformationCircleIcon as OutlineInformationCircleIcon,
  ExclamationCircleIcon as OutlineExclamationCircleIcon,
  XCircleIcon as OutlineXCircleIcon,
  XIcon
} from '@heroicons/react/outline'
import {
  CheckCircleIcon as SolidCheckCircleIcon,
  InformationCircleIcon as SolidInformationCircleIcon,
  ExclamationCircleIcon as SolidExclamationCircleIcon,
  XCircleIcon as SolidXCircleIcon
} from '@heroicons/react/solid'
import { useObject } from '@site/src/services'

export interface Props {
  type: 'success' | 'info' | 'warn' | 'error'
  title: string
  description?: ReactNode
  icon?: boolean
  close?: boolean
}
interface State {
  isClosed: boolean
  isDisplay: boolean
}

const Alert: FC<Props> = ({
  type,
  title,
  description,
  icon = true,
  close = false
}) => {
  const [{ isClosed, isDisplay }, setState] = useObject<State>({
    isClosed: false,
    isDisplay: true
  })
  useEffect(() => {
    if (isClosed) {
      setTimeout(() => {
        setState({ isDisplay: false })
      }, 150)
    }
  }, [isClosed])
  if (!isDisplay) return null
  return (
    <div
      className={classnames(
        'border rounded flex w-full text-black',
        description ? 'p-4 gap-4' : 'py-2 px-4 gap-2 items-center',
        {
          'transition-opacity duration-150': close,
          'opacity-100': close && !isClosed,
          'opacity-0': close && isClosed,
          'border-green-600 bg-emerald-100': type === 'success',
          'border-blue-600 bg-sky-100': type === 'info',
          'border-yellow-600 bg-amber-100': type === 'warn',
          'border-rose-600 bg-red-100': type === 'error'
        }
      )}
    >
      {icon && (
        <>
          {type === 'success' && (
            <>
              {description ? (
                <OutlineCheckCircleIcon className="h-6 w-6 text-emerald-600" />
              ) : (
                <SolidCheckCircleIcon className="h-4 w-4 text-emerald-600" />
              )}
            </>
          )}
          {type === 'info' && (
            <>
              {description ? (
                <OutlineInformationCircleIcon className="h-6 w-6 text-sky-600" />
              ) : (
                <SolidInformationCircleIcon className="h-4 w-4 text-sky-600" />
              )}
            </>
          )}
          {type === 'warn' && (
            <>
              {description ? (
                <OutlineExclamationCircleIcon className="h-6 w-6 text-amber-600" />
              ) : (
                <SolidExclamationCircleIcon className="h-4 w-4 text-amber-600" />
              )}
            </>
          )}
          {type === 'error' && (
            <>
              {description ? (
                <OutlineXCircleIcon className="h-6 w-6 text-rose-600" />
              ) : (
                <SolidXCircleIcon className="h-4 w-4 text-rose-600" />
              )}
            </>
          )}
        </>
      )}
      <div className="flex-1">
        <div className={classnames(description ? 'description' : 'text-sm')}>
          {title}
        </div>
        {!!description && (
          <div className="text-sm mt-1 text-gray-600">{description}</div>
        )}
      </div>
      {close && (
        <>
          {!isClosed && (
            <XIcon
              onClick={() => setState({ isClosed: true })}
              className="h-5 w-5 cursor-pointer text-gray-700"
            />
          )}
        </>
      )}
    </div>
  )
}

export default Alert