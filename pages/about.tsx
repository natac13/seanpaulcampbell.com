import { Box } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'

interface Props {}

const About: React.FC<Props> = (props: Props) => {
  const {} = props

  return (
    <Layout>
      <Box>About Page</Box>
    </Layout>
  )
}

export default About
