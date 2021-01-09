import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

const BlogIndex = (props) => {
  const { data } = props

  console.log(props)
  return <Layout></Layout>
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
