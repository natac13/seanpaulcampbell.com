import { graphql, useStaticQuery } from 'gatsby'

import { SiteMetadataQuery } from '../types/generated-gatsby'

const useSiteMetadata = (): SiteMetadataQuery => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          siteRepo
          author {
            name
            summary
          }
          social {
            twitter
            github
            youTube
            linkedIn
          }
        }
      }
    }
  `)

  return data
}

export default useSiteMetadata
