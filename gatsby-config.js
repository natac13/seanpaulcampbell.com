const path = require('path')

const homeDir = process.cwd()
const blogDir = path.join(homeDir, 'content', 'blog')
const assetsDir = path.join(homeDir, 'content', 'assets')

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Sean Paul Campbell`,
      summary: `Full Stack Developer, Licensed Electrician.`,
    },
    description: `My personal website, blog and photography gallery.`,
    siteUrl: `https://seanpaulcampbell.com`,
    siteRepo: `https://github.com/natac13/seanpaulcampbell.com`,
    social: {
      twitter: `https://twitter.com/natac131`,
      github: `https://github.com/natac13`,
      linkedIn: `https://www.linkedin.com/in/seancampbellnatac/`,
      youtube: `https://www.youtube.com/channel/UCngtXcTVb2jH9CjpIOm3xOA`,
    },
  },
  plugins: [
    `gatsby-plugin-top-layout`,
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-ramda`,
    `gatsby-plugin-use-dark-mode`,
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.[t|j]s$|\.[t|j]sx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: blogDir,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: assetsDir,
        name: `assets`,
      },
    },
    `gatsby-remark-images`,
    `gatsby-remark-responsive-iframe`,
    `gatsby-remark-autolink-headers`,
    `gatsby-remark-prismjs`,
    `gatsby-remark-copy-linked-files`,
    `gatsby-remark-smartypants`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
