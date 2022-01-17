import React, { FC } from 'react'

interface Props {
  name: string
}

const Codesandbox: FC<Props> = ({ name }) => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/blog-v4-ub7ie?fontsize=14&hidenavigation=1&initialpath=%2F${name}&theme=dark&view=preview`}
      style={{
        width: '100%',
        height: 500,
        border: 0,
        borderRadius: 4,
        overflow: 'hidden'
      }}
      title="Blog-v4"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}

export default Codesandbox
