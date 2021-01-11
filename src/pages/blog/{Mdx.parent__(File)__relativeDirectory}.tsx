import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby-material-ui-components'
import Layout from '../../components/BlogLayout'
import { Box, Chip, experimentalStyled, Typography } from '@material-ui/core'
import { BlogPostQuery } from '../../types/generated-gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { LocalOffer } from '@material-ui/icons'

const StyledLink = experimentalStyled(Link)`
fill: currentColor;
`

interface Props extends PageProps {
  data: BlogPostQuery
}

const BlogPost: React.FC<Props> = (props: Props) => {
  const { data, location } = props
  console.log(props)
  const post = data.mdx
  // const { previous, next } = data

  return (
    <Layout>
      <MDXProvider components={{ a: StyledLink }}>
        <section
          css={(theme) => ({
            gridColumn: '1 / -1',
            width: '80%',
            placeSelf: 'center center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(1),
          })}
        >
          <Img
            fluid={
              post?.frontmatter?.coverImage?.childImageSharp
                ?.fluid as FluidObject
            }
            alt={post?.frontmatter?.title}
          />
        </section>
        <MDXRenderer>{post?.body ?? ''}</MDXRenderer>
      </MDXProvider>
      <Box>
        <Typography color="textSecondary">
          <LocalOffer
            css={{ transform: 'scale(0.6)', verticalAlign: 'bottom' }}
          />
          Tags:
        </Typography>
        <Box
          component="ul"
          sx={{
            display: 'flex',
            gap: (theme) => theme.spacing(1),
            flexFlow: 'row wrap',
          }}
        >
          {post?.frontmatter?.tags?.map((tag) => (
            <Chip key={tag} label={tag} color="secondary" />
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
        coverImage {
          childImageSharp {
            fluid(maxWidth: 1600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

// $previousPostId: String
// $nextPostId: String
// previous: mdx(id: { eq: $previousPostId }) {
//   fields {
//     slug
//   }
//   frontmatter {
//     title
//   }
// }
// next: mdx(id: { eq: $nextPostId }) {
//   fields {
//     slug
//   }
//   frontmatter {
//     title
//   }
// }

// <SEO
//   title={post.frontmatter.title}
//   description={post.frontmatter.description || post.excerpt}
// />
// <article
//   className="blog-post"
//   itemScope
//   itemType="http://schema.org/Article"
// >
//   <header>
//     <h1 itemProp="headline">{post.frontmatter.title}</h1>
//     <p>{post.frontmatter.date}</p>
//   </header>
//   <section
//     dangerouslySetInnerHTML={{ __html: post.html }}
//     itemProp="articleBody"
//   />
//   <hr />
//   <footer>
//     <Bio />
//   </footer>
// </article>
// <nav className="blog-post-nav">
//   <ul
//     style={{
//       display: `flex`,
//       flexWrap: `wrap`,
//       justifyContent: `space-between`,
//       listStyle: `none`,
//       padding: 0,
//     }}
//   >
//     <li>
//       {previous && (
//         <Link to={previous.fields.slug} rel="prev">
//           ← {previous.frontmatter.title}
//         </Link>
//       )}
//     </li>
//     <li>
//       {next && (
//         <Link to={next.fields.slug} rel="next">
//           {next.frontmatter.title} →
//         </Link>
//       )}
//     </li>
//   </ul>
// </nav>
