import { Typography, LinearProgress } from '@material-ui/core'
import { PageProps } from 'gatsby'
import React from 'react'
// import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

interface Props extends PageProps {
  data: {}
}

const About: React.FC<Props> = (props: Props) => {
  const { data } = props

  return (
    <Layout>
      <Typography variant="h2">Work in Progress</Typography>
      <LinearProgress value={66} variant="indeterminate" color="primary" />
    </Layout>
  )
}

export default About

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
