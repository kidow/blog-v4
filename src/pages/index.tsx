import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeatures from '../components/HomepageFeatures'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className="p-8 lg:py-16 lg:px-0 text-center bg-indigo-400">
        <div className="container">
          <h1 className="text-5xl">{siteConfig.title}</h1>
          <p className="text-2xl">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/resume"
            >
              블로그 탐방하기
            </Link>
          </div>
        </div>
      </header>

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
