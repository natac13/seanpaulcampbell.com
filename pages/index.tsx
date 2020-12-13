import React from 'react'
import { css } from '@emotion/react'
import Copyright from '../components/Copyright'
import { Container, Box, Typography } from '@material-ui/core'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-alpha with TypeScript example
          </Typography>
          <div
            css={(theme) => css`
              height: 2rem;
              width: 2rem;
              color: ${theme.palette.error.main};
              font-size: 3rem;
            `}
          >
            Testink
          </div>
        </Box>
        <Copyright />
      </Container>
    </Layout>
  )
}
