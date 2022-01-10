import React from 'react'
import type { ReactNode } from 'react'
import classnames from 'classnames'

export interface Props<T> {
  list: T[]
  columns: string[]
  renderItem: (item: T, index: number) => ReactNode
  isAllSelected?: boolean
  onSelectAll?: (checked: boolean) => void
  loading?: boolean
  header?: ReactNode
  selection?: boolean
  maxHeight?: string
}

function Table<T>({
  list,
  columns,
  renderItem,
  isAllSelected = false,
  onSelectAll,
  loading,
  header,
  selection = false,
  maxHeight = 'max-h-96'
}: Props<T>) {
  return (
    <>
      {!!header && (
        <div className="py-2 px-3 bg-gray-200 text-gray-500">{header}</div>
      )}
      <div
        className={classnames(
          'overflow-auto border border-gray-200',
          maxHeight
        )}
      >
        <div className="table mb-0 min-w-full whitespace-nowrap h-px divide-y divide-gray-200 rounded">
          <div className="table-header-group bg-gray-100 sticky top-0 z-10 w-full">
            <div className="table-row">
              {selection && (
                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={
                      !!onSelectAll
                        ? (e) => onSelectAll(e.target.checked)
                        : undefined
                    }
                    className="cursor-pointer"
                  />
                </div>
              )}
              {columns.map((column, key) => (
                <div
                  key={key}
                  className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  {column}
                </div>
              ))}
            </div>
          </div>
          <div
            className={classnames(
              'table-row-group relative divide-y divide-gray-200 bg-white react-table-row-group',
              selection ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            {list.map((item: T, index) => renderItem(item, index))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Table