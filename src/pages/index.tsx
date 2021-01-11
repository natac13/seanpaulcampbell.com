import React from 'react'
import { Link, graphql } from 'gatsby'

import Home from '../components/Home'
import Layout from '../components/Layout'

const BlogIndex = (props) => {
  const { data } = props

  return (
    <Layout>
      <Home />
    </Layout>
  )
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
