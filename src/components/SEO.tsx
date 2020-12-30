import React from 'react'
import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../hooks/useSiteMetadata'
import createSEOTitle from '../utils/createSEOTitle'
import { SITE_TITLE } from '../constants'

interface Props {
  description?: string
  lang?: 'en'
  pathname?: string
}

const SEO: React.FC<Props> = (props: Props) => {
  const { description, lang = 'en', pathname } = props
  const location = useLocation()
  const { site } = useSiteMetadata()

  const metaDescription = description || site?.siteMetadata?.description

  const title = createSEOTitle(
    site?.siteMetadata?.title,
    pathname ?? location.pathname
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={`${title}`}
    >
      <meta charSet="utf-8" />
      <meta name="description" content={metaDescription ?? ''} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta
        property="og:title"
        content={site?.siteMetadata?.title ?? SITE_TITLE}
      />
      <meta property="og:description" content={metaDescription ?? ''} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site?.siteMetadata?.author?.name ?? ''}
      />
      <meta
        name="twitter:title"
        content={site?.siteMetadata?.title ?? SITE_TITLE}
      />
      <meta name="twitter:description" content={metaDescription ?? ''} />
      <title>{site?.siteMetadata?.title}</title>
    </Helmet>
  )
}

export default SEO
