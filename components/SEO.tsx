import React from 'react'
import Head from 'next/head'
import config from '../site-config'
import { useRouter } from 'next/router'
import startCase from 'lodash/startCase'

const SEO: React.FC = () => {
  const { title: siteTitle, description, author } = config
  const router = useRouter()
  const titleArray = router.asPath
    .split('/')
    .map((path) => startCase(path))
    .reverse()
  titleArray.push(siteTitle)
  const title = titleArray.filter((path) => !!path).join(' | ')

  return (
    <Head>
      <title>{`${title}`}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      {/* <meta property="twitter:card" content="summary" /> */}
      {/* <meta property="twitter:creator" content={config.social.twitter} /> */}
      {/* <meta property="twitter:title" content={title} /> */}
      {/* <meta property="twitter:description" content={description} /> */}
    </Head>
  )
}

export default SEO
