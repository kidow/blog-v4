import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

type FeatureItem = {
  title: string
  image: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    )
  },
  {
    title: 'Focus on What Matters',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    )
  },
  {
    title: 'Powered by React',
    image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  }
]

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="Kidow Blog"
      description="Description will go into a meta tag in <head />"
    >
      <header className="p-8 lg:py-16 lg:px-0 text-center bg-indigo-400">
        <div className="container">
          <h1 className="text-5xl">{siteConfig.title}</h1>
          <p className="text-2xl">{siteConfig.tagline}</p>
          <div className="flex items-center justify-center">
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              블로그 탐방하기
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="flex items-center py-8 w-full">
          <div className="container">
            <div className="row">
              {FeatureList.map((item, idx) => (
                <div key={idx} className="col col--4">
                  <div className="text--center">
                    <img
                      className="h-[200px] w-[200px]"
                      alt={item.title}
                      src={item.image}
                    />
                  </div>
                  <div className="text--center padding-horiz--md">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
