import React, { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { useColorMode } from '@docusaurus/theme-common'

export interface Props {}
interface State {}

const giscusSelector = 'iframe.giscus-frame'

const Comment: FC<Props> = () => {
  const { isDarkTheme } = useColorMode()
  const theme = isDarkTheme ? 'dark_dimmed' : 'light'
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const giscusEl: HTMLIFrameElement =
      ref.current.querySelector(giscusSelector)
    const createGiscus = () => {
      const script = document.createElement('script')
      const attributes = {
        src: 'https://giscus.app/client.js',
        'data-repo': 'kidow/blog-v4',
        'data-repo-id': 'R_kgDOGfWNiA',
        'data-category': 'Show and tell',
        'data-category-id': 'DIC_kwDOGfWNiM4CAev2',
        'data-mapping': 'title',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-theme': theme,
        'data-lang': 'ko',
        crossOrigin: 'anonymous',
        async: 'true'
      }
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })
      if (ref.current) ref.current.appendChild(script)
    }

    const postThemeMessage = () => {
      giscusEl.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme
            }
          }
        },
        'https://giscus.app'
      )
    }

    giscusEl ? postThemeMessage() : createGiscus()
  }, [theme])

  return <div ref={ref} />
}

export default Comment
