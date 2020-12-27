import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../../components/Layout'

const BlogPostTemplate = (props) => {
  const { data, location } = props
  console.log(props)
  const post = data.mdx
  // const { previous, next } = data

  return (
    <Layout>
      <section>Help</section>
      <MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
