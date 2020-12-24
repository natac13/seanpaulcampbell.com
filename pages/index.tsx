import React from 'react'
import Copyright from '../components/Copyright'
import { Box, Typography } from '@material-ui/core'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-alpha with TypeScript example
        </Typography>
      </Box>
      <Copyright />
    </Layout>
  )
}
