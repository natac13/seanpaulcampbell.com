// const path = require(`path`)
//
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String
      author: Author
      description: String
      siteUrl: String
      siteRepo: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
      youTube: String
      linkedIn: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      title: String!
      date: Date! @dateformat
      coverImage: File @fileByRelativePath
      tags: [String]
      category: String
    }

  `)
}
