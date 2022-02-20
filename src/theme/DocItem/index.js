/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import clsx from 'clsx'
import DocPaginator from '@theme/DocPaginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocVersionBadge from '@theme/DocVersionBadge'
import Seo from '@theme/Seo'
import DocItemFooter from '@theme/DocItemFooter'
import TOC from '@theme/TOC'
import TOCCollapsible from '@theme/TOCCollapsible'
import styles from './styles.module.css'
import { ThemeClassNames, useWindowSize } from '@docusaurus/theme-common'
import { Comment } from '@site/src/components'
export default function DocItem(props) {
  const { content: DocContent } = props
  const { metadata, frontMatter } = DocContent
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel
  } = frontMatter
  const { description, title } = metadata // We only add a title if:
  // - user asks to hide it with frontmatter
  // - the markdown content does not already contain a top-level h1 heading

  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === 'undefined'
  const windowSize = useWindowSize()
  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0
  const renderTocDesktop =
    canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr')
  return (
    <>
      <Seo
        {...{
          title,
          description,
          keywords,
          image
        }}
      />

      <div className="row">
        <div
          className={clsx('col', {
            [styles.docItemCol]: !hideTableOfContents
          })}
        >
          <DocVersionBanner />
          <div className={styles.docItemContainer}>
            <article>
              <DocVersionBadge />

              {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  minHeadingLevel={tocMinHeadingLevel}
                  maxHeadingLevel={tocMaxHeadingLevel}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile
                  )}
                />
              )}

              <div
                className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}
              >
                {shouldAddTitle && <h1>{title}</h1>}

                <DocContent />
              </div>

              <DocItemFooter {...props} />
            </article>

            <Comment />
            <DocPaginator previous={metadata.previous} next={metadata.next} />
          </div>
        </div>
        {renderTocDesktop && (
          <div className="col col--3">
            <TOC
              toc={DocContent.toc}
              minHeadingLevel={tocMinHeadingLevel}
              maxHeadingLevel={tocMaxHeadingLevel}
              className={ThemeClassNames.docs.docTocDesktop}
            />
          </div>
        )}
      </div>
    </>
  )
}
