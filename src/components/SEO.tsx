import React from 'react'
import startCase from 'lodash/startCase'
import capitalize from 'lodash/capitalize'
import { useStaticQuery, graphql } from 'gatsby'
import R from 'ramda'
import { Helmet } from 'react-helmet'

interface Props {
  description?: string
  lang?: 'en'
  pathname: string
}

const SEO: React.FC<Props> = (props: Props) => {
  const { description, lang = 'en', pathname } = props
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const createCrumbs = R.compose<string, string[], string[], string[]>(
    R.reject(R.isEmpty),
    R.map(R.compose(startCase, capitalize)),
    R.split('/')
  )

  const createTitle = R.compose<string, string[], string[], string[], string>(
    R.join(' | '),
    R.append(`${site.siteMetadata.title}`),
    R.reverse,
    createCrumbs
  )

  const title = createTitle(pathname ?? '')

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      titleTemplate={`${title}`}
      // meta={meta}
    >
      <meta charSet="utf-8" />
      <meta name="description" content={metaDescription} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta property="og:title" content={site.siteMetadata.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author.name} />
      <meta name="twitter:title" content={site.siteMetadata.title} />
      <meta name="twitter:description" content={metaDescription} />
      <title>{site.siteMetadata.title}</title>
    </Helmet>
  )
}

export default SEO
