import React, { useEffect, useRef } from 'react'
import type { FunctionComponent } from 'react'
import useThemeContext from '@theme/hooks/useThemeContext'

export interface Props {}
interface State {}

const giscusSelector = 'iframe.giscus-frame'

const Comment: FunctionComponent<Props> = () => {
  const { isDarkTheme } = useThemeContext()
  const theme = isDarkTheme ? 'dark' : 'light'
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const giscusEl: HTMLIFrameElement =
      ref.current.querySelector(giscusSelector)
    const createGiscus = () => {
      const script = document.createElement('script')
      const attributes = {
        src: 'https://giscus.app/client.js',
        'data-repo': 'kidow/blog-v4',
        'data-repo-id': 'R_kgDOGfWNiA=',
        'data-category': 'Announcements',
        'data-category-id': 'DIC_kwDOGfWNiM4CAevy',
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
