import React from 'react'
import type { FC, OptionHTMLAttributes, ComponentProps } from 'react'
import { Input } from '@site/src/components'
import { getRandomString } from '@site/src/services'

interface Props extends ComponentProps<typeof Input> {
  id?: string
  options: Array<OptionHTMLAttributes<HTMLOptionElement>['value']>
}

const Autocomplete: FC<Props> = ({ options, ...props }) => {
  const id = getRandomString()
  return (
    <>
      <Input {...props} list={props.id || id} />
      <datalist id={props.id || id}>
        {options.map((value, key) => (
          <option value={value} key={key} />
        ))}
      </datalist>
    </>
  )
}

export default Autocomplete
