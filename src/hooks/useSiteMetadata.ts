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
            email
            twitter
            github
            youTube
            linkedIn
          }
        }
      }
      meAvatar: file(relativePath: { eq: "images/me.png" }) {
        id
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 200, height: 200, quality: 80)
        }
      }
    }
  `)

  return data
}

export default useSiteMetadata
